import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ShieldCheck } from "lucide-react";

export const TopBrandBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.6, stiffness: 110 },
  });

  const translateY = interpolate(entrance, [0, 1], [-50, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
      className="absolute top-6 left-0 right-0 z-30 px-8 flex items-center justify-between pointer-events-none select-none"
    >
      {/* Brand Identity Pill */}
      <div className="flex items-center gap-3 bg-white/92 backdrop-blur-2xl px-5 py-2.5 rounded-2xl shadow-xl border border-white/80">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-md">
          A
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-gray-900 font-black text-sm tracking-tight leading-none">
              Adék POS
            </h1>
            <span className="text-[10px] font-extrabold text-blue-700 bg-blue-100/90 px-2 py-0.5 rounded-md uppercase">
              Pro Suite
            </span>
          </div>
          <p className="text-[11px] font-semibold text-gray-500 leading-tight mt-0.5">
            Caisse Tactile & Synchronisation Cloud
          </p>
        </div>
      </div>

      {/* Live Status Pill */}
      <div className="flex items-center gap-2.5 bg-white/92 backdrop-blur-2xl px-4 py-2.5 rounded-2xl shadow-xl border border-white/80">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 text-[11px] font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Démo Active</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
          <ShieldCheck size={14} className="text-blue-600" />
          <span>Multi-appareils</span>
        </div>
      </div>
    </div>
  );
};
