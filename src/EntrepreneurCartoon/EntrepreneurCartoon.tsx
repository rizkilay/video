import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { Scene1Expectation } from "./Scene1Expectation";
import { SceneTransition } from "./SceneTransition";
import { Scene2Reality } from "./Scene2Reality";
import { Scene3Victory } from "./Scene3Victory";

export const SCENE_DURATIONS = {
  SCENE_1_START: 0,
  SCENE_1_DURATION: 180, // 0s - 6.0s (Attente / Rêve)

  TRANSITION_START: 180,
  TRANSITION_DURATION: 40, // 6.0s - 7.33s (Record Scratch / Choc)

  SCENE_2_START: 220,
  SCENE_2_DURATION: 240, // 7.33s - 15.33s (Réalité / 03:47 AM / Chaos)

  SCENE_3_START: 460,
  SCENE_3_DURATION: 200, // 15.33s - 22.0s (Virement +2,47€ & Danse de victoire)

  TOTAL_DURATION: 660, // 22 secondes au total @ 30 FPS
};

export const EntrepreneurCartoon: React.FC = () => {
  return (
    <div className="w-full h-full bg-black relative select-none font-sans">
      {/* --- MUSIQUE DE FOND FUNKY / COMÉDIE --- */}
      <Audio src={staticFile("audio/bgm.wav")} volume={0.25} />

      {/* 1. SCÈNE 1 : L'ATTENTE / LE RÊVE DORÉ */}
      <Sequence
        from={SCENE_DURATIONS.SCENE_1_START}
        durationInFrames={SCENE_DURATIONS.SCENE_1_DURATION}
      >
        <Scene1Expectation />
        <Audio src={staticFile("audio/scene1.mp3")} volume={1.0} />
      </Sequence>

      {/* 2. TRANSITION BRUTALE : RECORD SCRATCH & GLITCH */}
      <Sequence
        from={SCENE_DURATIONS.TRANSITION_START}
        durationInFrames={SCENE_DURATIONS.TRANSITION_DURATION}
      >
        <SceneTransition />
        <Audio src={staticFile("audio/scratch.wav")} volume={1.2} />
        <Sequence from={10} durationInFrames={30}>
          <Audio src={staticFile("audio/trans.mp3")} volume={1.0} />
        </Sequence>
      </Sequence>

      {/* 3. SCÈNE 2 : LA RÉALITÉ CRUE / CAFÉ / IMPÔTS / BUGS */}
      <Sequence
        from={SCENE_DURATIONS.SCENE_2_START}
        durationInFrames={SCENE_DURATIONS.SCENE_2_DURATION}
      >
        <Scene2Reality />
        <Audio src={staticFile("audio/scene2.mp3")} volume={1.0} />
        <Sequence from={110} durationInFrames={45}>
          <Audio src={staticFile("audio/alarm.wav")} volume={0.5} />
        </Sequence>
      </Sequence>

      {/* 4. SCÈNE 3 : LE VIREMENT DE 2.47€ & LA DANSE DU BOSS */}
      <Sequence
        from={SCENE_DURATIONS.SCENE_3_START}
        durationInFrames={SCENE_DURATIONS.SCENE_3_DURATION}
      >
        <Scene3Victory />
        <Audio src={staticFile("audio/ding.wav")} volume={1.3} />
        <Sequence from={20} durationInFrames={180}>
          <Audio src={staticFile("audio/scene3.mp3")} volume={1.0} />
        </Sequence>
      </Sequence>
    </div>
  );
};
