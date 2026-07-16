#!/usr/bin/env python3
import json
import subprocess
import os

BASE = "/Users/gabrielortiz/workspace/youtube/public/youtube/finanzas/cripto-finanzas"
SOUNDS_BASE = "/Users/gabrielortiz/workspace/youtube/public"
OUT_DIR = "/Users/gabrielortiz/workspace/youtube/out"
CLIPS_DIR = f"{OUT_DIR}/clips"
MUSIC = f"{BASE}/music/The Silent Ledger.mp3"

os.makedirs(CLIPS_DIR, exist_ok=True)

with open(f"{BASE}/script.json") as f:
    data = json.load(f)

scenes = data["scenes"]

print(f"Building {len(scenes)} scene clips...")

for i, scene in enumerate(scenes):
    num = f"{i+1:03d}"
    clip_path = f"{CLIPS_DIR}/clip_{num}.mp4"
    img_path = f"{BASE}/{scene['assets']['img']}"
    voice_path = f"{BASE}/{scene['assets']['voice_en']}"
    sound_path = f"{SOUNDS_BASE}/{scene['assets']['sound']}"

    # Use actual voice duration so no audio gets cut off
    result = subprocess.run(
        ["ffprobe", "-v", "quiet", "-show_entries", "format=duration",
         "-of", "csv=p=0", voice_path],
        capture_output=True, text=True
    )
    voice_duration = float(result.stdout.strip())

    cmd = [
        "ffmpeg", "-y", "-loglevel", "error",
        "-loop", "1", "-t", str(voice_duration), "-i", img_path,
        "-i", voice_path,
        "-i", sound_path,
        "-filter_complex",
        "[1:a]volume=1.0[v];[2:a]volume=0.6[s];[v][s]amix=inputs=2:duration=first:dropout_transition=0[aout]",
        "-map", "0:v", "-map", "[aout]",
        "-c:v", "libx264", "-preset", "ultrafast", "-tune", "stillimage", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "128k",
        "-r", "30",
        clip_path
    ]
    subprocess.run(cmd, check=True)
    print(f"  [{num}] scene {scene['id']} — {voice_duration:.1f}s (voice)")

# Write concat list
concat_file = f"{OUT_DIR}/concat.txt"
with open(concat_file, "w") as f:
    for i in range(len(scenes)):
        num = f"{i+1:03d}"
        f.write(f"file '{CLIPS_DIR}/clip_{num}.mp4'\n")

print("Concatenating all clips...")
subprocess.run([
    "ffmpeg", "-y", "-loglevel", "error",
    "-f", "concat", "-safe", "0", "-i", concat_file,
    "-c:v", "libx264", "-preset", "ultrafast", "-pix_fmt", "yuv420p",
    "-c:a", "copy",
    f"{OUT_DIR}/cripto-finanzas-nomusic.mp4"
], check=True)

print("Adding background music...")
subprocess.run([
    "ffmpeg", "-y", "-loglevel", "error",
    "-i", f"{OUT_DIR}/cripto-finanzas-nomusic.mp4",
    "-stream_loop", "-1", "-i", MUSIC,
    "-filter_complex", "[1:a]volume=0.25[music];[0:a][music]amix=inputs=2:duration=first:dropout_transition=2[aout]",
    "-map", "0:v", "-map", "[aout]",
    "-c:v", "copy",
    "-c:a", "aac", "-b:a", "192k",
    "-shortest",
    f"{OUT_DIR}/cripto-finanzas-final.mp4"
], check=True)

print(f"\nDone! -> {OUT_DIR}/cripto-finanzas-final.mp4")
