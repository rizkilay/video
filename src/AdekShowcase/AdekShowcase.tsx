import React from "react";
import {
  Video,
  staticFile,
  Sequence,
  useCurrentFrame,
} from "remotion";
import { TopBrandBar } from "./TopBrandBar";
import { BottomStepper } from "./BottomStepper";
import {
  PCStep1Content,
  PCStep2Content,
  PCStep3Content,
  PCStep4Content,
  MobileStep1Content,
  MobileStep2Content,
  MobileStep3Content,
  MobileStep4Content,
} from "./StepCards";
import { HighlightPointer } from "./HighlightPointer";
import { OutroScreen } from "./OutroScreen";

// ==========================================
// TIMINGS EN FRAMES @ 30 FPS (Total: 1947 frames = 64.9s)
// ==========================================

// --- PHASE 1 : VERSION PC / CAISSE COMPTOIR (0s à 21s) ---
const PC_STEP1_START = 0;
const PC_STEP1_DURATION = 140; // 0s - 4.6s (Sélection des produits PC)

const PC_STEP2_START = 140;
const PC_STEP2_DURATION = 130; // 4.6s - 9.0s (Détails du reçu & Réduire prix/quantité)

const PC_STEP3_START = 270;
const PC_STEP3_DURATION = 70; // 9.0s - 11.3s (Marquer comme perte ou Vente à crédit)

const PC_STEP4_START = 340;
const PC_STEP4_DURATION = 290; // 11.3s - 21.0s (Valider la vente & Bilan des factures)

// --- PHASE 2 : VERSION MOBILE / SMARTPHONE (21s à 53s) ---
const MOBILE_TOTAL_START = 630;

const MOBILE_STEP1_START = 630;
const MOBILE_STEP1_DURATION = 205; // 21s - 27.8s (Sélection & Panier Mobile)

const MOBILE_STEP2_START = 835;
const MOBILE_STEP2_DURATION = 200; // 27.8s - 34.5s (Vente à crédit & à perte Mobile)

const MOBILE_STEP3_START = 1035;
const MOBILE_STEP3_DURATION = 240; // 34.5s - 42.5s (Mes Reçus, Échanger & Supprimer)

const MOBILE_STEP4_START = 1275;
const MOBILE_STEP4_DURATION = 315; // 42.5s - 53.0s (Profil & Synchronisation Cloud)

// --- PHASE 3 : OUTRO ANIMÉ PRO (53s à 64.9s) ---
const OUTRO_START = 1590;
const OUTRO_DURATION = 357; // 53s - 64.9s

export const AdekShowcase: React.FC = () => {
  const frame = useCurrentFrame();

  const isPC = frame < MOBILE_TOTAL_START;
  const isOutro = frame >= OUTRO_START;

  // Calcul du step actif pour le stepper
  let currentStep = 0;
  if (isPC) {
    if (frame >= PC_STEP4_START) {
      currentStep = 3;
    } else if (frame >= PC_STEP3_START) {
      currentStep = 2;
    } else if (frame >= PC_STEP2_START) {
      currentStep = 1;
    } else {
      currentStep = 0;
    }
  } else {
    // Mode Mobile
    if (frame >= MOBILE_STEP4_START) {
      currentStep = 3;
    } else if (frame >= MOBILE_STEP3_START) {
      currentStep = 2;
    } else if (frame >= MOBILE_STEP2_START) {
      currentStep = 1;
    } else {
      currentStep = 0;
    }
  }

  return (
    <div className="relative w-[1080px] h-[1920px] bg-white overflow-hidden font-sans select-none">
      {/* 1. Vidéo de base de la démonstration */}
      <Video
        src={staticFile("demo.mp4")}
        className="w-full h-full object-cover"
      />

      {/* 2. Top Header minimaliste & élégant */}
      {!isOutro && <TopBrandBar />}

      {/* 3. Stepper de progression situé EN BAS, visible sur PC et Mobile */}
      {!isOutro && (
        <BottomStepper
          currentStep={currentStep}
          platform={isPC ? "pc" : "mobile"}
        />
      )}

      {/* 4. Cartes explicatives ultra-visibles selon la phase */}
      {!isOutro && (
        <>
          {/* --- DEMO PC (Positionnées en bas sous l'ordinateur) --- */}
          <Sequence
            from={PC_STEP1_START}
            durationInFrames={PC_STEP1_DURATION}
            style={{
              translate: "-720px -133px"
            }}
          >
            <PCStep1Content duration={PC_STEP1_DURATION} />
          </Sequence>

          <Sequence from={PC_STEP2_START} durationInFrames={PC_STEP2_DURATION}>
            <PCStep2Content duration={PC_STEP2_DURATION} />
          </Sequence>

          <Sequence from={PC_STEP3_START} durationInFrames={PC_STEP3_DURATION}>
            <PCStep3Content duration={PC_STEP3_DURATION} />
          </Sequence>

          <Sequence from={PC_STEP4_START} durationInFrames={PC_STEP4_DURATION}>
            <PCStep4Content duration={PC_STEP4_DURATION} />
          </Sequence>

          {/* --- DEMO MOBILE (Positionnées en haut AU-DESSUS du smartphone) --- */}
          <Sequence
            from={MOBILE_STEP1_START}
            durationInFrames={MOBILE_STEP1_DURATION}
          >
            <MobileStep1Content duration={MOBILE_STEP1_DURATION} />
          </Sequence>

          <Sequence
            from={MOBILE_STEP2_START}
            durationInFrames={MOBILE_STEP2_DURATION}
          >
            <MobileStep2Content duration={MOBILE_STEP2_DURATION} />
          </Sequence>

          <Sequence
            from={MOBILE_STEP3_START}
            durationInFrames={MOBILE_STEP3_DURATION}
          >
            <MobileStep3Content duration={MOBILE_STEP3_DURATION} />
          </Sequence>

          <Sequence
            from={MOBILE_STEP4_START}
            durationInFrames={MOBILE_STEP4_DURATION}
          >
            <MobileStep4Content duration={MOBILE_STEP4_DURATION} />
          </Sequence>
        </>
      )}

      {/* 5. Pointeurs interactifs ultra-précis sur les actions clés */}
      {!isOutro && (
        <>
          {/* --- POINTEURS PHASE PC --- */}

          {/* Clic sur un article pour l'ajouter au panier PC */}
          <Sequence from={45} durationInFrames={50}>
            <HighlightPointer
              x={340}
              y={470}
              label="Sélectionner l'article"
              sublabel="Type-c • 2 000 FCFA"
              color="blue"
              tooltipPosition="top"
            />
          </Sequence>

          {/* Clic sur le bouton 'Détails' sur PC */}
          <Sequence from={130} durationInFrames={45}>
            <HighlightPointer
              x={910}
              y={375}
              label="Bouton Détails"
              sublabel="Ouvrir la commande"
              color="purple"
              tooltipPosition="left"
            />
          </Sequence>

          {/* Réduire le prix ou la quantité dans la modale PC */}
          <Sequence from={180} durationInFrames={60}>
            <HighlightPointer
              x={470}
              y={250}
              label="Réduire le prix ou la quantité"
              sublabel="Ajustement direct en direct"
              color="indigo"
              tooltipPosition="right"
            />
          </Sequence>

          {/* Interrupteur 'Marquer comme perte' sur PC */}
          <Sequence from={275} durationInFrames={55}>
            <HighlightPointer
              x={525}
              y={425}
              label="Marquer comme perte"
              sublabel="Déstockage autorisé"
              color="rose"
              tooltipPosition="right"
            />
          </Sequence>

          {/* Clic 'Valider' sur PC */}
          <Sequence from={340} durationInFrames={50}>
            <HighlightPointer
              x={420}
              y={555}
              label="Valider la vente"
              sublabel="Enregistrement immédiat"
              color="emerald"
              tooltipPosition="top"
            />
          </Sequence>

          {/* --- POINTEURS PHASE MOBILE --- */}

          {/* Clic 'Vendre' sur le tableau de bord mobile */}
          <Sequence from={650} durationInFrames={45}>
            <HighlightPointer
              x={840}
              y={1640}
              label="Bouton Vendre"
              sublabel="Ouvrir la caisse mobile"
              color="blue"
              tooltipPosition="top"
            />
          </Sequence>

          {/* Clic 'Encaisser' après sélection des produits mobile */}
          <Sequence
            from={790}
            durationInFrames={45}
            style={{
              translate: "41px -107.7px",
              scale: 1.076
            }}
          >
            <HighlightPointer
              x={865}
              y={850}
              label="Encaisser"
              sublabel="Total : 13 000 FCFA"
              color="emerald"
              tooltipPosition="top"
            />
          </Sequence>

          {/* Sélection des modes (Payé / À payer / Perte) */}
          <Sequence
            from={850}
            durationInFrames={135}
            style={{
              translate: "-8px 0px"
            }}
          >
            <HighlightPointer
              x={420}
              y={1160}
              label="À payer (Crédit)"
              sublabel="Suivi de dette client"
              color="amber"
              tooltipPosition="left"
            />
          </Sequence>

          {/* Bouton Échanger sur le reçu mobile */}
          <Sequence
            from={1130}
            durationInFrames={100}
            style={{
              translate: "-203.3px -46.7px"
            }}
          >
            <HighlightPointer
              x={570}
              y={1750}
              label="Bouton Échanger"
              sublabel="Remplacement immédiat"
              color="blue"
              tooltipPosition="left"
            />
          </Sequence>

          {/* Clic Synchroniser dans le profil mobile */}
          <Sequence
            from={1300}
            durationInFrames={90}
            style={{
              translate: "-415.4px 156.5px",
              scale: 1.163
            }}
          >
            <HighlightPointer
              x={690}
              y={1245}
              label="Synchroniser en 1 clic"
              sublabel="Ventes, cotisations & dépenses"
              color="emerald"
              tooltipPosition="left"
            />
          </Sequence>
        </>
      )}

      {/* 6. Écran d'outro animé pro */}
      <Sequence from={OUTRO_START} durationInFrames={OUTRO_DURATION}>
        <OutroScreen />
      </Sequence>
    </div>
  );
};
