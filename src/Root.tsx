import "./index.css";
import { Composition, Folder } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";

import { AdekShowcase } from "./AdekShowcase/AdekShowcase";
import { EntrepreneurCartoon, SCENE_DURATIONS } from "./EntrepreneurCartoon/EntrepreneurCartoon";
import { AdekTakbirVideo } from "./AdekTakbir/AdekTakbirVideo";
import { ADEK_TIMINGS } from "./AdekTakbir/types";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AdekTakbirStory"
        component={AdekTakbirVideo}
        durationInFrames={ADEK_TIMINGS.TOTAL_FRAMES}
        fps={ADEK_TIMINGS.FPS}
        width={ADEK_TIMINGS.WIDTH}
        height={ADEK_TIMINGS.HEIGHT}
      />
      <Composition
        id="EntrepreneurCartoon"
        component={EntrepreneurCartoon}
        durationInFrames={SCENE_DURATIONS.TOTAL_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AdekShowcase"
        component={AdekShowcase}
        durationInFrames={1947}
        fps={30}
        width={1080}
        height={1920}
      />
      <Folder name="Elements">
        <Composition
          id="Logo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
          }}
        />
        <Composition
          id="Title"
          component={Title}
          durationInFrames={115}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
          }}
        />
      </Folder>
      <Composition
        // You can take the "id" to render a video:
        // bunx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
        }}
      />
    </>
  );
};
