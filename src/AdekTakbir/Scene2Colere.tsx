import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ViralCaption, CaptionChunk } from "./ViralCaption";

const SCENE2_CHUNKS: CaptionChunk[] = [
  {
    startFrame: 8,
    endFrame: 90,
    before: "Quand on le voit",
    highlight: "discuter",
    after: "avec ses employés",
  },
  {
    startFrame: 90,
    endFrame: 175,
    before: "Soit c'est lui qui a",
    highlight: "raison",
    after: "soit ce sont eux",
  },
  {
    startFrame: 175,
    endFrame: 295,
    before: "Et cela tourne autour du",
    highlight: "nombre réel",
    after: "de produits",
  },
];

export const Scene2Colere: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Furious anger camera vibration / shake
  const shakeX = Math.sin(frame * 1.5) * 3.5;
  const shakeY = Math.cos(frame * 1.3) * 2.5;

  // Slow intense Ken Burns push-in zoom on the argument
  const zoom = interpolate(frame, [0, 310], [1.0, 1.08], {
    extrapolateRight: "clamp",
  });

  // Fiery pulsing anger glow
  const angerGlow = interpolate(Math.sin(frame * 0.4), [-1, 1], [0.55, 0.95]);

  // Speech bubble 1 (Alladji shouting)
  const bubble1Entrance = spring({
    frame: frame - 12,
    fps,
    config: { damping: 10, mass: 0.5 },
  });

  // Speech bubble 2 (Employees defending themselves)
  const bubble2Entrance = spring({
    frame: frame - 45,
    fps,
    config: { damping: 10, mass: 0.5 },
  });

  return (
    <div className="relative w-full h-full overflow-hidden bg-amber-950 select-none">
      {/* 1. Base Canvas Texture: font.jpeg */}
      <Img
        src={staticFile("boutique/font.jpeg")}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />

      {/* 2. Atmospheric Ambient Blurred Background (fills full 1080x1916 for TikTok) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <Img
          src={staticFile("nouvel_image/out_frame280.jpeg")}
          className="w-full h-full object-cover filter blur-md scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/60 via-transparent to-red-950/80" />
      </div>

      {/* 3. Top Header Bar (TikTok safe zone: Y ~120px) */}
      <div className="absolute top-14 left-8 right-8 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3 bg-red-950/90 backdrop-blur-md text-red-200 px-6 py-2.5 rounded-full border border-red-500 shadow-xl">
          <span className="w-3.5 h-3.5 rounded-full bg-red-500 animate-ping" />
          <span className="font-extrabold text-lg tracking-wide uppercase">
            Tension • Le Mystère du Stock Réel
          </span>
        </div>
      </div>

      {/* 4. Main Artwork Showcase Card (Optimized for Mobile / TikTok 9:16) */}
      <div
        className="absolute top-[180px] left-6 right-6 h-[1050px] z-20"
        style={{
          transform: `scale(${zoom}) translate(${shakeX}px, ${shakeY}px)`,
        }}
      >
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-red-600 bg-slate-900">
          <Img
            src={staticFile("nouvel_image/out_frame280.jpeg")}
            className="w-full h-full object-cover"
          />

          {/* Fiery Red Eyes comic flare over Alladji's eyes */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-screen"
            style={{
              opacity: angerGlow,
              background:
                "radial-gradient(circle at 64% 21%, rgba(255, 30, 0, 0.6) 0%, transparent 16%)",
            }}
          />

          {/* Comic Anger Marks */}
          <div className="absolute top-10 right-1/4 flex gap-3 text-4xl animate-bounce">
            <span>💢</span>
            <span>🔥</span>
            <span>💢</span>
          </div>

          {/* Speech Bubble: Alladji Takbir shouting */}
          {frame >= 12 && (
            <div
              className="absolute top-12 left-6 bg-red-600 text-white font-black text-2xl px-6 py-4 rounded-3xl shadow-2xl border-4 border-yellow-300 max-w-sm"
              style={{
                transform: `scale(${interpolate(bubble1Entrance, [0, 1], [0.7, 1])})`,
                opacity: interpolate(bubble1Entrance, [0, 1], [0, 1]),
              }}
            >
              <div className="text-yellow-300 text-sm font-bold uppercase tracking-wider mb-1">
                Alladji Takbir :
              </div>
              "Le compte n'est pas bon ! Qui a touché à mes téléphones ?!"
            </div>
          )}

          {/* Speech Bubble: Employees defensive & crying */}
          {frame >= 45 && (
            <div
              className="absolute bottom-16 left-6 bg-white/95 text-slate-900 font-extrabold text-xl px-6 py-4 rounded-3xl shadow-2xl border-4 border-slate-300 max-w-xs"
              style={{
                transform: `scale(${interpolate(bubble2Entrance, [0, 1], [0.7, 1])})`,
                opacity: interpolate(bubble2Entrance, [0, 1], [0, 1]),
              }}
            >
              <div className="text-blue-600 text-sm font-bold uppercase tracking-wider mb-1">
                Employés :
              </div>
              "Mais patron ! On a tout bien noté hier ! Le stock cloche !"
            </div>
          )}
        </div>
      </div>

      {/* Modern Viral TikTok Subtitles (Alex Hormozi style) */}
      <ViralCaption currentFrame={frame} chunks={SCENE2_CHUNKS} />
    </div>
  );
};
