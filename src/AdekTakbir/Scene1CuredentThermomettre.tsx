import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SubtitleBanner } from "./SubtitleBanner";

export const Scene1CuredentThermomettre: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Morph point from normal/toothpick to thermometer at frame 70 (~2.3s)
  const isThermometer = frame >= 70;

  // Zoom progression (Ken Burns push-in)
  const zoom = interpolate(frame, [0, 170], [1.0, 1.07], {
    extrapolateRight: "clamp",
  });

  // Reaction pop animation around frame 70 (thermometer fever shock)
  const popSpring = spring({
    frame: frame - 70,
    fps,
    config: { damping: 10, mass: 0.45, stiffness: 200 },
  });

  // Camera fever shake once thermometer hits
  const thermoShake = isThermometer
    ? Math.sin(frame * 1.4) * interpolate(popSpring, [0, 1], [6, 1.5])
    : Math.sin(frame * 0.08) * 3;

  // Gentle breathing float
  const floatY = Math.cos(frame * 0.06) * 4;

  // Temperature gauge counter climbing up
  const temperature = interpolate(frame, [70, 150], [37.5, 41.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }).toFixed(1);

  // Animated steam particles rising when fever is high
  const steamY1 = ((frame * 2.8) % 120);
  const steamOpacity1 = interpolate(steamY1, [0, 30, 90, 120], [0, 0.9, 0.7, 0]);

  const steamY2 = (((frame + 40) * 2.5) % 120);
  const steamOpacity2 = interpolate(steamY2, [0, 30, 90, 120], [0, 0.9, 0.7, 0]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-amber-50 select-none">
      {/* 1. Base Canvas Texture: font.jpeg */}
      <Img
        src={staticFile("boutique/font.jpeg")}
        className="absolute inset-0 w-full h-full object-cover opacity-75"
      />

      {/* 2. Atmospheric Ambient Blurred Background (fills full 1080x1916 for TikTok) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-45">
        <Img
          src={
            isThermometer
              ? staticFile("nouvel_image/out_frame120.jpeg")
              : staticFile("nouvel_image/out_frame0.jpeg")
          }
          className="w-full h-full object-cover filter blur-md scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/40 via-transparent to-amber-950/60" />
      </div>

      {/* 3. Top Header Bar (TikTok safe zone: Y ~120px) */}
      <div className="absolute top-14 left-8 right-8 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3 bg-amber-950/85 backdrop-blur-md text-amber-200 px-6 py-2.5 rounded-full border border-amber-400/50 shadow-xl">
          <span className="w-3.5 h-3.5 rounded-full bg-red-500 animate-ping" />
          <span className="font-extrabold text-lg tracking-wide uppercase">
            Alladji Takbir • Lomé
          </span>
        </div>

        {isThermometer && (
          <div
            className="flex items-center gap-2 bg-red-600/90 text-white font-black text-xl px-5 py-2.5 rounded-full shadow-2xl border-2 border-yellow-300 animate-pulse"
            style={{
              transform: `scale(${interpolate(popSpring, [0, 1], [0.8, 1])})`,
            }}
          >
            <span>Fièvre Stock :</span>
            <span className="text-yellow-300">{temperature}°C 🔥</span>
          </div>
        )}
      </div>

      {/* 4. Main Artwork Showcase Card (Optimized for Mobile / TikTok 9:16) */}
      <div
        className="absolute top-[180px] left-6 right-6 h-[1050px] z-20"
        style={{
          transform: `scale(${zoom}) translateY(${thermoShake + floatY}px)`,
        }}
      >
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300/80 bg-slate-900">
          {/* State 1: Frame 0 - Alladji pensif */}
          <div
            className="absolute inset-0 w-full h-full transition-opacity duration-300"
            style={{
              opacity: frame < 70 ? 1 : 0,
              pointerEvents: "none",
            }}
          >
            <Img
              src={staticFile("nouvel_image/out_frame0.jpeg")}
              className="w-full h-full object-cover"
            />
          </div>

          {/* State 2: Frame 120 - Alladji malade / thermomètre dans la bouche */}
          <div
            className="absolute inset-0 w-full h-full transition-opacity duration-300"
            style={{
              opacity: frame >= 70 ? 1 : 0,
              transform: frame >= 70 ? `scale(${interpolate(popSpring, [0, 1], [0.96, 1])})` : "none",
              pointerEvents: "none",
            }}
          >
            <Img
              src={staticFile("nouvel_image/out_frame120.jpeg")}
              className="w-full h-full object-cover"
            />

            {/* Flash shockwave on morph point */}
            {frame >= 70 && frame < 76 && (
              <div
                className="absolute inset-0 bg-white pointer-events-none"
                style={{
                  opacity: interpolate(frame, [70, 75], [0.8, 0]),
                }}
              />
            )}

            {/* Animated Rising Steam Puffs */}
            <div
              className="absolute top-28 left-48 text-4xl pointer-events-none"
              style={{
                transform: `translateY(-${steamY1}px) scale(${1 + steamY1 * 0.008})`,
                opacity: steamOpacity1,
              }}
            >
              💨
            </div>

            <div
              className="absolute top-36 right-44 text-5xl pointer-events-none"
              style={{
                transform: `translateY(-${steamY2}px) scale(${1 + steamY2 * 0.008})`,
                opacity: steamOpacity2,
              }}
            >
              💨
            </div>

            {/* Comic Question/Stress Bubble */}
            <div className="absolute top-24 left-8 bg-white/95 text-slate-900 font-extrabold text-xl px-5 py-3 rounded-2xl shadow-2xl border-2 border-red-400 animate-bounce">
              💬 "Ayiie... mes téléphones manquent !"
            </div>
          </div>
        </div>
      </div>

      {/* 5. Subtitle Banner with Character Reaction (TikTok bottom safe zone) */}
      <SubtitleBanner
        text={
          frame < 70
            ? "Alladji Tacbir souffre..."
            : "Alladji Tacbir souffre d'un seul problème : le nombre de ses produits."
        }
        reactionNote={
          frame < 70
            ? "🦷 (Alladji avec son cure-dent pensif)"
            : "🌡️ (Le cure-dent se transforme en thermomètre !)"
        }
        theme={frame < 70 ? "normal" : "danger"}
      />
    </div>
  );
};
