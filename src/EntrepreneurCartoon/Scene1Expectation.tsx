import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BobCharacter } from "./BobCharacter";
import { ComicBubble, ComicSoundFx } from "./ComicBadges";

export const Scene1Expectation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Floating background elements
  const sunPulse = 1 + Math.sin(frame / 12) * 0.05;

  // Header entrance
  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 10, mass: 0.8 },
  });

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-amber-500 via-orange-400 to-amber-200 flex flex-col items-center select-none">
      {/* Motifs géométriques Wax en haut et bas */}
      <div className="absolute top-0 inset-x-0 h-4 bg-[repeating-linear-gradient(90deg,#059669,#059669_25px,#FACC15_25px,#FACC15_50px,#DC2626_50px,#DC2626_75px)] z-40" />

      {/* --- GRAND SOLEIL D'AFRIQUE / COUCHER DE SOLEIL --- */}
      <div
        style={{
          transform: `scale(${sunPulse})`,
          filter: "drop-shadow(0 0 50px rgba(245, 158, 11, 0.8))",
        }}
        className="absolute top-10 right-8 w-40 h-40 rounded-full bg-yellow-300 border-5 border-black flex items-center justify-center pointer-events-none z-10"
      >
        <div className="w-28 h-28 rounded-full bg-amber-400 border-4 border-orange-600 flex items-center justify-center">
          <span className="text-4xl">👑</span>
        </div>
      </div>

      {/* --- BAOBAB MAJESTUEUX EN SILHOUETTE --- */}
      <div className="absolute bottom-40 -left-14 pointer-events-none opacity-90 z-10">
        <svg width="320" height="460" viewBox="0 0 320 460" fill="none">
          {/* Tronc massif de baobab */}
          <path
            d="M40 460 C60 300, 100 240, 150 180 C200 240, 240 300, 260 460 Z"
            fill="#451A03"
            stroke="#1C0A00"
            strokeWidth="8"
          />
          {/* Branches noueuses puissantes */}
          <path d="M150 180 Q100 120 50 80 Q120 70 140 130" stroke="#451A03" strokeWidth="22" strokeLinecap="round" />
          <path d="M150 180 Q170 100 180 50 Q210 90 190 140" stroke="#451A03" strokeWidth="20" strokeLinecap="round" />
          <path d="M150 180 Q240 120 290 90 Q250 140 210 160" stroke="#451A03" strokeWidth="22" strokeLinecap="round" />
          {/* Petites feuilles vertes au sommet */}
          <circle cx="50" cy="75" r="28" fill="#15803D" stroke="#000" strokeWidth="4" />
          <circle cx="180" cy="45" r="32" fill="#16A34A" stroke="#000" strokeWidth="4" />
          <circle cx="290" cy="85" r="28" fill="#15803D" stroke="#000" strokeWidth="4" />
        </svg>
      </div>

      {/* --- BILLETS DE 10 000 FCFA QUI FLOTTENT --- */}
      {[
        { x: 100, y: 350, r: 15 },
        { x: 860, y: 440, r: -18 },
        { x: 130, y: 780, r: 30 },
        { x: 840, y: 880, r: -12 },
      ].map((bill, i) => {
        const floatY = Math.sin((frame + i * 15) / 8) * 15;
        return (
          <div
            key={i}
            style={{
              left: `${bill.x}px`,
              top: `${bill.y + floatY}px`,
              transform: `rotate(${bill.r}deg)`,
            }}
            className="absolute pointer-events-none z-10 flex items-center justify-center px-4 py-2 bg-emerald-600 border-4 border-black rounded-lg shadow-[5px_5px_0px_#000]"
          >
            <span className="font-black text-xl text-yellow-300">10 000 FCFA</span>
          </div>
        );
      })}

      {/* --- EN-TÊTE AFRO-ENTREPRENEUR --- */}
      <div
        style={{
          transform: `scale(${headerSpring})`,
          boxShadow: "10px 10px 0px #000000",
        }}
        className="mt-16 z-20 px-8 py-5 bg-yellow-400 border-6 border-black rounded-3xl text-center max-w-[920px]"
      >
        <span className="text-xl font-black uppercase tracking-wider text-amber-950 block">
          ENTREPRENEURIAT EN AFRIQUE : ÉPISODE 1
        </span>
        <h1 className="text-5xl font-black text-black uppercase tracking-tight mt-1 flex items-center justify-center gap-3">
          <span>🌍</span> LE RÊVE : FUTUR DANGOTE <span>👑</span>
        </h1>
      </div>

      {/* --- BULLES DE DIALOGUE & PUNCHLINES --- */}
      <ComicBubble
        text="Moi quand je lance mon business :"
        subtext="« À moi le gros 4x4 V8 et les chantiers ! »"
        emoji="🚀"
        bgColor="#FFFFFF"
        x={20}
        y={290}
        scale={1.05}
        rotation={-3}
        delay={10}
      />

      <ComicBubble
        text="Investisseur international 🌍"
        subtext="Contrats en milliards de FCFA signés au resto"
        emoji="💼"
        bgColor="#FEF08A"
        textColor="#78350F"
        x={60}
        y={440}
        scale={1.1}
        rotation={4}
        delay={45}
      />

      <ComicBubble
        text="Bazin riche & Swag de PDG ✨"
        subtext="Tout le quartier va m'appeler « Le Boss » !"
        emoji="😎"
        bgColor="#BBF7D0"
        textColor="#065F46"
        x={40}
        y={590}
        scale={1.15}
        rotation={-2}
        delay={95}
      />

      <ComicSoundFx
        text="C'EST DÉJÀ FAIT ! 💰"
        bgColor="#059669"
        color="#FACC15"
        rotation={10}
        x={640}
        y={740}
        scale={1.15}
        delay={130}
      />

      {/* --- PERSONNAGE AFRICAIN (BAZIN BLEU & CHAÎNE EN OR) --- */}
      <div className="absolute bottom-28 z-20">
        <BobCharacter mood="CHILL" scale={1.8} />
      </div>

      {/* --- BANDEAU BAS --- */}
      <div className="absolute bottom-6 w-[90%] py-4 bg-black/90 backdrop-blur-md rounded-2xl border-4 border-yellow-400 flex items-center justify-center gap-3 text-white text-2xl font-black z-30 shadow-[6px_6px_0px_#F59E0B]">
        <span>✨</span> « LA FAMILLE, LE MILLIARD ARRIVE ! » <span>✨</span>
      </div>
    </div>
  );
};
