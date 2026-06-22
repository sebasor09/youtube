import { AbsoluteFill, Img, staticFile } from "remotion";

export const MyVideo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Img src={staticFile("imagen.png")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </AbsoluteFill>
  );
};
