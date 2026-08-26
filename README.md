# YouTube Video Automation

Sistema para crear videos de YouTube de forma automatizada: guion → voz → video renderizado.

El flujo completo es:
```
Guion aprobado → script.json → ElevenLabs genera audio → Remotion renderiza el video
```

---

## Estructura del proyecto

```
youtube/                      # Canales — cada subcarpeta es un canal
  finanzas/
    GUIDE.md                  # Guía completa del canal (estilo, estructura, flujo)
    cripto-finanzas/          # Un video
      script.json             # Escenas: texto, imagen, voz, sonido
      guion.md                # Guion en prosa (fuente del script.json)
      img/                    # scene_001.png, scene_002.png, ...
      language/en/            # scene_001.mp3, scene_002.mp3, ... (voz en inglés)
      language/es/            # Misma estructura para español
      music/                  # Música de fondo del video
      sounds/                 # Efectos de sonido propios de este video
  miniaturas/                 # Thumbnails + sus prompts (.png y .txt)
scripts/
  generate-voice.mjs          # Generador de voz con ElevenLabs
  generate-voice-from7.mjs    # Variante puntual: regenera desde una escena en adelante
  build-video.py              # Monta el video final con ffmpeg (recomendado)
  build-video.sh              # Versión antigua del build, atada a cripto-finanzas
src/                          # Componentes de Remotion
public/                       # Symlinks a youtube/ y sounds/ (lo que ve Remotion y ffmpeg)
sounds/                       # Efectos de sonido globales
out/                          # Videos renderizados (ignorado por git)
storytelling.md               # Guía de storytelling para guiones
```

---

## ElevenLabs — Generar voz

El script `generate-voice.mjs` toma un `script.json` y genera los archivos de audio `.mp3` para cada escena usando la API de ElevenLabs.

### Requisitos

- Tener una cuenta en [ElevenLabs](https://elevenlabs.io) y obtener tu API key
- Node.js instalado

### Uso

```bash
ELEVEN_API_KEY=tu_api_key node scripts/generate-voice.mjs <ruta/al/script.json>
```

**Ejemplo:**
```bash
ELEVEN_API_KEY=tu_api_key node scripts/generate-voice.mjs youtube/finanzas/cripto-finanzas/script.json
```

### Qué hace

- Lee todas las escenas del `script.json`
- Genera `language/en/scene_001.mp3`, `scene_002.mp3`, etc.
- Salta automáticamente las escenas que ya tienen audio (útil para re-runs parciales)
- Respeta el rate limit de ElevenLabs (300ms entre requests)

### Voces configuradas

| Idioma | Voz | ID |
|--------|-----|----|
| English | Adam | `pNInz6obpgDQGcFmaJgB` |
| Español | Daniel | `onwK4e9ZLuTAKqWW03F9` |

Para cambiar la voz, edita el objeto `VOICES` en `scripts/generate-voice.mjs`.

### Regenerar solo una parte

`scripts/generate-voice-from7.mjs` es una variante puntual que arranca en una escena
concreta (`START_FROM_ID`) y usa un `VOICE_ID` fijo, para rehacer la voz de la segunda
mitad de un video sin tocar lo ya generado:

```bash
node scripts/generate-voice-from7.mjs youtube/finanzas/cripto-finanzas/script.json
```

Edita `START_FROM_ID` y `VOICE_ID` dentro del archivo antes de usarlo. Ojo: hoy lleva la
API key escrita en el propio archivo — conviene moverla a `ELEVEN_API_KEY` como en
`generate-voice.mjs`.

---

## ffmpeg — Montar el video

`scripts/build-video.py` arma el video final sin pasar por Remotion: una imagen fija por
escena, con la voz y su efecto de sonido mezclados, todo concatenado y con la música de
fondo encima.

```bash
python3 scripts/build-video.py <canal>/<video> [archivo-de-musica.mp3]
```

**Ejemplo:**
```bash
python3 scripts/build-video.py finanzas/cripto-finanzas "The Silent Ledger.mp3"
```

Si no se pasa música, toma el primer `.mp3` que encuentre en `music/`.

### Qué hace

- La duración de cada escena la marca su voz (`ffprobe` sobre `language/en/scene_XXX.mp3`)
- Mezcla el efecto de sonido de la escena al 60% de volumen, si `script.json` lo define
- Deja los clips sueltos en `out/clips_<video>/` y el concatenado en `out/<video>-nomusic.mp4`
- Añade la música de fondo al 25% y escribe `out/<video>-final.mp4`

### Requisitos

- `ffmpeg` y `ffprobe` en el PATH (`brew install ffmpeg`)
- La voz de todas las escenas ya generada
- En `script.json`, `img` y `voice_en` se resuelven contra la carpeta del video; `sound` se
  resuelve contra `public/` (o sea, `sounds/` global), así que va como `sounds/whoosh.mp3`

`scripts/build-video.sh` es la versión anterior del mismo montaje, con las rutas de
`cripto-finanzas` escritas a mano. Se mantiene como referencia; para videos nuevos usa
`build-video.py`.

---

## Remotion — Renderizar el video

```bash
# Abrir el studio (previsualización en vivo)
npm start

# Renderizar el video final
npm run build
```

---

## Canales

Cada canal tiene su propia guía con el estilo visual, tono, estructura de guiones y flujo de producción completo.

| Canal | Guía |
|-------|------|
| Finanzas | [youtube/finanzas/GUIDE.md](youtube/finanzas/GUIDE.md) |

Consulta la guía del canal antes de crear cualquier contenido — ahí está todo lo que necesitas saber para producir un video del canal sin preguntar nada extra.
