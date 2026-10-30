import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BobCharacter } from "./BobCharacter";
import { ComicSoundFx } from "./ComicBadges";

export const Scene2Reality: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Screen pulse & alarm glow
  const alarmGlow = Math.sin(frame / 6) * 0.4 + 0.6;
  const clockBlink = frame % 30 < 15;

  // Header entrance
  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 9, mass: 0.7 },
  });

  // Moustique cartoon qui vole en cercle
  const mosquitoX = Math.sin(frame / 5) * 80 + 340;
  const mosquitoY = Math.cos(frame / 4) * 50 + 640;

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-stone-950 via-zinc-900 to-amber-950 flex flex-col items-center select-none">
      {/* Alarme rouge de délestage */}
      <div
        style={{ opacity: alarmGlow * 0.2 }}
        className="absolute inset-0 bg-amber-600 pointer-events-none transition-opacity duration-150"
      />

      {/* Horloge digitale 03:47 AM + DÉLESTAGE en haut au centre */}
      <div className="mt-14 z-20 px-8 py-3 bg-black border-4 border-amber-500 rounded-2xl shadow-[6px_6px_0px_#D97706] flex items-center gap-3">
        <div className={`w-4 h-4 rounded-full bg-amber-500 ${clockBlink ? "opacity-100" : "opacity-20"}`} />
        <span className="font-mono text-3xl font-black text-amber-500 tracking-wider">
          03:47 AM • DÉLESTAGE ⚡
        </span>
      </div>

      {/* En-tête de scène */}
      <div
        style={{
          transform: `scale(${headerSpring})`,
          boxShadow: "10px 10px 0px #000000",
        }}
        className="mt-5 z-20 px-8 py-5 bg-red-600 border-6 border-black rounded-3xl text-center max-w-[920px]"
      >
        <span className="text-xl font-black uppercase tracking-wider text-red-200 block">
          LA RÉALITÉ DU TERRAIN EN AFRIQUE
        </span>
        <h1 className="text-5xl font-black text-white uppercase tracking-tight mt-1 flex items-center justify-center gap-3">
          <span>💀</span> LE CHAOS & LA SUEUR <span>🕯️</span>
        </h1>
      </div>

      {/* --- NOTIFICATIONS VIRALES AFRICAINES --- */}

      {/* 1. WHATSAPP DU CLIENT : LE PAIEMENT EN "ON EST ENSEMBLE" (Frame 15) */}
      <div
        style={{
          transform: `scale(${spring({ frame: frame - 15, fps, config: { damping: 8, stiffness: 220 } })}) rotate(-2deg)`,
          boxShadow: "8px 8px 0px #000000",
        }}
        className="absolute top-72 left-8 z-30 max-w-[520px] bg-white border-5 border-black rounded-3xl p-5 select-none"
      >
        <div className="flex items-center gap-3 border-b-2 border-neutral-200 pb-2 mb-2">
          <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-black flex items-center justify-center text-xl">
            💬
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg text-black">Le Tonton / Client Pressé</span>
            <span className="text-xs text-neutral-500">À l'instant</span>
          </div>
        </div>
        <p className="text-base font-bold text-neutral-800 leading-snug">
          « Mon petit ! Fais-moi le boulot pour 7h gratuit d'abord. Tu sais bien qu'<span className="text-red-600 underline font-black">ON EST ENSEMBLE</span> ! Dès que ça marche, je te donne des millions ! 🤝😂 »
        </p>
      </div>

      {/* 2. SMS OPÉRATEUR : FORFAIT INTERNET ÉPUISÉ (Frame 60) */}
      <div
        style={{
          transform: `scale(${spring({ frame: frame - 60, fps, config: { damping: 8, stiffness: 220 } })}) rotate(3deg)`,
          boxShadow: "8px 8px 0px #000000",
        }}
        className="absolute top-[480px] right-8 z-30 max-w-[480px] bg-amber-300 border-5 border-black rounded-3xl p-5 select-none"
      >
        <div className="flex items-center gap-3 border-b-2 border-black/20 pb-2 mb-2">
          <span className="text-3xl">📶</span>
          <div className="flex flex-col">
            <span className="font-black text-lg text-black uppercase">INFO FORFAIT INTERNET</span>
            <span className="text-xs font-bold text-amber-900">Connexion suspendue</span>
          </div>
        </div>
        <div className="text-xl font-black text-red-600 mb-1">
          SOLDE DATA : 0 Mo restant !
        </div>
        <p className="text-xs font-bold text-neutral-800">
          *Batterie PC : 4% • Délestage en cours jusqu'à 6h du matin.
        </p>
      </div>

      {/* 3. MOUSTIQUE CARTOON QUI HARCÈLE BOB (Frame 100) */}
      <div
        style={{
          left: `${mosquitoX}px`,
          top: `${mosquitoY}px`,
        }}
        className="absolute z-40 pointer-events-none flex items-center gap-1 bg-black/80 px-3 py-1 rounded-full border-2 border-red-400"
      >
        <span className="text-2xl">🦟</span>
        <span className="text-xs font-black text-red-400">BZZZZZZ !</span>
      </div>

      {/* EFFET SONORE COMIC WAW ! / PANIQUE */}
      <ComicSoundFx
        text="AÏE PARDON ! 😭"
        bgColor="#EF4444"
        color="#FDE047"
        rotation={-14}
        x={600}
        y={800}
        scale={1.25}
        delay={135}
      />

      {/* BOUGIE SUR LA TABLE POUR LE DÉLESTAGE */}
      <div className="absolute bottom-28 left-16 z-20 pointer-events-none">
        <div className="bg-black/80 px-4 py-3 rounded-2xl border-3 border-yellow-400 text-center">
          <div className="text-4xl animate-pulse">🕯️</div>
          <div className="text-xs font-black text-yellow-300 mt-1">
            0% ÉLECTRICITÉ
          </div>
          <div className="text-[10px] font-bold text-neutral-300">
            100% COURAGE
          </div>
        </div>
      </div>

      {/* PERSONNAGE AFRICAIN EN MARCEL & SUEUR */}
      <div className="absolute bottom-24 z-20">
        <BobCharacter mood="PANIC" scale={1.85} />
      </div>

      {/* BANDEAU BAS DÉTRESSE */}
      <div className="absolute bottom-6 w-[90%] py-4 bg-black/90 backdrop-blur-md rounded-2xl border-4 border-amber-500 flex items-center justify-center gap-3 text-white text-2xl font-black z-30 shadow-[6px_6px_0px_#D97706]">
        <span>😭</span> « JE NE DORS PLUS, LE COURANT EST COUPÉ » <span>⚡</span>
      </div>
    </div>
  );
};
