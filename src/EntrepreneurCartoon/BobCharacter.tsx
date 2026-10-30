import React from "react";
import { useCurrentFrame } from "remotion";

export type CharacterMood = "CHILL" | "PANIC" | "ECSTATIC";

interface BobCharacterProps {
  mood: CharacterMood;
  scale?: number;
}

export const BobCharacter: React.FC<BobCharacterProps> = ({ mood, scale = 1 }) => {
  const frame = useCurrentFrame();

  // Floating / idle animations
  const chillBob = Math.sin(frame / 6) * 12;
  const panicShake = mood === "PANIC" ? Math.sin(frame * 1.5) * 8 : 0;
  const panicYShake = mood === "PANIC" ? Math.cos(frame * 2) * 5 : 0;

  // Afro dance animation (Coupé-décalé / Amapiano hip sway)
  const danceAngle = mood === "ECSTATIC" ? Math.sin(frame / 2) * 16 : 0;
  const danceHop = mood === "ECSTATIC" ? Math.abs(Math.sin(frame / 2)) * -28 : 0;
  const shoulderSway = mood === "ECSTATIC" ? Math.cos(frame / 2) * 10 : 0;

  // Sweat drop animation for panic
  const sweatOffset = (frame * 6) % 90;

  return (
    <div
      style={{
        transform: `translate(${panicShake + shoulderSway}px, ${chillBob + panicYShake + danceHop}px) rotate(${danceAngle}deg) scale(${scale})`,
        transformOrigin: "bottom center",
        transition: "transform 0.05s ease-out",
        position: "relative",
        width: 380,
        height: 520,
      }}
    >
      <svg
        viewBox="0 0 380 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          {/* Peau noire / ébène chaleureuse et lumineuse */}
          <radialGradient id="afroSkin" cx="45%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="60%" stopColor="#451A03" />
            <stop offset="100%" stopColor="#291102" />
          </radialGradient>
          <radialGradient id="afroSkinHighlight" cx="40%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#9A3412" />
            <stop offset="100%" stopColor="#451A03" />
          </radialGradient>

          {/* Dégradé Bazin Riche brodé d'or (Scène 1 & 3) */}
          <linearGradient id="bazinGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="50%" stopColor="#0369A1" />
            <stop offset="100%" stopColor="#075985" />
          </linearGradient>

          <linearGradient id="bazinRoyalGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="50%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* Motif Wax / Kente géométrique */}
          <pattern id="waxPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#EA580C" />
            <polygon points="0,0 20,20 0,40" fill="#FACC15" />
            <polygon points="40,0 20,20 40,40" fill="#15803D" />
            <circle cx="20" cy="20" r="6" fill="#000000" />
            <line x1="0" y1="20" x2="40" y2="20" stroke="#000" strokeWidth="2" />
          </pattern>

          {/* Lunettes de soleil dorées swag */}
          <linearGradient id="goldGlasses" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#18181B" />
            <stop offset="60%" stopColor="#27272A" />
            <stop offset="100%" stopColor="#09090B" />
          </linearGradient>

          <filter id="comicShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="4" dy="8" stdDeviation="4" floodColor="#000000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* --- OMBRE AU SOL --- */}
        <ellipse cx="190" cy="510" rx={mood === "ECSTATIC" ? 115 : 95} ry="18" fill="rgba(0,0,0,0.3)" />

        {/* --- CORPS & VÊTEMENTS AFRICAINS --- */}
        {mood === "CHILL" ? (
          // BAZIN RICHE BLEU ROI AVEC BRODERIES D'OR ET MOTIFS WAX
          <g filter="url(#comicShadow)">
            {/* Tunique Bazin */}
            <path
              d="M90 420 C90 350, 135 330, 190 330 C245 330, 290 350, 290 420 L300 510 L80 510 Z"
              fill="url(#bazinGold)"
              stroke="#000"
              strokeWidth="6"
            />
            {/* Plastron brodé d'or traditionnel */}
            <path
              d="M150 330 L190 430 L230 330 Z"
              fill="#FBBF24"
              stroke="#000"
              strokeWidth="5"
            />
            {/* Motifs broderie dorée */}
            <path d="M170 345 L190 400 L210 345" stroke="#78350F" strokeWidth="4" fill="none" />
            <circle cx="190" cy="360" r="7" fill="#EF4444" stroke="#000" strokeWidth="2.5" />
            <circle cx="190" cy="390" r="6" fill="#10B981" stroke="#000" strokeWidth="2.5" />

            {/* Écharpe Kente / Wax sur l'épaule droite */}
            <path
              d="M230 330 Q255 410 265 510 L285 510 Q280 400 250 330 Z"
              fill="url(#waxPattern)"
              stroke="#000"
              strokeWidth="4"
            />

            {/* Chaîne en or massif boss africain */}
            <path d="M145 340 Q190 400 235 340" stroke="#F59E0B" strokeWidth="10" strokeLinecap="round" />
            {/* Pendentif carte de l'Afrique en or pur */}
            <g transform="translate(180, 395) scale(0.65)">
              <path
                d="M10 0 C25 0, 30 15, 25 30 C20 45, 10 50, 5 35 C0 20, -5 0, 10 0 Z"
                fill="#FDE047"
                stroke="#000"
                strokeWidth="5"
              />
            </g>
          </g>
        ) : mood === "PANIC" ? (
          // DÉLESTAGE / CHAOS : MARCEL BLANC EN SUEUR OU T-SHIRT FATIGUÉ
          <g filter="url(#comicShadow)">
            <path
              d="M105 420 C105 365, 145 350, 190 350 C235 350, 275 365, 275 420 L280 510 L100 510 Z"
              fill="#E2E8F0"
              stroke="#000"
              strokeWidth="6"
            />
            {/* Taches de transpiration sous les bras et le torse */}
            <ellipse cx="120" cy="420" rx="16" ry="24" fill="#94A3B8" opacity="0.4" />
            <ellipse cx="260" cy="420" rx="16" ry="24" fill="#94A3B8" opacity="0.4" />
            <ellipse cx="190" cy="430" rx="30" ry="18" fill="#94A3B8" opacity="0.3" />

            {/* Col marcel étiré */}
            <path d="M150 350 Q190 400 230 350" stroke="#000" strokeWidth="5" fill="none" />
            {/* Épaules nues apparentes */}
            <path d="M95 365 Q115 350 150 350" stroke="#000" strokeWidth="5" fill="none" />
            <path d="M285 365 Q265 350 230 350" stroke="#000" strokeWidth="5" fill="none" />
          </g>
        ) : (
          // SCÈNE 3 : LE GRAND BAZIN DORÉ & WAX ROYAL DU PATRON AFRICAIN
          <g filter="url(#comicShadow)">
            <path
              d="M85 415 C85 345, 135 325, 190 325 C245 325, 295 345, 295 415 L305 510 L75 510 Z"
              fill="url(#bazinRoyalGold)"
              stroke="#000"
              strokeWidth="6"
            />
            {/* Grande broderie royale blanche & or au milieu */}
            <path
              d="M140 325 L190 450 L240 325 Z"
              fill="#FEF08A"
              stroke="#000"
              strokeWidth="5"
            />
            {/* Motifs kente royaux */}
            <path d="M165 340 L190 415 L215 340" stroke="#B45309" strokeWidth="5" fill="none" />
            <circle cx="190" cy="355" r="9" fill="#15803D" stroke="#000" strokeWidth="3" />
            <circle cx="190" cy="385" r="9" fill="#DC2626" stroke="#000" strokeWidth="3" />

            {/* Broderies manches Wax */}
            <path
              d="M75 420 L115 420 L115 510 L75 510 Z"
              fill="url(#waxPattern)"
              stroke="#000"
              strokeWidth="4"
            />
            <path
              d="M265 420 L305 420 L305 510 L265 510 Z"
              fill="url(#waxPattern)"
              stroke="#000"
              strokeWidth="4"
            />
          </g>
        )}

        {/* --- COU & TÊTE AFRICAINE --- */}
        <path d="M165 295 L165 355 L215 355 L215 295 Z" fill="url(#afroSkin)" stroke="#000" strokeWidth="6" />

        {/* Visage / Mâchoire expressive */}
        <ellipse
          cx="190"
          cy="210"
          rx="105"
          ry="115"
          fill="url(#afroSkin)"
          stroke="#000"
          strokeWidth="7"
          filter="url(#comicShadow)"
        />

        {/* Oreilles */}
        <circle cx="85" cy="215" r="22" fill="#5A2307" stroke="#000" strokeWidth="6" />
        <path d="M85 208 Q92 215 85 222" stroke="#291102" strokeWidth="4" fill="none" />
        <circle cx="295" cy="215" r="22" fill="#5A2307" stroke="#000" strokeWidth="6" />
        <path d="M295 208 Q288 215 295 222" stroke="#291102" strokeWidth="4" fill="none" />

        {/* --- CHAPEAU TRADITIONNEL / CHÉCHIA / COUPE CHEVEUX --- */}
        {mood === "CHILL" ? (
          // Chéchia / Bonnet brodé d'or traditionnel et chic
          <g filter="url(#comicShadow)">
            <ellipse cx="190" cy="115" rx="88" ry="32" fill="#1E3A8A" stroke="#000" strokeWidth="6" />
            <path
              d="M102 115 C102 65, 140 50, 190 50 C240 50, 278 65, 278 115 Z"
              fill="#1E3A8A"
              stroke="#000"
              strokeWidth="6"
            />
            {/* Frise broderie or sur le bonnet */}
            <path d="M105 110 Q190 135 275 110" stroke="#FBBF24" strokeWidth="7" fill="none" />
            <circle cx="190" cy="85" r="7" fill="#FBBF24" stroke="#000" strokeWidth="3" />
            <path d="M150 90 L160 80 L170 90" stroke="#FBBF24" strokeWidth="3" fill="none" />
            <path d="M210 90 L220 80 L230 90" stroke="#FBBF24" strokeWidth="3" fill="none" />
          </g>
        ) : mood === "PANIC" ? (
          // Cheveux crépus en bataille avec brins qui se dressent sous le stress
          <g stroke="#000" strokeWidth="6" fill="#18181B">
            <path d="M85 180 C70 120, 100 80, 130 85 C145 60, 180 50, 205 60 C230 45, 270 70, 285 100 C310 130, 305 170, 295 185 Z" />
            {/* Petites mèches afro stressées */}
            <circle cx="120" cy="85" r="14" fill="#18181B" stroke="#000" strokeWidth="4" />
            <circle cx="160" cy="65" r="16" fill="#18181B" stroke="#000" strokeWidth="4" />
            <circle cx="210" cy="60" r="16" fill="#18181B" stroke="#000" strokeWidth="4" />
            <circle cx="260" cy="80" r="15" fill="#18181B" stroke="#000" strokeWidth="4" />
            {/* Lignes de stress au front */}
            <path d="M150 145 Q190 155 230 145" stroke="#291102" strokeWidth="4" fill="none" />
            <path d="M160 135 Q190 145 220 135" stroke="#291102" strokeWidth="3.5" fill="none" />
          </g>
        ) : (
          // Chéchia royale or et rouge de grand dignitaire / boss africain
          <g filter="url(#comicShadow)">
            <ellipse cx="190" cy="115" rx="88" ry="32" fill="#B91C1C" stroke="#000" strokeWidth="6" />
            <path
              d="M102 115 C102 60, 140 45, 190 45 C240 45, 278 60, 278 115 Z"
              fill="#B91C1C"
              stroke="#000"
              strokeWidth="6"
            />
            {/* Plumes et broderie royale d'or */}
            <path d="M105 110 Q190 135 275 110" stroke="#FACC15" strokeWidth="8" fill="none" />
            <circle cx="190" cy="78" r="9" fill="#FACC15" stroke="#000" strokeWidth="3" />
            <path d="M190 45 L190 20" stroke="#FACC15" strokeWidth="6" strokeLinecap="round" />
            <circle cx="190" cy="16" r="6" fill="#F59E0B" />
          </g>
        )}

        {/* --- YEUX & SOURCILS --- */}
        {mood === "CHILL" ? (
          // Grandes lunettes de soleil swag avec monture dorée brillante
          <g filter="url(#comicShadow)">
            {/* Monture or */}
            <ellipse cx="145" cy="200" rx="38" ry="30" fill="url(#goldGlasses)" stroke="#F59E0B" strokeWidth="8" />
            <ellipse cx="235" cy="200" rx="38" ry="30" fill="url(#goldGlasses)" stroke="#F59E0B" strokeWidth="8" />
            {/* Pont des lunettes en or */}
            <path d="M180 195 L200 195" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" />
            {/* Reflet blanc éclatant */}
            <path d="M125 185 L140 215" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
            <path d="M215 185 L230 215" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
            {/* Sourcils confiants */}
            <path d="M115 158 Q145 145 170 158" stroke="#18181B" strokeWidth="7" strokeLinecap="round" />
            <path d="M210 158 Q235 145 265 158" stroke="#18181B" strokeWidth="7" strokeLinecap="round" />
          </g>
        ) : mood === "PANIC" ? (
          // Yeux exorbités de panique délestage & fatigue
          <g>
            {/* Cernes violacées */}
            <ellipse cx="140" cy="210" rx="42" ry="32" fill="#3B0764" opacity="0.45" />
            <ellipse cx="240" cy="210" rx="42" ry="32" fill="#3B0764" opacity="0.45" />

            {/* Blanc des yeux géant */}
            <circle cx="140" cy="205" r="32" fill="#FFFFFF" stroke="#000" strokeWidth="6" />
            <circle cx="240" cy="205" r="32" fill="#FFFFFF" stroke="#000" strokeWidth="6" />

            {/* Veines rouges d'insomnie */}
            <path d="M115 200 Q125 205 130 200" stroke="#EF4444" strokeWidth="3" fill="none" />
            <path d="M120 215 Q128 212 135 220" stroke="#EF4444" strokeWidth="2.5" fill="none" />
            <path d="M255 198 Q248 206 242 200" stroke="#EF4444" strokeWidth="3" fill="none" />
            <path d="M260 215 Q252 210 245 218" stroke="#EF4444" strokeWidth="2.5" fill="none" />

            {/* Minuscules pupilles terrorisées */}
            <circle cx={140 + Math.sin(frame * 2) * 3} cy={205 + Math.cos(frame * 2) * 3} r="7" fill="#000" />
            <circle cx={240 + Math.sin(frame * 2) * 3} cy={205 + Math.cos(frame * 2) * 3} r="7" fill="#000" />

            {/* Sourcils en détresse totale */}
            <path d="M115 160 L160 145" stroke="#18181B" strokeWidth="7" strokeLinecap="round" />
            <path d="M265 160 L220 145" stroke="#18181B" strokeWidth="7" strokeLinecap="round" />

            {/* Grosses gouttes de sueur tropicale */}
            <g transform={`translate(285, ${150 + sweatOffset})`}>
              <path
                d="M10 0 C10 0 0 15 0 25 C0 35 15 35 15 25 C15 15 10 0 10 0 Z"
                fill="#38BDF8"
                stroke="#0284C7"
                strokeWidth="2.5"
              />
            </g>
            <g transform={`translate(80, ${170 + ((sweatOffset + 45) % 90)})`}>
              <path
                d="M10 0 C10 0 0 15 0 25 C0 35 15 35 15 25 C15 15 10 0 10 0 Z"
                fill="#38BDF8"
                stroke="#0284C7"
                strokeWidth="2.5"
              />
            </g>
          </g>
        ) : (
          // Yeux ÉTOILES brillantes d'extase Mobile Money !
          <g>
            {/* Oeil gauche : Étoile dorée scintillante */}
            <g transform="translate(140, 205) scale(1.35)">
              <polygon
                points="0,-22 6,-6 22,0 6,6 0,22 -6,6 -22,0 -6,-6"
                fill="#FBBF24"
                stroke="#000"
                strokeWidth="3.5"
              />
              <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
            </g>
            {/* Oeil droit : Étoile dorée scintillante */}
            <g transform="translate(240, 205) scale(1.35)">
              <polygon
                points="0,-22 6,-6 22,0 6,6 0,22 -6,6 -22,0 -6,-6"
                fill="#FBBF24"
                stroke="#000"
                strokeWidth="3.5"
              />
              <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
            </g>
            {/* Larmes de joie torrentielles */}
            <path d="M110 215 Q95 240 105 285" stroke="#60A5FA" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M270 215 Q285 240 275 285" stroke="#60A5FA" strokeWidth="8" strokeLinecap="round" fill="none" />
            {/* Sourcils hyper joyeux */}
            <path d="M115 145 Q140 130 165 145" stroke="#18181B" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M215 145 Q240 130 265 145" stroke="#18181B" strokeWidth="7" strokeLinecap="round" fill="none" />
          </g>
        )}

        {/* --- NEZ AFRICAIN EXPRESSIF --- */}
        <path d="M175 220 Q190 230 205 220" stroke="#291102" strokeWidth="5" strokeLinecap="round" fill="none" />
        <ellipse cx="178" cy="222" rx="4" ry="2" fill="#291102" />
        <ellipse cx="202" cy="222" rx="4" ry="2" fill="#291102" />

        {/* --- BOUCHE EXPRESSIVE --- */}
        {mood === "CHILL" ? (
          // Grand sourire confiant et éclatant
          <g>
            <path d="M155 260 Q190 285 225 260" stroke="#000" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Dents blanches éclatantes */}
            <path d="M165 262 Q190 275 215 262" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
          </g>
        ) : mood === "PANIC" ? (
          // Bouche en panique totale
          <g>
            <path
              d="M145 265 Q160 255 175 268 Q190 258 205 270 Q220 258 235 268 Q210 295 170 295 Z"
              fill="#7F1D1D"
              stroke="#000"
              strokeWidth="5"
            />
            <rect x="160" y="260" width="16" height="10" fill="#FFFFFF" stroke="#000" strokeWidth="2.5" />
            <rect x="180" y="262" width="16" height="10" fill="#FFFFFF" stroke="#000" strokeWidth="2.5" />
            <rect x="200" y="263" width="14" height="10" fill="#FFFFFF" stroke="#000" strokeWidth="2.5" />
          </g>
        ) : (
          // Énorme rire de boss africain "AHAHAH YESSSS !"
          <g>
            <path
              d="M135 250 Q190 235 245 250 Q250 315 190 315 Q130 315 135 250 Z"
              fill="#991B1B"
              stroke="#000"
              strokeWidth="6"
            />
            {/* Langue joyeuse rose */}
            <path d="M165 300 Q190 275 215 300 Q190 315 165 300 Z" fill="#FB7185" stroke="#000" strokeWidth="3" />
            {/* Rangée de dents parfaites éclatantes */}
            <path d="M145 255 Q190 262 235 255" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
          </g>
        )}

        {/* --- ACCESSOIRES ET MAINS --- */}
        {mood === "CHILL" ? (
          // Billet de 10 000 FCFA dans la main et geste swag
          <g transform="translate(250, 360)">
            <ellipse cx="25" cy="45" rx="16" ry="14" fill="#5A2307" stroke="#000" strokeWidth="4" />
            {/* Billet 10 000 FCFA vert/bleu éclatant */}
            <rect
              x="20"
              y="10"
              width="65"
              height="35"
              rx="4"
              transform="rotate(15 50 25)"
              fill="#059669"
              stroke="#000"
              strokeWidth="3.5"
            />
            <text x="52" y="32" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" transform="rotate(15 50 25)">
              10 000 F
            </text>
          </g>
        ) : mood === "PANIC" ? (
          // Bougie allumée (cause délestage) tenue dans les mains qui tremblent
          <g transform={`translate(145, 380) rotate(${Math.sin(frame * 3) * 6})`}>
            {/* Flamme de bougie qui vacille */}
            <path
              d="M45 -15 C45 -25 35 -35 45 -45 C55 -35 45 -25 45 -15 Z"
              fill="#FBBF24"
              stroke="#EA580C"
              strokeWidth="3"
            />
            <circle cx="45" cy="-25" r="5" fill="#EF4444" />
            {/* Bougie blanche */}
            <rect x="35" y="-12" width="20" height="60" rx="3" fill="#FEF3C7" stroke="#000" strokeWidth="4" />
            <text x="45" y="65" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="900">
              DÉLESTAGE ⚡
            </text>
            {/* Mains tenant la bougie */}
            <circle cx="28" cy="18" r="14" fill="#5A2307" stroke="#000" strokeWidth="4" />
            <circle cx="62" cy="18" r="14" fill="#5A2307" stroke="#000" strokeWidth="4" />
          </g>
        ) : (
          // Bras levés en l'air en pleine danse Coupé-décalé avec billets de FCFA et smartphone Mobile Money !
          <g>
            {/* Bras gauche levé */}
            <path d="M90 380 Q45 320 35 250" stroke="#5A2307" strokeWidth="26" strokeLinecap="round" />
            <circle cx="35" cy="240" r="22" fill="#5A2307" stroke="#000" strokeWidth="5" />
            {/* Smartphone avec logo Wave / Mobile Money */}
            <rect
              x="5"
              y="215"
              width="36"
              height="55"
              rx="6"
              transform="rotate(-20 20 240)"
              fill="#1E293B"
              stroke="#38BDF8"
              strokeWidth="3.5"
            />
            <text x="22" y="248" textAnchor="middle" fill="#38BDF8" fontSize="16" fontWeight="900" transform="rotate(-20 20 240)">
              🌊
            </text>

            {/* Bras droit levé */}
            <path d="M290 380 Q335 320 345 250" stroke="#5A2307" strokeWidth="26" strokeLinecap="round" />
            <circle cx="345" cy="240" r="22" fill="#5A2307" stroke="#000" strokeWidth="5" />
            {/* Billet de 500 FCFA dans la main droite */}
            <rect
              x="330"
              y="215"
              width="50"
              height="30"
              rx="4"
              transform="rotate(25 355 230)"
              fill="#F59E0B"
              stroke="#000"
              strokeWidth="3.5"
            />
            <text x="355" y="235" textAnchor="middle" fill="#78350F" fontSize="12" fontWeight="900" transform="rotate(25 355 230)">
              500 F
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
