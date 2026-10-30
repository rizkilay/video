import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { ADEK_TIMINGS } from "./types";
import { Scene1CuredentThermomettre } from "./Scene1CuredentThermomettre";
import { Scene2Colere } from "./Scene2Colere";
import { Scene3NouveauxEmployes } from "./Scene3NouveauxEmployes";
import { Scene4AdekSolution } from "./Scene4AdekSolution";

export const AdekTakbirVideo: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden font-sans select-none">
      {/* (Musique de fond enlevée selon la demande de l'utilisateur) */}

      {/* ------------------------------------------------------------- */}
      {/* SCÈNE 1 : Le problème du stock (cure-dent -> thermomètre) */}
      {/* ------------------------------------------------------------- */}
      <Sequence
        from={ADEK_TIMINGS.SCENE1_START}
        durationInFrames={ADEK_TIMINGS.SCENE1_DURATION}
      >
        <Scene1CuredentThermomettre />
        {/* Voix off narration */}
        <Audio
          src={staticFile("audio/takbir_narration/narration_scene1.mp3")}
          volume={1.0}
        />
        {/* SFX pop/ding lors de la transformation en thermomètre */}
        <Sequence from={70} durationInFrames={40}>
          <Audio src={staticFile("audio/ding.wav")} volume={0.7} />
        </Sequence>
        {/* Réaction Alladji Takbir : soupir comique */}
        <Sequence from={95} durationInFrames={70}>
          <Audio
            src={staticFile("audio/takbir_sfx/alladji_soupir.mp3")}
            volume={0.8}
          />
        </Sequence>
      </Sequence>

      {/* ------------------------------------------------------------- */}
      {/* SCÈNE 2 : La dispute et la colère rouge */}
      {/* ------------------------------------------------------------- */}
      <Sequence
        from={ADEK_TIMINGS.SCENE2_START}
        durationInFrames={ADEK_TIMINGS.SCENE2_DURATION}
      >
        <Scene2Colere />
        {/* Voix off narration */}
        <Audio
          src={staticFile("audio/takbir_narration/narration_scene2.mp3")}
          volume={1.0}
        />
        {/* Alarme / tension discrète */}
        <Sequence from={20} durationInFrames={50}>
          <Audio src={staticFile("audio/alarm.wav")} volume={0.35} />
        </Sequence>
      </Sequence>

      {/* ------------------------------------------------------------- */}
      {/* SCÈNE 3 : Nouveaux employés & 3 femmes d'Alladji */}
      {/* ------------------------------------------------------------- */}
      <Sequence
        from={ADEK_TIMINGS.SCENE3_START}
        durationInFrames={ADEK_TIMINGS.SCENE3_DURATION}
      >
        <Scene3NouveauxEmployes />
        {/* Voix off narration */}
        <Audio
          src={staticFile("audio/takbir_narration/narration_scene3.mp3")}
          volume={1.0}
        />
        {/* Chime positif */}
        <Sequence from={5} durationInFrames={40}>
          <Audio src={staticFile("audio/ding.wav")} volume={0.6} />
        </Sequence>
        {/* Murmure des épouses */}
        <Sequence from={45} durationInFrames={80}>
          <Audio
            src={staticFile("audio/takbir_sfx/wives_murmur.mp3")}
            volume={0.75}
          />
        </Sequence>
      </Sequence>

      {/* ------------------------------------------------------------- */}
      {/* SCÈNES 4 & 5 : Démonstration Adék Solution & Alladji dort */}
      {/* ------------------------------------------------------------- */}
      <Sequence
        from={ADEK_TIMINGS.SCENE4_START}
        durationInFrames={ADEK_TIMINGS.SCENE4_DURATION}
      >
        <Scene4AdekSolution />

        {/* Voix off : Partie 4 (Pourtant, tout cela pourrait être évité...) */}
        <Sequence from={15}>
          <Audio
            src={staticFile("audio/takbir_narration/narration_scene4.mp3")}
            volume={1.0}
          />
        </Sequence>

        {/* Voix off : Partie 5 (Avec Adék Solution, il pourrait enfin avoir...) */}
        <Sequence from={560}>
          <Audio
            src={staticFile("audio/takbir_narration/narration_scene5.mp3")}
            volume={1.0}
          />
        </Sequence>

        {/* Ronflement comique d'Alladji en toute tranquillité */}
        <Sequence from={280} durationInFrames={120}>
          <Audio
            src={staticFile("audio/takbir_sfx/alladji_ronfle.mp3")}
            volume={0.7}
          />
        </Sequence>
      </Sequence>
    </div>
  );
};
