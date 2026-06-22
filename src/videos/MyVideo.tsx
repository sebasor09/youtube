import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import scriptData from "../../youtube/finanzas/cripto-finanzas/script.json";

const FPS = 30;
const FADE_FRAMES = 6;
const BASE_PATH = "youtube/finanzas/cripto-finanzas";

type Scene = (typeof scriptData.scenes)[number] & {
  startFrame: number;
  durationFrames: number;
};

function buildTimeline(): Scene[] {
  let cursor = 0;
  return scriptData.scenes.map((scene) => {
    const startFrame = cursor;
    const durationFrames = scene.duration * FPS;
    cursor += durationFrames;
    return { ...scene, startFrame, durationFrames };
  });
}

const timeline = buildTimeline();

export const MyVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#d4c5a9" }}>
      {timeline.map((scene) => {
        const { id, startFrame, durationFrames, assets } = scene;
        const localFrame = frame - startFrame;

        const opacity = interpolate(localFrame, [0, FADE_FRAMES], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <Sequence
            key={id}
            from={startFrame}
            durationInFrames={durationFrames}
          >
            <AbsoluteFill style={{ opacity }}>
              <Img
                src={staticFile(`${BASE_PATH}/${assets.img}`)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={() => undefined}
              />
            </AbsoluteFill>

            {assets.sound && (
              <Audio src={staticFile(assets.sound)} startFrom={0} volume={0.6} />
            )}

            {assets.voice_en && (
              <Audio src={staticFile(`${BASE_PATH}/${assets.voice_en}`)} startFrom={0} volume={1} />
            )}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
