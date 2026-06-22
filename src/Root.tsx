import { Composition } from "remotion";
import { MyVideo } from "./videos/MyVideo";
import scriptData from "../youtube/finanzas/cripto-finanzas/script.json";

const FPS = 30;
const totalFrames = scriptData.scenes.reduce(
  (acc, scene) => acc + scene.duration * FPS,
  0
);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyVideo"
        component={MyVideo}
        durationInFrames={totalFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
