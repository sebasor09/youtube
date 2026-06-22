# YouTube Video Automation

Sistema para crear videos de YouTube de forma automatizada: guion → voz → video renderizado.

El flujo completo es:
```
Guion aprobado → script.json → ElevenLabs genera audio → Remotion renderiza el video
```

---

## Estructura del proyecto

```
youtube/                    # Canales — cada subcarpeta es un canal
  finanzas/
    GUIDE.md                # Guía completa del canal (estilo, estructura, flujo)
    cripto-finanzas/        # Un video
      script.json
      guion.md
      img/
      language/en/
      music/
scripts/
  generate-voice.mjs        # Generador de voz con ElevenLabs
src/                        # Componentes de Remotion
sounds/                     # Efectos de sonido globales
storytelling.md             # Guía de storytelling para guiones
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
