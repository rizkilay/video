import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  Check,
  ShoppingBag,
  CreditCard,
  ReceiptText,
  RefreshCw,
} from "lucide-react";

export interface BottomStepperProps {
  currentStep: number; // 0, 1, 2, 3
  currentStepStartFrame: number;
}

export const steps = [
  { id: 0, label: "Sélectionner", icon: ShoppingBag, desc: "Articles & Panier" },
  { id: 1, label: "Éditer", icon: CreditCard, desc: "Prix & Quantités" },
  { id: 2, label: "Imprimer", icon: ReceiptText, desc: "Reçus & Factures" },
];

export const BottomStepper: React.FC<BottomStepperProps> = ({
  currentStep,
  currentStepStartFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring animation from bottom
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 100 },
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const bottomPosition = interpolate(
    frame,
    [360, 390],
    [200, 32],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const clampedStep = Math.min(currentStep, steps.length - 1);

  const stepSlide = spring({
    frame: Math.max(0, frame - currentStepStartFrame),
    fps,
    config: { damping: 20, mass: 0.7, stiffness: 120 },
  });
  const slidePosition = interpolate(
    stepSlide,
    [0, 1],
    [Math.max(0, clampedStep - 1), clampedStep],
  );

  return (
    <div
      style={{
        bottom: bottomPosition,
        opacity,
      }}
      className="absolute left-[60px] z-40 w-[960px] pointer-events-none select-none"
    >
      <div className="bg-white/92 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.22)] border border-white/80 p-3.5 flex flex-col gap-2.5">
        {/* Top Mini Bar with Progress Text */}
        <div className="flex items-center justify-between px-3">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-gray-500">
              Étape {clampedStep + 1} sur {steps.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 bg-gray-100/80 px-2.5 py-1 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Flux de vente en direct</span>
          </div>
        </div>

        {/* 4 Interactive-Style Step Pills */}
        <div className="bg-slate-50/80 p-2 rounded-2xl border border-slate-200/60">
          <div className="relative grid grid-cols-3 gap-2">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 z-0 rounded-xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 shadow-xl shadow-blue-700/40 ring-2 ring-blue-300"
              style={{
                width: "calc((100% - 16px) / 3)",
                transform: `translateX(calc(${slidePosition * 100}% + ${slidePosition * 8}px))`,
              }}
            />
          {steps.map((step, idx) => {
            const isActive = clampedStep === idx;
            const isDone = clampedStep > idx;
            const Icon = step.icon;

            return (
                <div
                  key={step.id}
                  className={`relative z-10 flex min-w-0 items-center gap-3 px-3.5 py-2.5 rounded-xl ${
                    isActive
                      ? "text-white"
                      : isDone
                      ? "bg-blue-100 text-blue-950 border border-blue-300 font-bold"
                      : "text-gray-600 font-semibold"
                  }`}
                >
                  {/* Step Icon Badge */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isActive
                        ? "bg-white/20 text-white shadow-inner"
                        : isDone
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isDone ? (
                      <Check size={16} className="stroke-[3]" />
                    ) : (
                      <Icon size={16} className={isActive ? "stroke-[2.5]" : "stroke-2"} />
                    )}
                  </div>

                  {/* Step Text */}
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xl font-black truncate leading-tight ${
                        isActive ? "text-white" : isDone ? "text-blue-950" : "text-gray-700"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p
                      className={`text-lg truncate leading-tight ${
                        isActive
                          ? "text-blue-100 font-medium"
                          : isDone
                          ? "text-blue-600 font-medium"
                          : "text-gray-400"
                      }`}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
};
