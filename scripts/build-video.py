#!/usr/bin/env python3
import json
import subprocess
import os
import sys
import glob

ROOT = "/Users/gabrielortiz/workspace/youtube"
PUBLIC = f"{ROOT}/public"


def main():
    if len(sys.argv) < 2:
        print("Usage: build-video.py <channel>/<video_id> [music_file.mp3]")
        sys.exit(1)

    video_path = sys.argv[1].strip("/")
    video_id = video_path.split("/")[-1]
    base = f"{PUBLIC}/youtube/{video_path}"
    out_dir = f"{ROOT}/out"
    clips_dir = f"{out_dir}/clips_{video_id}"

    if len(sys.argv) > 2:
        music = f"{base}/music/{sys.argv[2]}"
    else:
        candidates = glob.glob(f"{base}/music/*.mp3")
        if not candidates:
            print(f"No music file found in {base}/music/")
            sys.exit(1)
        music = candidates[0]

    os.makedirs(clips_dir, exist_ok=True)

    with open(f"{base}/script.json") as f:
        data = json.load(f)

    scenes = data["scenes"]
    print(f"Building {len(scenes)} scene clips for '{video_id}'...")

    for i, scene in enumerate(scenes):
        num = f"{i+1:03d}"
        clip_path = f"{clips_dir}/clip_{num}.mp4"
        img_path = f"{base}/{scene['assets']['img']}"
        voice_path = f"{base}/{scene['assets']['voice_en']}"
        sound = scene["assets"].get("sound")
        sound_path = f"{PUBLIC}/{sound}" if sound else None

        result = subprocess.run(
            ["ffprobe", "-v", "quiet", "-show_entries", "format=duration",
             "-of", "csv=p=0", voice_path],
            capture_output=True, text=True
        )
        voice_duration = float(result.stdout.strip())

        if sound_path and os.path.exists(sound_path):
            filter_complex = "[1:a]volume=1.0[v];[2:a]volume=0.6[s];[v][s]amix=inputs=2:duration=first:dropout_transition=0[aout]"
            cmd = [
                "ffmpeg", "-y", "-loglevel", "error",
                "-loop", "1", "-t", str(voice_duration), "-i", img_path,
                "-i", voice_path,
                "-i", sound_path,
                "-filter_complex", filter_complex,
                "-map", "0:v", "-map", "[aout]",
                "-c:v", "libx264", "-preset", "ultrafast", "-tune", "stillimage", "-pix_fmt", "yuv420p",
                "-c:a", "aac", "-b:a", "128k",
                "-r", "30",
                clip_path
            ]
        else:
            cmd = [
                "ffmpeg", "-y", "-loglevel", "error",
                "-loop", "1", "-t", str(voice_duration), "-i", img_path,
                "-i", voice_path,
                "-map", "0:v", "-map", "1:a",
                "-c:v", "libx264", "-preset", "ultrafast", "-tune", "stillimage", "-pix_fmt", "yuv420p",
                "-c:a", "aac", "-b:a", "128k",
                "-r", "30",
                clip_path
            ]
        subprocess.run(cmd, check=True)
        print(f"  [{num}] scene {scene['id']} — {voice_duration:.1f}s (voice)")

    concat_file = f"{out_dir}/concat_{video_id}.txt"
    with open(concat_file, "w") as f:
        for i in range(len(scenes)):
            num = f"{i+1:03d}"
            f.write(f"file '{clips_dir}/clip_{num}.mp4'\n")

    print("Concatenating all clips...")
    nomusic_path = f"{out_dir}/{video_id}-nomusic.mp4"
    subprocess.run([
        "ffmpeg", "-y", "-loglevel", "error",
        "-f", "concat", "-safe", "0", "-i", concat_file,
        "-c:v", "libx264", "-preset", "ultrafast", "-pix_fmt", "yuv420p",
        "-c:a", "copy",
        nomusic_path
    ], check=True)

    print("Adding background music...")
    final_path = f"{out_dir}/{video_id}-final.mp4"
    subprocess.run([
        "ffmpeg", "-y", "-loglevel", "error",
        "-i", nomusic_path,
        "-stream_loop", "-1", "-i", music,
        "-filter_complex", "[1:a]volume=0.25[music];[0:a][music]amix=inputs=2:duration=first:dropout_transition=2[aout]",
        "-map", "0:v", "-map", "[aout]",
        "-c:v", "copy",
        "-c:a", "aac", "-b:a", "192k",
        "-shortest",
        final_path
    ], check=True)

    print(f"\nDone! -> {final_path}")


if __name__ == "__main__":
    main()
