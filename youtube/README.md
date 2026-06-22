# Canales

Cada carpeta aquí es un canal de YouTube independiente. Cada canal tiene su propia guía (`GUIDE.md`) que define todo lo necesario para producir videos: identidad, estilo visual, tono, estructura de guiones y métricas.

## Canales disponibles

| Canal | Guía | Descripción |
|-------|------|-------------|
| `finanzas/` | [GUIDE.md](finanzas/GUIDE.md) | Finanzas personales y criptomonedas |

## Cómo añadir un nuevo canal

1. Crear una carpeta con el nombre del canal (ej. `tecnologia/`)
2. Copiar el `GUIDE.md` de cualquier canal existente como base
3. Completar todos los campos `[corchetes]` con la identidad del nuevo canal
4. Crear una subcarpeta por cada video dentro del canal

## Estructura de un canal

```
nombre-canal/
├── GUIDE.md          # Guía completa del canal — leer antes de producir cualquier video
└── nombre-video/
    ├── guion.md
    ├── script.json
    ├── img/
    ├── language/
    │   └── en/
    ├── sounds/
    └── music/
```

> Antes de crear cualquier guion, leer el `GUIDE.md` del canal correspondiente. Ahí está todo: el estilo visual, las reglas de narración, el schema del `script.json` y el flujo completo de producción.
