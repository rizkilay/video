import React from "react";
import {
  Img,
  Loop,
  OffthreadVideo,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  CheckCircle2,
  TrendingUp,
  AlertOctagon,
  CreditCard,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ViralCaption, CaptionChunk } from "./ViralCaption";

const SCENE4_CHUNKS: CaptionChunk[] = [
  {
    startFrame: 15,
    endFrame: 110,
    before: "Tout cela pourrait être",
    highlight: "évité",
    after: "facilement",
  },
  {
    startFrame: 110,
    endFrame: 220,
    before: "Enregistrer les",
    highlight: "sorties de produits",
    after: "avec Adék Solution",
  },
  {
    startFrame: 220,
    endFrame: 330,
    before: "Mieux contrôler les",
    highlight: "mouvements de stock",
  },
  {
    startFrame: 330,
    endFrame: 440,
    before: "Enregistrer toutes les",
    highlight: "pertes de produits",
  },
  {
    startFrame: 440,
    endFrame: 555,
    before: "Suivre les ventes à",
    highlight: "crédit",
    after: "et clients débiteurs",
  },
  {
    startFrame: 560,
    endFrame: 650,
    before: "Avoir une",
    highlight: "vision claire",
    after: "de son stock",
  },
  {
    startFrame: 650,
    endFrame: 740,
    before: "Limiter les désaccords avec ses",
    highlight: "employés",
  },
  {
    startFrame: 740,
    endFrame: 860,
    before: "Gérer sa boutique en toute",
    highlight: "sérénité !",
  },
];

export const Scene4AdekSolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gentle swaying motion of the hanging rattan swing chair
  const swingAngle = Math.sin(frame * 0.07) * 3.0;
  const swingY = Math.cos(frame * 0.07) * 4;

  // Gentle breathing scale
  const breathScale = 1 + Math.sin(frame * 0.1) * 0.015;

  // Sleeping Zzz bubbles
  const zzz1Y = ((frame * 2.5) % 180);
  const zzz1Opacity = interpolate(zzz1Y, [0, 40, 140, 180], [0, 1, 0.8, 0]);

  const zzz2Y = (((frame + 45) * 2.2) % 180);
  const zzz2Opacity = interpolate(zzz2Y, [0, 40, 140, 180], [0, 1, 0.8, 0]);

  const zzz3Y = (((frame + 90) * 2.0) % 180);
  const zzz3Opacity = interpolate(zzz3Y, [0, 40, 140, 180], [0, 1, 0.8, 0]);

  // Feature Callouts Timings
  // Feature 1: Sorties de produits (frame 30 - 220)
  const feat1Spring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  // Feature 2: Mouvements de stock (frame 220 - 360)
  const feat2Spring = spring({
    frame: frame - 220,
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  // Feature 3: Enregistrer les pertes (frame 360 - 540)
  const feat3Spring = spring({
    frame: frame - 360,
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  // Feature 4: Ventes à crédit & clients débiteurs (frame 540 - 700)
  const feat4Spring = spring({
    frame: frame - 540,
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  // Feature 5: Sérénité finale (frame 700 - 850)
  const feat5Spring = spring({
    frame: frame - 700,
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  return (
    <div className="relative w-full h-full overflow-hidden bg-amber-50 select-none">
      {/* Background Font Texture */}
      <Img
        src={staticFile("boutique/font.jpeg")}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Main Software Demo Video (vente.mp4) rendered at native 1080x1916 */}
      <div className="absolute inset-0 w-full h-full">
        <Loop durationInFrames={500}>
          <OffthreadVideo
            src={staticFile("boutique/vente.mp4")}
            className="w-full h-full object-cover"
          />
        </Loop>
      </div>

      {/* Top Brand Pill Header */}
      <div className="absolute top-10 left-8 right-8 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3 bg-slate-950/85 backdrop-blur-md text-white px-6 py-2.5 rounded-full border border-blue-400 shadow-xl">
          <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
          <span className="font-extrabold text-xl tracking-wider text-blue-300">
            Adék Solution
          </span>
          <span className="text-slate-400 text-sm font-medium">| Vente & Gestion</span>
        </div>

        <div className="bg-emerald-600/90 text-white font-bold text-base px-5 py-2 rounded-full shadow-lg border border-emerald-300 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-200" />
          <span>Gestion en Temps Réel</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* INTERACTIVE CALLOUTS SYNCHRONIZED WITH NARRATION */}
      {/* ============================================================ */}

      {/* Callout 1: Sorties de produits */}
      {frame >= 30 && frame < 220 && (
        <div
          className="absolute top-[820px] left-10 z-30 bg-blue-600 text-white p-5 rounded-3xl shadow-2xl border-3 border-blue-300 flex items-center gap-4 max-w-md backdrop-blur-md"
          style={{
            transform: `scale(${interpolate(feat1Spring, [0, 1], [0.7, 1])})`,
            opacity: interpolate(feat1Spring, [0, 1], [0, 1]),
          }}
        >
          <div className="p-3 bg-white/20 rounded-2xl">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-blue-200">
              Fonctionnalité Clé
            </div>
            <div className="text-2xl font-black leading-tight">
              Sorties de produits enregistrées
            </div>
            <div className="text-sm text-blue-100 font-medium">
              Chaque vente est comptabilisée instantanément
            </div>
          </div>
        </div>
      )}

      {/* Callout 2: Contrôle des mouvements de stock */}
      {frame >= 220 && frame < 360 && (
        <div
          className="absolute top-[820px] left-10 z-30 bg-indigo-600 text-white p-5 rounded-3xl shadow-2xl border-3 border-indigo-300 flex items-center gap-4 max-w-md backdrop-blur-md"
          style={{
            transform: `scale(${interpolate(feat2Spring, [0, 1], [0.7, 1])})`,
            opacity: interpolate(feat2Spring, [0, 1], [0, 1]),
          }}
        >
          <div className="p-3 bg-white/20 rounded-2xl">
            <TrendingUp className="w-10 h-10 text-yellow-300" />
          </div>
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-indigo-200">
              Contrôle du Stock
            </div>
            <div className="text-2xl font-black leading-tight">
              Mouvements de stock maîtrisés
            </div>
            <div className="text-sm text-indigo-100 font-medium">
              Entrées, sorties & inventaire précis
            </div>
          </div>
        </div>
      )}

      {/* Callout 3: Modal Enregistrement Pertes (with screenshot popup!) */}
      {frame >= 360 && frame < 540 && (
        <div
          className="absolute top-[750px] left-8 right-8 z-30 flex flex-col items-center gap-3"
          style={{
            transform: `scale(${interpolate(feat3Spring, [0, 1], [0.8, 1])})`,
            opacity: interpolate(feat3Spring, [0, 1], [0, 1]),
          }}
        >
          <div className="bg-amber-500 text-slate-950 font-black text-xl px-6 py-2.5 rounded-full border-2 border-white shadow-xl flex items-center gap-2">
            <AlertOctagon className="w-6 h-6 text-red-900" />
            <span>Enregistrement des Pertes & Sorties Spéciales</span>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-400 max-w-md bg-white">
            <Img
              src={staticFile("boutique/enregistremen_de_perte_ou_vente_a_credit.png")}
              className="w-full h-auto object-contain"
            />
            {/* Highlight pulse around MARQUER COMME PERTE */}
            <div className="absolute top-[37%] left-[10%] right-[10%] h-[18%] rounded-xl border-4 border-red-500 bg-red-500/20 animate-pulse pointer-events-none" />
          </div>
        </div>
      )}

      {/* Callout 4: Suivi des ventes à crédit */}
      {frame >= 540 && frame < 700 && (
        <div
          className="absolute top-[820px] left-10 z-30 bg-emerald-700 text-white p-5 rounded-3xl shadow-2xl border-3 border-emerald-300 flex items-center gap-4 max-w-md backdrop-blur-md"
          style={{
            transform: `scale(${interpolate(feat4Spring, [0, 1], [0.7, 1])})`,
            opacity: interpolate(feat4Spring, [0, 1], [0, 1]),
          }}
        >
          <div className="p-3 bg-white/20 rounded-2xl">
            <CreditCard className="w-10 h-10 text-emerald-200" />
          </div>
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-emerald-200">
              Finances Claires
            </div>
            <div className="text-2xl font-black leading-tight">
              Ventes à crédit & Débiteurs
            </div>
            <div className="text-sm text-emerald-100 font-medium">
              Suivi exact de qui vous doit de l'argent
            </div>
          </div>
        </div>
      )}

      {/* Callout 5: Vision claire & Sérénité totale */}
      {frame >= 700 && (
        <div
          className="absolute top-[800px] left-8 right-8 z-30 flex flex-col items-center text-center gap-3 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-3xl shadow-2xl border-4 border-amber-400"
          style={{
            transform: `scale(${interpolate(feat5Spring, [0, 1], [0.8, 1])})`,
            opacity: interpolate(feat5Spring, [0, 1], [0, 1]),
          }}
        >
          <div className="flex items-center gap-2 text-amber-300 font-black text-2xl">
            <Sparkles className="w-8 h-8 text-amber-400" />
            <span>Adék Solution : Sérénité Absolue</span>
          </div>
          <div className="text-3xl font-extrabold text-white">
            0 Conflit • Stock Carré • Esprit Libre !
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* ALLADJI TACBIR DORT - ANIMATION DRÔLE DE TRANQUILLITÉ */}
      {/* ============================================================ */}
      <div
        className="absolute bottom-32 right-2 w-[560px] h-[620px] z-20 pointer-events-none"
        style={{
          transformOrigin: "50% 0%",
          transform: `rotate(${swingAngle}deg) translateY(${swingY}px) scale(${breathScale})`,
        }}
      >
        <Img
          src={staticFile("boutique/Alladji_Tacbir_dort.png")}
          className="w-full h-full object-contain filter drop-shadow-2xl"
        />

        {/* Floating animated Zzz comic bubbles */}
        <div
          className="absolute top-28 left-20 font-black text-indigo-700 text-4xl select-none"
          style={{
            transform: `translateY(-${zzz1Y}px) scale(${1 + zzz1Y * 0.005})`,
            opacity: zzz1Opacity,
          }}
        >
          Zzz...
        </div>

        <div
          className="absolute top-20 left-28 font-black text-blue-600 text-5xl select-none"
          style={{
            transform: `translateY(-${zzz2Y}px) scale(${1 + zzz2Y * 0.006})`,
            opacity: zzz2Opacity,
          }}
        >
          Zzz...
        </div>

        <div
          className="absolute top-12 left-16 font-black text-emerald-600 text-6xl select-none"
          style={{
            transform: `translateY(-${zzz3Y}px) scale(${1 + zzz3Y * 0.007})`,
            opacity: zzz3Opacity,
          }}
        >
          💤
        </div>

        {/* Funny comic dream bubble */}
        {!(frame >= 360 && frame < 540) && (
          <div className="absolute -top-16 left-6 bg-white/95 text-slate-900 font-black text-base px-5 py-2.5 rounded-2xl shadow-2xl border-3 border-emerald-400 max-w-xs animate-bounce">
            💭 "Stock = 100% OK ! Je dors tranquille..."
          </div>
        )}
      </div>

      {/* Modern Viral TikTok Subtitles (Alex Hormozi style) */}
      <ViralCaption currentFrame={frame} chunks={SCENE4_CHUNKS} bottomClass="bottom-14" />
    </div>
  );
};
