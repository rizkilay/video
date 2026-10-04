import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Check, ShoppingBag, CreditCard, ReceiptText, RefreshCw } from "lucide-react";

interface HeaderProgressProps {
  currentStep: number; // 0, 1, 2, 3, 4
}

const steps = [
  { id: 0, label: "Sélection", icon: ShoppingBag },
  { id: 1, label: "Crédit & Perte", icon: CreditCard },
  { id: 2, label: "Factures", icon: ReceiptText },
  { id: 3, label: "Sync Cloud", icon: RefreshCw },
];

export const HeaderProgress: React.FC<HeaderProgressProps> = ({ currentStep }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6 },
  });

  const translateY = interpolate(entrance, [0, 1], [-80, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
      className="absolute top-8 left-0 right-0 z-30 px-6 flex flex-col gap-3 pointer-events-none"
    >
      {/* Brand Bar */}
      <div className="flex items-center justify-between bg-white/95 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-xl border border-white/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-md">
            A
          </div>
          <div>
            <h1 className="text-gray-900 font-extrabold text-base leading-tight tracking-tight">
              Adék POS • Mobile
            </h1>
            <p className="text-[11px] font-semibold text-blue-600">
              Caisse & Gestion des Ventes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>En direct</span>
        </div>
      </div>

      {/* Stepper tracker */}
      <div className="flex items-center justify-between bg-white/90 backdrop-blur-xl px-4 py-2.5 rounded-2xl shadow-lg border border-white/70">
        {steps.map((step, idx) => {
          const isActive = currentStep === idx;
          const isDone = currentStep > idx;
          const Icon = step.icon;

          return (
            <React.Fragment key={step.id}>
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30 scale-105"
                    : isDone
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-400 font-normal"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    isActive
                      ? "bg-white/20 text-white font-bold"
                      : isDone
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {isDone ? <Check size={12} className="stroke-[3]" /> : <Icon size={12} />}
                </div>
                <span className="text-[11px] font-bold whitespace-nowrap">
                  {step.label}
                </span>
              </div>

              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-1 rounded-full ${
                    isDone ? "bg-blue-400" : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
