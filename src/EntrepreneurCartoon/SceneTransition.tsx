import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ComicSoundFx } from "./ComicBadges";

export const SceneTransition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Violent screen shake
  const shakeX = Math.sin(frame * 3.5) * 22;
  const shakeY = Math.cos(frame * 4) * 18;
  const flash = frame % 4 < 2;

  const textSpring = spring({
    frame,
    fps,
    config: { damping: 7, mass: 0.5, stiffness: 300 },
  });

  return (
    <div
      style={{
        transform: `translate(${shakeX}px, ${shakeY}px)`,
        backgroundColor: flash ? "#DC2626" : "#1C1917",
      }}
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden z-50 select-none"
    >
      {/* Glitch scanlines */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,rgba(0,0,0,0.5)_4px,rgba(0,0,0,0.5)_8px)] pointer-events-none" />

      {/* Disque vinyle brisé cartoon */}
      <div className="relative mb-12">
        <div className="w-64 h-64 rounded-full bg-black border-8 border-yellow-400 flex items-center justify-center shadow-[10px_10px_0px_#FFFFFF] relative">
          <div className="w-52 h-52 rounded-full border-4 border-neutral-700 flex items-center justify-center">
            <div className="w-36 h-36 rounded-full border-2 border-neutral-600 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-amber-500 border-4 border-black flex items-center justify-center text-3xl font-black">
                ⚡
              </div>
            </div>
          </div>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 256 256">
            <path d="M128 0 L140 70 L110 110 L150 160 L120 256" stroke="#FFFFFF" strokeWidth="8" fill="none" />
          </svg>
        </div>
      </div>

      <ComicSoundFx
        text="AÏE AÏE AÏE ! 💥"
        bgColor="#EF4444"
        color="#FACC15"
        rotation={-6}
        x={0}
        y={-70}
        scale={1.3}
        delay={2}
      />

      {/* Banner 3 mois plus tard */}
      <div
        style={{
          transform: `scale(${textSpring})`,
          boxShadow: "12px 12px 0px #000000",
        }}
        className="px-12 py-6 bg-white border-8 border-black rounded-3xl text-center transform -rotate-3"
      >
        <span className="text-2xl font-black text-red-600 uppercase tracking-widest block">
          PARDON FAUT VOIR LA RÉALITÉ...
        </span>
        <h2 className="text-6xl font-black text-black uppercase tracking-tight mt-1">
          3 MOIS PLUS TARD... 💀
        </h2>
      </div>
    </div>
  );
};
