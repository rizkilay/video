import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ShoppingBag, CreditCard, RefreshCw, CheckCircle2, ArrowRight } from "lucide-react";

export const OutroScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const scale = interpolate(progress, [0, 1], [0.9, 1]);
  const opacity = interpolate(progress, [0, 0.5, 1], [0, 0.8, 1]);

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
      }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center px-10 bg-gradient-to-b from-white/95 via-blue-50/90 to-indigo-50/95 backdrop-blur-2xl"
    >
      {/* Brand Icon */}
      <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-2xl flex items-center justify-center text-white font-black text-5xl mb-6">
        A
      </div>

      <h1 className="text-4xl font-black text-gray-900 tracking-tight text-center mb-2">
        Adék POS
      </h1>
      <p className="text-lg font-bold text-blue-600 text-center mb-8">
        La caisse intelligente sur PC & Mobile
      </p>

      {/* Recap Features Grid */}
      <div className="w-full max-w-md space-y-3 mb-10">
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white shadow-md border border-gray-100">
          <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
            <ShoppingBag size={18} />
          </div>
          <span className="text-sm font-bold text-gray-800">
            Sélection tactile & encaissement rapide
          </span>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white shadow-md border border-gray-100">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
            <CreditCard size={18} />
          </div>
          <span className="text-sm font-bold text-gray-800">
            Vente au comptant, à crédit & à perte
          </span>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white shadow-md border border-gray-100">
          <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
            <CheckCircle2 size={18} />
          </div>
          <span className="text-sm font-bold text-gray-800">
            Factures modifiables (Échange & Annulation)
          </span>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white shadow-md border border-gray-100">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
            <RefreshCw size={18} />
          </div>
          <span className="text-sm font-bold text-gray-800">
            Synchronisation Cloud en 1 clic
          </span>
        </div>
      </div>

      {/* Call to action pill */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl shadow-xl shadow-blue-500/30 text-base font-extrabold">
        <span>Prêt à simplifier vos ventes ?</span>
        <ArrowRight size={20} />
      </div>
    </div>
  );
};
