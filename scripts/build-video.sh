#!/usr/bin/env bash
set -e

BASE="/Users/gabrielortiz/workspace/youtube/public/youtube/finanzas/cripto-finanzas"
SOUNDS_BASE="/Users/gabrielortiz/workspace/youtube/public"
OUT_DIR="/Users/gabrielortiz/workspace/youtube/out"
CLIPS_DIR="$OUT_DIR/clips"
MUSIC="$BASE/music/The Silent Ledger.mp3"

mkdir -p "$CLIPS_DIR"

# Build each scene clip: image + voice + sound effect mixed
node -e "
const data = require('$BASE/../../script.json'.replace('script.json','') + '../cripto-finanzas/script.json');
" 2>/dev/null || true

# Read scene data from JSON
node - <<'JSEOF'
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/Users/gabrielortiz/workspace/youtube/public/youtube/finanzas/cripto-finanzas/script.json'));
const lines = data.scenes.map(s =>
  `${String(s.id).padStart(3,'0')}|${s.duration}|${s.assets.img}|${s.assets.voice_en}|${s.assets.sound}`
);
fs.writeFileSync('/tmp/scenes.txt', lines.join('\n'));
JSEOF

BASE_PATH="/Users/gabrielortiz/workspace/youtube/public/youtube/finanzas/cripto-finanzas"
SOUNDS_PATH="/Users/gabrielortiz/workspace/youtube/public"

echo "Building scene clips..."

while IFS='|' read -r id duration img voice_en sound; do
  CLIP="$OUT_DIR/clips/clip_${id}.mp4"
  IMG_PATH="$BASE_PATH/$img"
  VOICE_PATH="$BASE_PATH/$voice_en"
  SOUND_PATH="$SOUNDS_PATH/$sound"

  ffmpeg -y -loglevel error \
    -loop 1 -t "$duration" -i "$IMG_PATH" \
    -i "$VOICE_PATH" \
    -i "$SOUND_PATH" \
    -filter_complex \
      "[1:a]volume=1.0[v];[2:a]volume=0.6[s];[v][s]amix=inputs=2:duration=longest:dropout_transition=0[aout]" \
    -map 0:v -map "[aout]" \
    -c:v libx264 -preset ultrafast -tune stillimage -pix_fmt yuv420p \
    -c:a aac -b:a 128k \
    -r 30 -shortest \
    "$CLIP"

  echo "  Done clip $id/$duration s"
done < /tmp/scenes.txt

echo "Creating concat list..."
> "$OUT_DIR/concat.txt"
while IFS='|' read -r id rest; do
  echo "file 'clips/clip_${id}.mp4'" >> "$OUT_DIR/concat.txt"
done < /tmp/scenes.txt

echo "Concatenating all clips..."
ffmpeg -y -loglevel error \
  -f concat -safe 0 -i "$OUT_DIR/concat.txt" \
  -c copy \
  "$OUT_DIR/cripto-finanzas-nomusic.mp4"

echo "Adding background music..."
ffmpeg -y -loglevel error \
  -i "$OUT_DIR/cripto-finanzas-nomusic.mp4" \
  -stream_loop -1 -i "$MUSIC" \
  -filter_complex "[1:a]volume=0.25[music];[0:a][music]amix=inputs=2:duration=first:dropout_transition=2[aout]" \
  -map 0:v -map "[aout]" \
  -c:v copy \
  -c:a aac -b:a 192k \
  -shortest \
  "$OUT_DIR/cripto-finanzas-final.mp4"

echo "Done! Output: $OUT_DIR/cripto-finanzas-final.mp4"
