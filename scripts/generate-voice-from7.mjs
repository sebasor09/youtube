/**
 * One-time script: generate EN voice from scene 7 onward with a specific voice.
 * Usage: node scripts/generate-voice-from7.mjs <path-to-script.json>
 */

import fs from "fs";
import path from "path";
import https from "https";

const API_KEY = "sk_30251e1b828cbf9a1e39b4c9a37e9c7adb9982790235bf7e";
const VOICE_ID = "Gubgw9l4dtIoQA9YZHgx";
const API_URL = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
const MODEL = "eleven_multilingual_v2";
const START_FROM_ID = 7;

const VOICE_SETTINGS = {
  stability: 0.5,
  similarity_boost: 0.75,
  style: 0.3,
  use_speaker_boost: true,
};

function httpsPost(url, headers, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method: "POST", headers }, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        if (res.statusCode !== 200) {
          reject(new Error(`ElevenLabs error ${res.statusCode}: ${Buffer.concat(chunks).toString()}`));
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

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const scriptPath = process.argv[2];

if (!scriptPath || !fs.existsSync(scriptPath)) {
  console.error("❌  Pass the path to script.json as argument:");
  console.error("    node scripts/generate-voice-from7.mjs youtube/finanzas/cripto-finanzas/script.json");
  process.exit(1);
}

const script = JSON.parse(fs.readFileSync(scriptPath, "utf8"));
const baseDir = path.dirname(scriptPath);
const enDir = path.join(baseDir, "language", "en");
fs.mkdirSync(enDir, { recursive: true });

const scenes = script.scenes.filter((s) => s.id >= START_FROM_ID);
const total = scenes.length;
let generated = 0;
let failed = 0;

console.log(`\n🎙  Voice: ${VOICE_ID}`);
console.log(`📂  Output: ${enDir}`);
console.log(`📋  Generating ${total} scenes (EN, id >= ${START_FROM_ID})\n`);

for (let i = 0; i < scenes.length; i++) {
  const scene = scenes[i];
  const id = String(scene.id).padStart(3, "0");
  const file = path.join(enDir, `scene_${id}.mp3`);
  const progress = `[${i + 1}/${total}]`;

  try {
    process.stdout.write(`${progress} 🔊  scene_${id} — generating...`);
    const body = JSON.stringify({
      text: scene.narration_en,
      model_id: MODEL,
      voice_settings: VOICE_SETTINGS,
    });

    const audio = await httpsPost(API_URL, {
      "xi-api-key": API_KEY,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
      "Content-Length": Buffer.byteLength(body),
    }, body);

    fs.writeFileSync(file, audio);
    console.log(` ✅  (${(audio.length / 1024).toFixed(0)} KB)`);
    generated++;

    // Respect ElevenLabs rate limits
    await sleep(300);
  } catch (err) {
    console.log(` ❌  ${err.message}`);
    failed++;
  }
}

console.log(`\n✅  Done. ${generated} generated, ${failed} failed.\n`);
