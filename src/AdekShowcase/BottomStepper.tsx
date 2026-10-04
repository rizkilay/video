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
  Monitor,
  Smartphone,
} from "lucide-react";

export interface BottomStepperProps {
  currentStep: number; // 0, 1, 2, 3
  platform: "pc" | "mobile";
}

export const steps = [
  { id: 0, label: "Sélection", icon: ShoppingBag, desc: "Articles & Panier" },
  { id: 1, label: "Crédit & Perte", icon: CreditCard, desc: "Prix & Modes" },
  { id: 2, label: "Factures", icon: ReceiptText, desc: "Reçus & Actions" },
  { id: 3, label: "Sync Cloud", icon: RefreshCw, desc: "Centralisation" },
];

export const BottomStepper: React.FC<BottomStepperProps> = ({
  currentStep,
  platform,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring animation from bottom
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 100 },
  });

  const translateY = interpolate(entrance, [0, 1], [60, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
      className="absolute bottom-8 left-[60px] z-40 w-[960px] pointer-events-none select-none"
    >
      <div className="bg-white/92 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.22)] border border-white/80 p-3.5 flex flex-col gap-2.5">
        {/* Top Mini Bar with Platform Indicator & Progress Text */}
        <div className="flex items-center justify-between px-3">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase transition-colors duration-300 ${
                platform === "pc"
                  ? "bg-blue-100 text-blue-800 border border-blue-200"
                  : "bg-indigo-100 text-indigo-800 border border-indigo-200"
              }`}
            >
              {platform === "pc" ? (
                <>
                  <Monitor size={14} className="stroke-[2.5]" />
                  <span>Version Ordinateur • Caisse</span>
                </>
              ) : (
                <>
                  <Smartphone size={14} className="stroke-[2.5]" />
                  <span>Version Mobile • Smartphone</span>
                </>
              )}
            </span>

            <span className="text-[12px] font-bold text-gray-500">
              Étape {currentStep + 1} sur {steps.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 bg-gray-100/80 px-2.5 py-1 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Flux de vente en direct</span>
          </div>
        </div>

        {/* 4 Interactive-Style Step Pills */}
        <div className="flex items-center justify-between gap-2 bg-slate-50/80 p-2 rounded-2xl border border-slate-200/60">
          {steps.map((step, idx) => {
            const isActive = currentStep === idx;
            const isDone = currentStep > idx;
            const Icon = step.icon;

            return (
              <React.Fragment key={step.id}>
                <div
                  className={`flex-1 flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-lg shadow-blue-600/30 scale-[1.02]"
                      : isDone
                      ? "bg-blue-50/90 text-blue-900 border border-blue-200/60 font-semibold"
                      : "text-gray-500 font-medium"
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
                      className={`text-xs font-black truncate leading-tight ${
                        isActive ? "text-white" : isDone ? "text-blue-950" : "text-gray-700"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p
                      className={`text-[10px] truncate leading-tight ${
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

                {/* Divider Line Between Steps */}
                {idx < steps.length - 1 && (
                  <div
                    className={`h-6 w-[2px] rounded-full shrink-0 transition-colors duration-300 ${
                      isDone ? "bg-blue-400" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
