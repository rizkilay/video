import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  ShoppingBag,
  TrendingDown,
  Clock,
  FileEdit,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Smartphone,
  Sliders,
  Check,
  Database,
  ArrowRight,
} from "lucide-react";

interface StepCardWrapperProps {
  children: React.ReactNode;
  durationInFrames: number;
  position?: "pc-bottom" | "mobile-top";
}

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  delayInFrames?: number;
  direction?: "up" | "left" | "pop";
  className?: string;
}> = ({ children, delayInFrames = 0, direction = "up", className = "" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delayInFrames);
  const anim = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 13, mass: 0.5, stiffness: 135 },
  });

  const opacity = interpolate(anim, [0, 1], [0, 1]);
  const translateY = direction === "up" ? interpolate(anim, [0, 1], [18, 0]) : 0;
  const translateX = direction === "left" ? interpolate(anim, [0, 1], [-20, 0]) : 0;
  const scale = direction === "pop" ? interpolate(anim, [0, 1], [0.88, 1]) : 1;

  return (
    <div
      style={{
        transform: `translateY(${translateY}px) translateX(${translateX}px) scale(${scale})`,
        opacity,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export const AnimatedStepWrapper: React.FC<StepCardWrapperProps> = ({
  children,
  durationInFrames,
  position = "pc-bottom",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring with snappy overshoot
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.55, stiffness: 125 },
  });

  // Exit transition during last 15 frames
  const exitFrames = 15;
  const exitStart = Math.max(0, durationInFrames - exitFrames);
  const exitProgress = interpolate(
    frame,
    [exitStart, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Floating idle motion (SaaS Motion Design Floating Effect)
  const floatY = Math.sin(frame / 16) * 4;

  const translateYEntrance = interpolate(
    entrance,
    [0, 1],
    [position === "pc-bottom" ? 60 : -60, 0]
  );
  const translateYExit = interpolate(
    exitProgress,
    [0, 1],
    [0, position === "pc-bottom" ? 40 : -40]
  );
  const translateY = translateYEntrance + translateYExit + floatY;

  const scaleEntrance = interpolate(entrance, [0, 1], [0.92, 1]);
  const scaleExit = interpolate(exitProgress, [0, 1], [1, 0.95]);
  const scale = scaleEntrance * scaleExit;

  // We combine translate-x(-50%) to center it properly with the animation transforms.
  const transform = `translateX(-50%) translateY(${translateY}px) scale(${scale})`;

  const opacityEntrance = interpolate(entrance, [0, 1], [0, 1]);
  const opacityExit = interpolate(exitProgress, [0, 1], [1, 0]);
  const opacity = opacityEntrance * opacityExit;

  const topPos = position === "pc-bottom" ? "820px" : "110px";

  return (
    <div
      style={{
        transform,
        opacity,
        left: "50%",
        top: topPos,
      }}
      className="absolute w-[800px] z-30 pointer-events-none select-none"
    >
      <div 
        className="bg-[#FCF9F2] p-8 rounded-[40px] border-[6px] border-slate-900 shadow-[16px_20px_0px_0px_rgba(15,23,42,1)]"
        style={{ transform: "rotate(-1.5deg)" }}
      >
        {children}
      </div>
    </div>
  );
};

// Layout Helpers for the new Chunky Design
const CardIconBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-[#EBE5D6] rounded-[24px] border-[4px] border-slate-900 p-8 mb-8 flex items-center justify-center min-h-[220px]">
    {children}
  </div>
);

const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-[44px] font-black text-slate-900 tracking-tight leading-none mb-4 text-center">
    {children}
  </h2>
);

const CardSubtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[26px] text-slate-700 font-bold leading-snug text-center max-w-[650px] mx-auto">
    {children}
  </p>
);

// Compatibility export
export const AnimatedCard: React.FC<{ children: React.ReactNode; side?: string; delay?: number }> = ({ children }) => {
  return <div>{children}</div>;
};

// =========================================================================
// PC DEMO STEPS (Frames 0 to 630)
// =========================================================================

export const PCStep2Content: React.FC<{ duration: number }> = ({ duration }) => {
  return (
    <AnimatedStepWrapper durationInFrames={duration} position="pc-bottom">
      <StaggerItem delayInFrames={4} direction="pop">
        <CardIconBlock>
          <div className="flex gap-10 items-center text-slate-900">
            <Sliders size={110} strokeWidth={2.5} />
            <span className="text-6xl font-black">+</span>
            <FileEdit size={110} strokeWidth={2.5} />
          </div>
        </CardIconBlock>
      </StaggerItem>
      <StaggerItem delayInFrames={8} direction="up">
        <CardTitle>Prix & Quantités</CardTitle>
      </StaggerItem>
      <StaggerItem delayInFrames={12} direction="up">
        <CardSubtitle>
          Ajustez ou négociez le prix unitaire directement depuis le reçu en un clic.
        </CardSubtitle>
      </StaggerItem>
    </AnimatedStepWrapper>
  );
};

export const PCStep3Content: React.FC<{ duration: number }> = ({ duration }) => {
  return (
    <AnimatedStepWrapper durationInFrames={duration} position="pc-bottom">
      <StaggerItem delayInFrames={4} direction="pop">
        <CardIconBlock>
          <div className="flex gap-10 items-center text-slate-900">
            <TrendingDown size={110} strokeWidth={2.5} />
            <span className="text-6xl font-black">&</span>
            <Clock size={110} strokeWidth={2.5} />
          </div>
        </CardIconBlock>
      </StaggerItem>
      <StaggerItem delayInFrames={8} direction="up">
        <CardTitle>Pertes & Crédit</CardTitle>
      </StaggerItem>
      <StaggerItem delayInFrames={12} direction="up">
        <CardSubtitle>
          Déstockez vos articles endommagés ou enregistrez facilement une vente à crédit.
        </CardSubtitle>
      </StaggerItem>
    </AnimatedStepWrapper>
  );
};

export const PCStep4Content: React.FC<{ duration: number }> = ({ duration }) => {
  return (
    <AnimatedStepWrapper durationInFrames={duration} position="pc-bottom">
      <StaggerItem delayInFrames={4} direction="pop">
        <CardIconBlock>
          <div className="flex flex-col items-center gap-4 text-emerald-700">
            <CheckCircle2 size={120} strokeWidth={3} />
            <span className="text-3xl font-black uppercase tracking-widest">Validé</span>
          </div>
        </CardIconBlock>
      </StaggerItem>
      <StaggerItem delayInFrames={8} direction="up">
        <CardTitle>Validation 1-Clic</CardTitle>
      </StaggerItem>
      <StaggerItem delayInFrames={12} direction="up">
        <CardSubtitle>
          Le reçu est classé automatiquement (Payé, Impayé, Perte) sans attente.
        </CardSubtitle>
      </StaggerItem>
    </AnimatedStepWrapper>
  );
};

// =========================================================================
// MOBILE DEMO STEPS (Frames 630 to 1590)
// =========================================================================

export const MobileStep1Content: React.FC<{ duration: number }> = ({ duration }) => {
  return (
    <AnimatedStepWrapper durationInFrames={duration} position="mobile-top">
      <StaggerItem delayInFrames={4} direction="pop">
        <CardIconBlock>
          <div className="flex gap-8 items-center text-blue-700">
            <Smartphone size={100} strokeWidth={2.5} />
            <ArrowRight size={50} strokeWidth={4} />
            <ShoppingBag size={100} strokeWidth={2.5} />
          </div>
        </CardIconBlock>
      </StaggerItem>
      <StaggerItem delayInFrames={8} direction="up">
        <CardTitle>Caisse Mobile Tactile</CardTitle>
      </StaggerItem>
      <StaggerItem delayInFrames={12} direction="up">
        <CardSubtitle>
          Sélectionnez et encaissez vos articles très rapidement du bout des doigts.
        </CardSubtitle>
      </StaggerItem>
    </AnimatedStepWrapper>
  );
};

export const MobileStep2Content: React.FC<{ duration: number }> = ({ duration }) => {
  return (
    <AnimatedStepWrapper durationInFrames={duration} position="mobile-top">
      <StaggerItem delayInFrames={4} direction="pop">
        <CardIconBlock>
          <div className="flex gap-6 w-full justify-center">
            <div className="bg-emerald-100 text-emerald-900 border-4 border-emerald-900 px-6 py-4 rounded-2xl font-black text-2xl flex items-center gap-3">
              <Check size={32} strokeWidth={4} /> Payé
            </div>
            <div className="bg-amber-100 text-amber-900 border-4 border-amber-900 px-6 py-4 rounded-2xl font-black text-2xl flex items-center gap-3">
              <Clock size={32} strokeWidth={4} /> À Payer
            </div>
          </div>
        </CardIconBlock>
      </StaggerItem>
      <StaggerItem delayInFrames={8} direction="up">
        <CardTitle>3 Modes Intégrés</CardTitle>
      </StaggerItem>
      <StaggerItem delayInFrames={12} direction="up">
        <CardSubtitle>
          Choisissez instantanément : règlement immédiat, dette client ou déstockage.
        </CardSubtitle>
      </StaggerItem>
    </AnimatedStepWrapper>
  );
};

export const MobileStep3Content: React.FC<{ duration: number }> = ({ duration }) => {
  return (
    <AnimatedStepWrapper durationInFrames={duration} position="mobile-top">
      <StaggerItem delayInFrames={4} direction="pop">
        <CardIconBlock>
          <div className="flex gap-10 items-center text-slate-900">
            <FileEdit size={110} strokeWidth={2.5} />
            <div className="w-2 h-16 bg-slate-900 rounded-full rotate-12"></div>
            <Trash2 size={110} strokeWidth={2.5} />
          </div>
        </CardIconBlock>
      </StaggerItem>
      <StaggerItem delayInFrames={8} direction="up">
        <CardTitle>Échanger ou Supprimer</CardTitle>
      </StaggerItem>
      <StaggerItem delayInFrames={12} direction="up">
        <CardSubtitle>
          Retour client ? Modifiez une facture validée avec retour auto en stock.
        </CardSubtitle>
      </StaggerItem>
    </AnimatedStepWrapper>
  );
};

export const MobileStep4Content: React.FC<{ duration: number }> = ({ duration }) => {
  return (
    <AnimatedStepWrapper durationInFrames={duration} position="mobile-top">
      <StaggerItem delayInFrames={4} direction="pop">
        <CardIconBlock>
          <div className="flex flex-col items-center gap-4 text-teal-700">
            <RefreshCw size={120} strokeWidth={2.5} className="animate-spin" style={{ animationDuration: '3s' }} />
            <div className="flex items-center gap-3 bg-white border-4 border-teal-900 px-6 py-2 rounded-2xl shadow-[4px_6px_0px_0px_rgba(13,116,104,1)]">
              <Database size={28} />
              <span className="font-black text-2xl">Cloud Sync</span>
            </div>
          </div>
        </CardIconBlock>
      </StaggerItem>
      <StaggerItem delayInFrames={8} direction="up">
        <CardTitle>Synchro Temps Réel</CardTitle>
      </StaggerItem>
      <StaggerItem delayInFrames={12} direction="up">
        <CardSubtitle>
          Vos ventes et données sont instantanément unifiées entre mobile et PC.
        </CardSubtitle>
      </StaggerItem>
    </AnimatedStepWrapper>
  );
};
