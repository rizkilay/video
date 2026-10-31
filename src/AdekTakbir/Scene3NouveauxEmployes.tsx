import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ViralCaption, CaptionChunk } from "./ViralCaption";

const SCENE3_CHUNKS: CaptionChunk[] = [
  {
    startFrame: 5,
    endFrame: 72,
    before: "Résultat, on voit de",
    highlight: "nouveaux employés",
  },
  {
    startFrame: 72,
    endFrame: 145,
    before: "Dans la boutique",
    highlight: "Takbir Mobiles",
  },
];

export const Scene3NouveauxEmployes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.7 },
  });

  // Cinematic Horizontal Ken Burns Pan:
  // Starts centered on welcoming employees, then smoothly glides to reveal Alladji & his 3 wives!
  const panX = interpolate(frame, [0, 150], [-60, -280], {
    extrapolateRight: "clamp",
  });

  // Gentle zoom progression
  const zoom = interpolate(frame, [0, 150], [1.02, 1.08], {
    extrapolateRight: "clamp",
  });

  // Gentle float motion
  const floatY = Math.sin(frame * 0.08) * 4;

  // Floating sparkle particles
  const sparkleY1 = ((frame * 2.2) % 160);
  const sparkleOpacity1 = interpolate(sparkleY1, [0, 30, 130, 160], [0, 1, 0.8, 0]);

  const sparkleY2 = (((frame + 50) * 1.9) % 160);
  const sparkleOpacity2 = interpolate(sparkleY2, [0, 30, 130, 160], [0, 1, 0.8, 0]);

  const sparkleY3 = (((frame + 100) * 2.5) % 160);
  const sparkleOpacity3 = interpolate(sparkleY3, [0, 30, 130, 160], [0, 1, 0.8, 0]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-amber-50 select-none">
      {/* 1. Base Canvas Texture: font.jpeg */}
      <Img
        src={staticFile("boutique/font.jpeg")}
        className="absolute inset-0 w-full h-full object-cover opacity-75"
      />

      {/* 2. Atmospheric Ambient Blurred Background (fills full 1080x1916 for TikTok) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <Img
          src={staticFile("nouvel_image/out_frame540.jpeg")}
          className="w-full h-full object-cover filter blur-md scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-transparent to-amber-950/60" />
      </div>

      {/* 3. Top Header Bar (TikTok safe zone: Y ~120px) */}
      <div className="absolute top-14 left-8 right-8 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3 bg-emerald-950/90 backdrop-blur-md text-emerald-200 px-6 py-2.5 rounded-full border border-emerald-400 shadow-xl">
          <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-extrabold text-lg tracking-wide uppercase">
            Nouveau Départ • Équipe Renouvelée
          </span>
        </div>

        <div className="bg-amber-400 text-slate-950 font-black text-lg px-5 py-2 rounded-full shadow-lg border border-amber-200 flex items-center gap-2">
          <span>Takbir Mobiles 📱</span>
        </div>
      </div>

      {/* 4. Main Artwork Showcase Card (Optimized for Mobile / TikTok 9:16) */}
      <div
        className="absolute top-[180px] left-6 right-6 h-[1050px] z-20"
        style={{
          transform: `scale(${interpolate(entrance, [0, 1], [0.95, 1])}) translateY(${floatY}px)`,
        }}
      >
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300 bg-slate-900">
          {/* Animated Panoramic Pan Across the 1920x1280 wide image */}
          <div
            className="absolute top-0 left-0 h-full w-[1600px]"
            style={{
              transform: `translateX(${panX}px) scale(${zoom})`,
              transformOrigin: "center center",
            }}
          >
            <Img
              src={staticFile("nouvel_image/out_frame540.jpeg")}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Floating celebratory sparkles */}
          <div
            className="absolute top-48 left-16 text-3xl pointer-events-none select-none"
            style={{
              transform: `translateY(-${sparkleY1}px)`,
              opacity: sparkleOpacity1,
            }}
          >
            ✨
          </div>

          <div
            className="absolute top-36 right-24 text-4xl pointer-events-none select-none"
            style={{
              transform: `translateY(-${sparkleY2}px)`,
              opacity: sparkleOpacity2,
            }}
          >
            🌟
          </div>

          <div
            className="absolute top-64 right-1/2 text-3xl pointer-events-none select-none"
            style={{
              transform: `translateY(-${sparkleY3}px)`,
              opacity: sparkleOpacity3,
            }}
          >
            ✨
          </div>
        </div>
      </div>

      {/* 5. Modern Viral TikTok Subtitles (Alex Hormozi style) */}
      <ViralCaption currentFrame={frame} chunks={SCENE3_CHUNKS} />
    </div>
  );
};
