# Channel Guide: [Channel Name]

> **INSTRUCCIONES:** Completa cada sección con la información de tu canal.
> Esta guía define la identidad y estilo visual de todos los videos del canal.
> La IA usará esta información para generar imágenes y estructurar el contenido.

---

## ¿Qué es esta guía y cómo funciona?

Esta guía es el manual de identidad y producción del canal. Define quién es el canal, cómo se ve, cómo suena y cómo se crea cada video — de principio a fin.

**¿Para qué sirve?**
Sirve para que cualquier persona (o una IA) pueda crear un video del canal sin necesidad de preguntar nada. Todo lo que necesitas saber está aquí: el estilo visual, la voz del canal, la estructura de cada video y el flujo paso a paso para producirlo.

**¿Cómo funciona?**

1. **Completa la guía una sola vez.** Rellena los campos marcados con `[corchetes]` con la información real de tu canal. Eso es todo lo que necesitas hacer al inicio.
2. **Pide un guion.** Cuando quieras crear un video, dile a la IA: *"dame el guion para [tema]"*. La IA leerá esta guía y creará el contenido siguiendo tu estilo, tu tono y tu estructura.
3. **Revisa y aprueba.** Lees el guion, haces ajustes si quieres, y das luz verde.
4. **Se genera el video.** La IA crea el archivo técnico (`script.json`) con todo lo que necesita Remotion para producir el video automáticamente: imágenes, narración, música y efectos.

**Flujo resumido:**
```
Tú pides un tema → IA genera el guion → Tú lo apruebas → IA genera el script.json → Remotion produce el video
```

No necesitas saber de programación ni de diseño. Esta guía hace el trabajo pesado por ti.

---

## Channel Identity
- **Name:** [Nombre del canal]
- **Niche:** [Ej: Cryptocurrency, Personal Finance, Tech]
- **Tone:** [Ej: Professional, Casual, Educational]
- **Target Audience:** [Ej: Adults 25-45, beginners]
- **Language:** [Ej: English, Spanish]

## Visual Style

- **Main Character:** Large round white circle head, spiky short blonde/orange hair, expressive cartoon face with big eyes and visible mouth showing emotion. Thin black stick body, small stick hands and feet. Subtle drop shadow beneath the character.
- **Secondary Characters:** Simpler stickmen — round white circle head, minimal dot eyes, thin black stick body. No hair. Used for crowds or background figures.
- **Background:** Flat solid warm beige/tan color. No gradients, no textures, no patterns. Single flat color fills the entire frame.
- **Art Style:** 2D cartoon, hand-drawn feel, clean bold black outlines, flat colors only. No shading except subtle shadow under main character. Similar to Cyanide & Happiness animation style.
- **Props & Objects:** Simple, flat, recognizable. Bold black outlines, flat fill colors, no gradients. Keep objects minimal but clear.
- **No text on images.** All text goes in the narration, never burned into the scene image.
- **Color Palette:** Warm beige background (~#d4c5a9), white for character heads, black outlines, accent colors only for key props (red for danger/loss, green for gain, gold for money).
- **Resolution:** 1920x1080 (16:9)
- **Typography (thumbnails only):** Bold, high contrast, large text over character.

### Image Prompt Style Suffix

Every `image_prompt` in the script.json must end with this exact style block:

```
2D cartoon stickman animation style, main character has large round white circle head with spiky blonde hair and expressive face, thin black stick body, flat solid warm beige background, bold black outlines, flat colors, no gradients, no text, hand-drawn feel, Cyanide and Happiness art style, 16:9
```

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

### Duración objetivo — Mínimo 8 minutos

Todo guion debe producir un video de **entre 8 y 12 minutos**. Esto no es opcional — es el mínimo para monetización completa en YouTube (mid-roll ads).

Referencia de ritmo de narración: **130 palabras por minuto** (ritmo claro, pausas incluidas).

| Duración objetivo | Palabras en el guion |
|-------------------|----------------------|
| 8 minutos         | ~1,040 palabras      |
| 10 minutos        | ~1,300 palabras      |
| 12 minutos        | ~1,560 palabras      |

**Reglas para alcanzar la duración:**
- El guion debe tener **mínimo 1,200 palabras de narración** (sin contar stage directions ni notas de edición).
- Cada bloque temático principal debe desarrollarse con profundidad: contexto → explicación → analogía → ejemplo real → consecuencia. No saltar pasos.
- Si el guion termina antes de las 1,200 palabras, agregar un bloque adicional de micro-storytelling (técnica #4) o un segundo open loop con más contexto histórico.
- Al terminar el guion, indicar la cuenta de palabras estimada y la duración proyectada en minutos.

---

### Principio base — Explica para cualquiera

El guion debe poder entenderlo alguien que nunca ha escuchado el tema en su vida. Si un concepto necesita conocimiento previo para entenderse, hay que explicar primero ese conocimiento previo.

Reglas concretas:
- Cero jerga sin definir. Si usas una palabra técnica, la siguiente frase la explica.
- Nunca asumir que el espectador sabe algo. Partir de cero siempre.
- Si puedes explicarlo con una analogía cotidiana, úsala. Si no puedes, la explicación todavía no está lista.
- El test: ¿lo entendería alguien de 15 años sin contexto? Si no, reescribir.

---

### Reglas obligatorias al crear un guion

**Todo dato debe estar verificado.**

Antes de incluir cualquier cifra, fecha, estadística, nombre o hecho en el guion, verificar que sea real y preciso. No inventar datos, no aproximar sin advertirlo, no usar cifras de memoria.

Reglas concretas:
- Si un dato no se puede verificar en el momento, **no incluirlo**. Preferir una explicación cualitativa antes que un número dudoso.
- Si el dato es una estimación o puede variar, indicarlo explícitamente en el guion: *"se estima que..."*, *"según datos de [fuente]..."*.
- Los datos de precios, retornos, fechas de eventos y cifras de mercado son los más críticos — verificar siempre con fuente específica antes de escribirlos.
- Al terminar el guion, listar al final los datos clave utilizados y su fuente, para que el creador pueda validarlos antes de publicar.

La credibilidad del canal depende de esto. Un solo dato falso publicado destruye la confianza del espectador.

---

**Antes de escribir cualquier guion, leer y aplicar `/storytelling.md`.**

El guion no es un informe ni una lista de datos — es una historia. Aplicar los principios de `storytelling.md`:
- Definir el resumen en una oración (brújula del episodio)
- Identificar el detonante (el momento sin retorno)
- Establecer los stakes (qué se gana o pierde)
- Tener claro el arco de transformación
- Usar el formato Cliffhanger como estructura natural del canal
- Arrancar en acción (sin preámbulos), cerrar con aterrizaje fuerte (sin moraleja)
- Aplicar el callback: frase textual del antagonista que regresa al final

**El guion debe tener loop de retención.**

Cada cierto punto del guion (aprox. cada 2-3 minutos) incluir un gancho que fuerce al espectador a seguir viendo:
- Una pregunta sin resolver: *"Pero lo que nadie sabía todavía era..."*
- Un dato que se promete revelar más adelante: *"Y eso te lo explico en un momento."*
- Una afirmación que genera curiosidad: *"El número que aparece después va a sorprenderte."*
- Un cliffhanger de escena: cortar en el momento de mayor tensión antes de pasar al siguiente bloque.

El loop no debe sentirse forzado — debe nacer de la narrativa. Si no hay tensión real en ese punto, construirla antes de colocar el gancho.

---

### Técnicas de alto rendimiento para retención (extraídas de análisis de guiones exitosos)

Estas técnicas van más allá del storytelling base — son las palancas que mantienen al espectador desde el segundo 1 hasta el final.

#### 1. Hook con dualidad emocional
El gancho no solo presenta el tema — presenta el conflicto humano detrás. Introduce la dualidad de inmediato:
> "Hay gente que hizo muchísimo dinero con esto... y hay gente que lo perdió todo."

El cerebro humano se engancha con el riesgo y la recompensa al mismo tiempo. Sin dualidad, el hook es solo un titular.

#### 2. Retention Pledge — La promesa de 3 preguntas
Al cerrar el hook, plantear explícitamente 2-3 preguntas concretas que el video va a responder. El espectador inconscientemente se queda a esperar que se cumplan todas.
> "Al final de este video vas a entender: qué es, cómo funciona, y por qué a la gente le cambia la vida."

#### 3. Analogías físicas para conceptos abstractos
Cada concepto técnico o financiero debe aterrizarse en un objeto físico o situación cotidiana que el espectador ya conoce. No explicar — traducir.

| Concepto abstracto | Analogía física |
|--------------------|-----------------|
| Red distribuida / blockchain | Un cuaderno del que todos tienen copia idéntica |
| Llave pública / privada | Dirección de tu casa vs. llave de tu puerta |
| Volatilidad de precio | El precio de un café que cambia cada hora |
| Cold wallet perdida | Un disco duro tirado a la basura con millones adentro |

Si no existe la analogía, inventarla antes de escribir la escena.

#### 4. Micro-storytelling para romper monotonía
Cada vez que el guion entre en zona de "glosario" o definiciones seguidas, cortar con una historia humana real de 30-60 segundos. La historia debe tener:
- Un personaje real con nombre
- Una decisión concreta
- Una consecuencia extrema (ganó todo / perdió todo / cambió su vida)

Esto destruye el aburrimiento y ancla el concepto en la memoria emocional del espectador.

#### 5. Equilibrio narrativo — Autoridad moral
El guion no toma partido. Por cada dato positivo ("retorno del 13,000%") incluir inmediatamente el contrapeso negativo ("caída del 65% en seis meses"). Esto:
- Le da credibilidad al canal (no suena a pump, no suena a FUD)
- Destruye el escepticismo natural del espectador de YouTube
- Hace que el espectador confíe y se quede a escuchar

#### 6. Anclaje de autoridad con nombres grandes
Para validar la magnitud de un dato, compararlo con una referencia que el espectador ya respeta:
> "Ni Warren Buffett ha logrado ese retorno en toda su carrera."

No abusar — 1 o 2 por video máximo. Usarlos en los puntos donde el dato parece increíble.

#### 7. Open loop para futuros videos
Mencionar un concepto relacionado que no se va a explicar en este video. El loop debe generar curiosidad — no hacer promesas de fechas ni de "el próximo video". No comprometerse con nada concreto.

**Correcto:**
> "Hay más en esta historia — cómo comprarlo sin cometer los errores que comete todo el mundo, dónde guardarlo para que nadie más lo toque. Pero eso ya es otro capítulo."

**Incorrecto:**
> "Eso lo explico en el próximo video, la semana que viene." ← No. No prometer fechas ni videos específicos.

El loop planta la semilla de que hay más, sin crear una deuda de contenido. Máximo 1 por video.

#### 8. Ritmo de sección — Regla de los 2-3 minutos
Cada bloque temático debe durar entre 2 y 3 minutos. Al llegar al límite, cambiar el ángulo, la analogía, o el tipo de contenido (dato → historia → concepto → dato). El editor debe tener señales claras de cuándo cambiar gráficos o animaciones — el guion debe indicarlo.

#### 9. Disclaimer al cierre (protección legal y credibilidad)
Antes del CTA final, incluir siempre un descargo de responsabilidad breve:
> "Esto no es consejo financiero. Investiga por tu cuenta y nunca inviertas lo que no puedas perder."

Esto protege legalmente al canal y paradójicamente aumenta la confianza del espectador.

#### 10. Polémica intencional — El motor de los comentarios
El guion debe tener al menos un momento que divida opiniones. No es clickbait ni mentira — es plantear algo real que la gente defiende o ataca. Los comentarios, la discusión y el debate son señal para el algoritmo de YouTube de que el video genera emoción.

Cómo generarla sin perder credibilidad:
- **Afirmación que contradice la creencia popular:** Decir algo que el espectador promedio cree que es falso, pero que tiene evidencia detrás. El espectador que no está de acuerdo comenta. El que sí está de acuerdo también comenta para defenderlo.
  > "La mayoría de la gente que perdió dinero en cripto no perdió por el mercado — perdió por sus propias decisiones."
- **Pregunta sin respuesta al cierre:** No resolver la pregunta central del debate — dejarla abierta para que el espectador la responda en los comentarios.
  > "¿Crees que Bitcoin va a reemplazar al dólar algún día? Dímelo abajo."
- **Dato incómodo presentado con calma:** Un hecho que incomoda pero que es verificable. No dramatizar — presentarlo como algo que simplemente es así.
  > "El 90% de los que compran cripto sin entenderlo terminan vendiendo en pérdida."
- **Comparación que genera debate:** Poner dos posturas enfrentadas sin declarar ganador, dejando que el espectador elija bando.
  > "Hay quienes dicen que Bitcoin es el oro del siglo XXI. Hay quienes dicen que es la burbuja más grande de la historia. Y los dos tienen datos para probarlo."

Reglas para no perder la autoridad moral:
- La polémica debe basarse en hechos reales, no en exageración.
- El canal no toma partido — presenta el conflicto y lo deja abierto.
- Nunca atacar a personas específicas ni grupos — la polémica es sobre ideas, no sobre individuos.
- Máximo 1-2 momentos de polémica por video. Más que eso se siente manipulador.

---

### Flujo para crear contenido de video

1. **Cuando el usuario diga "dame el guion para {video}"** → Crear la carpeta con la estructura anterior
2. **Crear `guion.md`** con el contenido del video en esa carpeta, siguiendo todas las reglas de esta guía
3. **El usuario revisa** el guion y lo aprueba
4. **Cuando el usuario apruebe**, generar `script.json` siguiendo el schema definido más abajo
5. **Remotion genera el video** usando el script.json

---

### Idioma del guion — Inglés primero, siempre bilingüe

Todo guion debe generarse en **dos idiomas**:

- **`guion.md`** → Contiene ambas versiones: primero el guion completo en **inglés**, luego el guion completo en **español**. El inglés es la versión principal.
- **`script.json`** → Incluye la narración en inglés (`narration_en`) y en español (`narration_es`) por cada escena.
- Las rutas de voz en assets reflejan ambos idiomas: `language/en/` y `language/es/`

El inglés es el idioma prioritario porque define el alcance de audiencia máximo del canal.

---

### Schema del script.json

Cuando el usuario apruebe el guion, generar el archivo `script.json` dentro de la carpeta del video siguiendo exactamente este schema:

```json
{
  "title": "Título del video",
  "video_id": "nombre-carpeta-del-video",
  "language_primary": "en",
  "estimated_duration_seconds": 0,
  "music_prompt": "Descripción en inglés para generar la música en Suno. Estilo, BPM, mood, sin letras.",
  "visual_style": "Descripción del estilo visual tomada de la sección Visual Style de esta guía",
  "scenes": [
    {
      "id": 1,
      "duration": 4,
      "narration_en": "English narration text for this scene.",
      "narration_es": "Texto de narración en español para esta escena.",
      "image_prompt": "Image prompt in English describing exactly what to show visually. Always ends with the visual style from this guide.",
      "assets": {
        "img": "img/scene_001.jpg",
        "voice_en": "language/en/scene_001.mp3",
        "voice_es": "language/es/scene_001.mp3",
        "sound": "sounds/nombre.mp3 or null",
        "music": "music/background.mp3"
      }
    }
  ]
}
```

**Reglas para armar las escenas:**

- Cada escena dura entre **3 y 5 segundos**. Nunca más.
- El corte de escena es por **sentido narrativo**, no por párrafo ni por coma. Cada escena debe tener una sola idea visual.
- El `image_prompt` siempre en inglés. Describe qué se ve en pantalla, luego cierra con el **Image Prompt Style Suffix** exacto definido en la sección `Visual Style` de esta guía. Sin ese sufijo, la imagen no va a coincidir con el estilo del canal.
- El `sound` va en null si esa escena no tiene efecto de sonido específico.
- Al terminar el script.json, indicar el total de escenas y la duración total estimada en segundos.
