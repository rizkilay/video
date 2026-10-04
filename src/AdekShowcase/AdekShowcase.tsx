import React from "react";
import {
  Video,
  staticFile,
  Sequence,
  useCurrentFrame,
} from "remotion";
import { HeaderProgress } from "./HeaderProgress";
import {
  IntroContent,
  Step1Content,
  Step2Content,
  Step3Content,
  Step4Content,
} from "./StepCards";
import { HighlightPointer } from "./HighlightPointer";
import { OutroScreen } from "./OutroScreen";

// Timings in frames @ 30 FPS (total 1947 frames = 64.9 seconds)
const INTRO_START = 0;
const INTRO_DURATION = 630; // 0s - 21s (PC / Desktop overview)

const STEP1_START = 630;
const STEP1_DURATION = 205; // 21s - 27.8s (Sélection des produits & Panier mobile)

const STEP2_START = 835;
const STEP2_DURATION = 200; // 27.8s - 34.5s (Vente à crédit & à perte)

const STEP3_START = 1035;
const STEP3_DURATION = 240; // 34.5s - 42.5s (Mes Reçus & Modifier la facture)

const STEP4_START = 1275;
const STEP4_DURATION = 315; // 42.5s - 53s (Profile & Synchronisation cloud)

const OUTRO_START = 1590;
const OUTRO_DURATION = 357; // 53s - 64.9s (Outro animé avec logo & récapitulatif)

export const AdekShowcase: React.FC = () => {
  const frame = useCurrentFrame();

  // Determine active step index (0 to 3)
  let currentStep = 0;
  if (frame >= STEP4_START) {
    currentStep = 3;
  } else if (frame >= STEP3_START) {
    currentStep = 2;
  } else if (frame >= STEP2_START) {
    currentStep = 1;
  } else {
    currentStep = 0;
  }

  const isOutro = frame >= OUTRO_START;

  return (
    <div className="relative w-[1080px] h-[1920px] bg-white overflow-hidden font-sans select-none">
      {/* 1. Base Mobile Video playback */}
      <Video
        src={staticFile("demo.mp4")}
        className="w-full h-full object-cover"
      />

      {/* 2. Top Header & Stepper (visible during the active demo) */}
      {!isOutro && <HeaderProgress currentStep={currentStep} />}

      {/* 3. Left Feature Cards Column (positioned in the left margin next to the mobile phone) */}
      {!isOutro && (
        <div className="absolute left-6 top-[480px] z-20 pointer-events-none">
          {/* Phase 0 : Intro écosystème */}
          <Sequence from={INTRO_START} durationInFrames={INTRO_DURATION}>
            <IntroContent />
          </Sequence>

          {/* Phase 1 : Sélection & Vente Mobile */}
          <Sequence from={STEP1_START} durationInFrames={STEP1_DURATION}>
            <Step1Content />
          </Sequence>

          {/* Phase 2 : Vente à perte & à crédit */}
          <Sequence from={STEP2_START} durationInFrames={STEP2_DURATION}>
            <Step2Content />
          </Sequence>

          {/* Phase 3 : Modification de facture */}
          <Sequence from={STEP3_START} durationInFrames={STEP3_DURATION}>
            <Step3Content />
          </Sequence>

          {/* Phase 4 : Synchronisation cloud */}
          <Sequence from={STEP4_START} durationInFrames={STEP4_DURATION}>
            <Step4Content />
          </Sequence>
        </div>
      )}

      {/* 4. Contextual Dynamic Highlight Pointers on Mobile Actions */}
      {!isOutro && (
        <>
          {/* Action 1: Clic 'Vendre' sur le tableau de bord mobile */}
          <Sequence from={650} durationInFrames={45}>
            <HighlightPointer
              x={840}
              y={450}
              label="Bouton Vendre"
              sublabel="Ouvrir la caisse"
              color="blue"
              tooltipPosition="top"
            />
          </Sequence>

          {/* Action 2: Clic 'Encaisser' après sélection des produits */}
          <Sequence from={790} durationInFrames={45}>
            <HighlightPointer
              x={880}
              y={450}
              label="Encaisser"
              sublabel="Total : 13 000 F"
              color="emerald"
              tooltipPosition="left"
            />
          </Sequence>

          {/* Action 3: Sélection des modes (Payé / À payer / Perte) */}
          <Sequence from={845} durationInFrames={140}>
            <HighlightPointer
              x={720}
              y={450}
              label="Modes de vente"
              sublabel="Payé • À payer (Crédit) • Perte"
              color="amber"
              tooltipPosition="top"
            />
          </Sequence>

          {/* Action 4: Boutons Échanger / Supprimer sur le reçu */}
          <Sequence from={1130} durationInFrames={100}>
            <HighlightPointer
              x={725}
              y={450}
              label="Modifier la facture"
              sublabel="Échanger ou Supprimer l'article"
              color="blue"
              tooltipPosition="top"
            />
          </Sequence>

          {/* Action 5: Clic Synchroniser dans le profil */}
          <Sequence from={1300} durationInFrames={90}>
            <HighlightPointer
              x={890}
              y={450}
              label="Synchroniser en 1 clic"
              sublabel="Ventes, cotisations & dépenses"
              color="emerald"
              tooltipPosition="left"
            />
          </Sequence>
        </>
      )}

      {/* 5. Animated Outro Screen (53s - 64.9s) */}
      <Sequence from={OUTRO_START} durationInFrames={OUTRO_DURATION}>
        <OutroScreen />
      </Sequence>
    </div>
  );
};
