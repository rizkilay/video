import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  ShoppingBag,
  CreditCard,
  ReceiptText,
  RefreshCw,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const OutroScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 90 },
  });

  const scale = interpolate(progress, [0, 1], [0.92, 1]);
  const opacity = interpolate(progress, [0, 0.4, 1], [0, 0.8, 1]);
  const translateY = interpolate(progress, [0, 1], [30, 0]);

  // Pulse effect for CTA button
  const pulse = Math.sin(frame / 7) * 0.04 + 1;

  return (
    <div
      style={{
        opacity,
      }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center px-10 bg-slate-900/60 backdrop-blur-3xl select-none"
    >
      {/* Central Glass Showcase Card */}
      <div
        style={{
          transform: `translateY(${translateY}px) scale(${scale})`,
        }}
        className="w-full max-w-[860px] bg-white/95 backdrop-blur-2xl p-10 rounded-[40px] shadow-[0_30px_90px_rgba(0,0,0,0.35)] border border-white/90 flex flex-col items-center text-center"
      >
        {/* Brand Icon & Glow */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-3xl bg-blue-500 blur-xl opacity-40 animate-pulse" />
          <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-2xl flex items-center justify-center text-white font-black text-5xl">
            A
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-black uppercase tracking-wider mb-3">
          <Sparkles size={14} className="text-blue-600" />
          <span>Solution Caisse Tout-en-Un</span>
        </div>

        <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-3">
          Adék POS
        </h1>
        <p className="text-xl font-bold text-gray-600 max-w-xl mb-8 leading-relaxed">
          Gérez votre commerce avec fluidité sur{" "}
          <strong className="text-blue-600 font-extrabold">Ordinateur</strong> &{" "}
          <strong className="text-indigo-600 font-extrabold">Smartphone</strong>.
        </p>

        {/* 4 Core Features Grid */}
        <div className="w-full grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-700 shadow-sm shrink-0">
              <ShoppingBag size={20} />
            </div>
            <div>
              <p className="text-sm font-black text-gray-900">Sélection & Panier</p>
              <p className="text-xs text-gray-500">Ajout tactile & encaissement rapide</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left">
            <div className="p-3 rounded-xl bg-amber-100 text-amber-700 shadow-sm shrink-0">
              <CreditCard size={20} />
            </div>
            <div>
              <p className="text-sm font-black text-gray-900">Crédit & Vente à Perte</p>
              <p className="text-xs text-gray-500">Modes flexibles & ajustement du prix</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left">
            <div className="p-3 rounded-xl bg-purple-100 text-purple-700 shadow-sm shrink-0">
              <ReceiptText size={20} />
            </div>
            <div>
              <p className="text-sm font-black text-gray-900">Gestion des Factures</p>
              <p className="text-xs text-gray-500">Échange d'article & annulation rapide</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left">
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 shadow-sm shrink-0">
              <RefreshCw size={20} />
            </div>
            <div>
              <p className="text-sm font-black text-gray-900">Synchronisation Cloud</p>
              <p className="text-xs text-gray-500">Données unifiées PC & Mobile en 1 clic</p>
            </div>
          </div>
        </div>

        {/* Call To Action */}
        <div
          style={{ transform: `scale(${pulse})` }}
          className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-10 py-5 rounded-2xl shadow-2xl shadow-blue-600/30 text-lg font-black tracking-wide"
        >
          <span>Passez à la vitesse supérieure avec Adék POS</span>
          <ArrowRight size={22} className="stroke-[2.5]" />
        </div>
      </div>
    </div>
  );
};
