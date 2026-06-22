/**
 * ElevenLabs voice generator
 * Usage: ELEVEN_API_KEY=xxx node scripts/generate-voice.mjs <path-to-script.json>
 *
 * Generates voice audio for every scene in script.json.
 * Skips scenes where the audio file already exists.
 * Creates language/en/ and language/es/ folders automatically.
 */

import fs from "fs";
import path from "path";
import https from "https";

// ── Config ────────────────────────────────────────────────────────────────────

const API_KEY = process.env.ELEVEN_API_KEY;
const API_URL = "https://api.elevenlabs.io/v1/text-to-speech";
const MODEL = "eleven_multilingual_v2";

// Voice IDs — swap for any ElevenLabs voice you prefer
const VOICES = {
  en: "pNInz6obpgDQGcFmaJgB", // Adam (English)
  es: "onwK4e9ZLuTAKqWW03F9", // Daniel (Spanish/multilingual)
};

const VOICE_SETTINGS = {
  stability: 0.5,
  similarity_boost: 0.75,
  style: 0.3,
  use_speaker_boost: true,
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function httpsPost(url, headers, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method: "POST", headers }, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        if (res.statusCode !== 200) {
          reject(
            new Error(
              `ElevenLabs error ${res.statusCode}: ${Buffer.concat(chunks).toString()}`
            )
          );
        } else {
          resolve(Buffer.concat(chunks));
        }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function generateAudio(text, lang) {
  const voiceId = VOICES[lang];
  const url = `${API_URL}/${voiceId}`;
  const body = JSON.stringify({
    text,
    model_id: MODEL,
    voice_settings: VOICE_SETTINGS,
  });

  return httpsPost(url, {
    "xi-api-key": API_KEY,
    "Content-Type": "application/json",
    Accept: "audio/mpeg",
    "Content-Length": Buffer.byteLength(body),
  }, body);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Main ──────────────────────────────────────────────────────────────────────

const scriptPath = process.argv[2];

if (!API_KEY) {
  console.error("❌  ELEVEN_API_KEY is not set. Run:");
  console.error("    ELEVEN_API_KEY=your_key node scripts/generate-voice.mjs <script.json>");
  process.exit(1);
}

if (!scriptPath || !fs.existsSync(scriptPath)) {
  console.error("❌  Pass the path to script.json as argument:");
  console.error("    node scripts/generate-voice.mjs youtube/finanzas/cripto-finanzas/script.json");
  process.exit(1);
}

const script = JSON.parse(fs.readFileSync(scriptPath, "utf8"));
const baseDir = path.dirname(scriptPath);

const langDirs = {
  en: path.join(baseDir, "language", "en"),
  es: path.join(baseDir, "language", "es"),
};

fs.mkdirSync(langDirs.en, { recursive: true });
fs.mkdirSync(langDirs.es, { recursive: true });

const scenes = script.scenes;
const total = scenes.length; // English only
let done = 0;
let skipped = 0;

console.log(`\n🎙  Generating voice for ${scenes.length} scenes (EN only)\n`);

for (const scene of scenes) {
  const id = String(scene.id).padStart(3, "0");

  // Spanish is in script.json for review only — video is English only
  const tasks = [
    { lang: "en", text: scene.narration_en, file: path.join(langDirs.en, `scene_${id}.mp3`) },
  ];

  for (const task of tasks) {
    done++;
    const progress = `[${done}/${total}]`;

    if (fs.existsSync(task.file)) {
      console.log(`${progress} ⏭  scene_${id}.${task.lang} — already exists, skipping`);
      skipped++;
      continue;
    }

    try {
      process.stdout.write(`${progress} 🔊  scene_${id}.${task.lang} — generating...`);
      const audio = await generateAudio(task.text, task.lang);
      fs.writeFileSync(task.file, audio);
      console.log(` ✅  (${(audio.length / 1024).toFixed(0)} KB)`);

      // Respect ElevenLabs rate limits — 300ms between requests
      await sleep(300);
    } catch (err) {
      console.log(` ❌  ${err.message}`);
    }
  }
}

console.log(`\n✅  Done. ${done - skipped} generated, ${skipped} skipped.\n`);
