import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BobCharacter } from "./BobCharacter";
import { ComicSoundFx } from "./ComicBadges";
import { ConfettiShower } from "./Confetti";

export const Scene3Victory: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Notification de dépôt Wave / Mobile Money
  const notifSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 9, mass: 0.6, stiffness: 220 },
  });

  // Final punchline spring
  const punchlineSpring = spring({
    frame: frame - 65,
    fps,
    config: { damping: 8, mass: 0.5, stiffness: 240 },
  });

  // Rayons de gloire dorés tournants en arrière-plan
  const rayRotation = frame * 1.5;

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-amber-500 via-yellow-400 to-emerald-500 flex flex-col items-center select-none">
      {/* Pluie continue de confettis et de pièces d'or */}
      <ConfettiShower count={70} />

      {/* Motifs géométriques Wax en haut et bas */}
      <div className="absolute top-0 inset-x-0 h-4 bg-[repeating-linear-gradient(90deg,#059669,#059669_25px,#FACC15_25px,#FACC15_50px,#DC2626_50px,#DC2626_75px)] z-40" />

      {/* Rayons de soleil radieux en arrière-plan */}
      <div
        style={{
          transform: `rotate(${rayRotation}deg)`,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1600px] h-[1600px] pointer-events-none opacity-25"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {Array.from({ length: 16 }).map((_, i) => (
            <polygon
              key={i}
              points="50,50 45,0 55,0"
              transform={`rotate(${i * 22.5} 50 50)`}
              fill="#78350F"
            />
          ))}
        </svg>
      </div>

      {/* --- NOTIFICATION DU VIREMENT WAVE / MOBILE MONEY (+ 1 500 FCFA) --- */}
      <div
        style={{
          transform: `scale(${notifSpring})`,
          boxShadow: "10px 10px 0px #000000",
        }}
        className="mt-16 z-30 w-[92%] max-w-[900px] bg-white border-6 border-black rounded-3xl p-6 select-none"
      >
        <div className="flex items-center justify-between border-b-2 border-neutral-200 pb-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white font-black flex items-center justify-center text-3xl shadow-sm">
              🌊
            </div>
            <div>
              <div className="font-black text-xl text-black">WAVE / MOBILE MONEY</div>
              <div className="text-xs font-bold text-neutral-500">Dépôt instantané confirmé ⚡</div>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-black text-xs rounded-full border-2 border-emerald-500">
            SUCCÈS
          </span>
        </div>

        <div className="flex items-baseline justify-between mt-2">
          <div>
            <div className="text-sm font-bold text-neutral-600">TRANSFERT ENTRANT REÇU :</div>
            <div className="text-lg font-black text-neutral-900 mt-0.5">
              De : « Client Premier Contrat »
            </div>
          </div>
          <div className="text-4xl font-black text-emerald-600 tracking-tight">
            + 1 500 FCFA
          </div>
        </div>
      </div>

      {/* EFFET SONORE COMIC BING ! C'EST VALIDÉ */}
      <ComicSoundFx
        text="LE GBAFF ! C'EST VALIDÉ ! 🥳"
        bgColor="#059669"
        color="#FEF08A"
        rotation={-6}
        x={0}
        y={280}
        scale={1.2}
        delay={25}
      />

      {/* ÉNORME PUNCHLINE CARTOON CENTRALE */}
      {frame >= 65 && (
        <div
          style={{
            transform: `scale(${punchlineSpring}) rotate(2deg)`,
            boxShadow: "12px 12px 0px #000000",
          }}
          className="absolute top-[390px] z-30 px-8 py-5 bg-black border-6 border-yellow-400 rounded-3xl text-center max-w-[920px] select-none"
        >
          <span className="text-xl font-black text-yellow-300 uppercase tracking-widest block">
            BILAN DU MOIS :
          </span>
          <h2 className="text-4xl font-black text-white uppercase tracking-tight mt-1 leading-tight">
            JE GAGNE 1 500 FCFA PAR MOIS...
          </h2>
          <div className="mt-2 py-2 px-6 bg-yellow-400 rounded-xl text-black font-black text-3xl uppercase">
            👑 MAIS JE SUIS MON PROPRE BOSS ! 🚀
          </div>
        </div>
      )}

      {/* PERSONNAGE AFRICAIN EN PLEINE DANSE COUPÉ-DÉCALÉ ROYALE */}
      <div className="absolute bottom-28 z-20">
        <BobCharacter mood="ECSTATIC" scale={1.85} />
      </div>

      {/* BANDEAU CALL TO ACTION VIRAL TIKTOK / REELS */}
      <div className="absolute bottom-6 w-[92%] py-5 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-2xl border-4 border-black flex flex-col items-center justify-center gap-1 text-white z-30 shadow-[6px_6px_0px_#000000]">
        <div className="text-2xl font-black uppercase tracking-wide flex items-center gap-2">
          <span>👇</span> TAG UN ENTREPRENEUR AFRICAIN QUI SE BAT <span>👇</span>
        </div>
        <div className="text-sm font-bold text-yellow-200">
          Abonne-toi pour la force ! On est ensemble 🤝🌍
        </div>
      </div>
    </div>
  );
};
