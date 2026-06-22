# Channel Guide: [Channel Name]

> **INSTRUCCIONES:** Completa cada sección con la información de tu canal.
> Esta guía define la identidad y estilo visual de todos los videos del canal.
> La IA usará esta información para generar imágenes y estructurar el contenido.

---

## Channel Identity
- **Name:** [Nombre del canal]
- **Niche:** [Ej: Cryptocurrency, Personal Finance, Tech]
- **Tone:** [Ej: Professional, Casual, Educational]
- **Target Audience:** [Ej: Adults 25-45, beginners]
- **Language:** [Ej: English, Spanish]

## Visual Style
- **Color Palette:** [Ej: #1a1a2e, #e94560]
- **Character Style:** [Ej: Stickman with brown hair]
- **Art Style:** [Ej: 2D cartoon, minimalist]
- **Background:** [Ej: Solid beige #d4a574]
- **Objects:** [Ej: Simple illustrated props]
- **Typography:** [Ej: Montserrat Bold]
- **Thumbnail Format:** [Ej: Character + bold text + prop]

## Video Structure
1. **Hook** (0-15s): [Tipo de gancho]
2. **Introduction** (15-30s): [Qué aprenderán]
3. **Main Content** (X-Y min): [Estructura del contenido]
4. **Call to Action** (final 30s): [CTA]

## Script Style
- **Format:** [Ej: Narrated, conversational]
- **Pace:** [Ej: Medium, clear]
- **Language:** [Ej: Professional English]
- **Visual Elements:** [Ej: Charts, text on screen]

## Image Requirements
- **Resolution:** 1920x1080 (16:9)
- **Format:** JPG/PNG
- **Style:** [Ej: Stickman animation]
- **Character:** [Ej: Consistent across all videos]
- **Background:** [Ej: Beige solid]
- **Objects:** [Ej: Simple props]
- **Text on Image:** [Ej: Bold, high contrast]

## Animation Style
- **Character:** [Ej: Stickman with expressions]
- **Props:** [Ej: Clocks, money, charts]
- **Transitions:** [Ej: Smooth movements]
- **Text Overlays:** [Ej: Fade/slide effects]

## Content Types
- [Ej: Explainers]
- [Ej: How-to guides]
- [Ej: News breakdown]

## Metrics
- **Ideal Duration:** [Ej: 8-15 minutes]
- **Posting Frequency:** [Ej: 2-3 per week]
- **Best Upload Times:** [Ej: Tuesday 10am EST]

---

## Estructura de Carpetas por Video

```
{nombre_video}/
├── img/                    # Imágenes generadas para el video
├── language/
│   ├── es/                 # Voces en español
│   └── en/                 # Voces en inglés
├── sounds/                 # Efectos de sonido (transiciones, etc.)
└── music/                  # Música de fondo
```

## Flujo de Trabajo - Guiones

### Flujo para crear contenido de video

1. **Cuando el usuario diga "dame el guion para {video}"** → Crear la carpeta con la estructura anterior
2. **Crear `guion.md`** con el contenido/guion del video en esa carpeta
3. **El usuario revisa** el guion y lo aprueba
4. **Crear `script.json`** con toda la información para Remotion:
   - Escenas divididas cada 3 segundos por sentido
   - Prompts para generar imágenes (estilo definido en la guía)
   - Prompt para música en Suno
   - Texto/narración por escena
   - Ruta de cada asset (img, voice, sound, music)

5. **Remotion genera el video** usando el script.json
