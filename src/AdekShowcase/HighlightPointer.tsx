import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface HighlightPointerProps {
  x: number;
  y: number;
  label: string;
  sublabel?: string;
  delay?: number;
  color?: "blue" | "emerald" | "amber" | "rose" | "purple" | "indigo";
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  icon?: React.ReactNode;
}

export const HighlightPointer: React.FC<HighlightPointerProps> = ({
  x,
  y,
  label,
  sublabel,
  delay = 0,
  color = "blue",
  tooltipPosition = "right",
  icon,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);
  const entrance = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 120 },
  });

  const scale = interpolate(entrance, [0, 1], [0.4, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const pulse = Math.sin(frame / 6) * 0.12 + 1;

  const colorMap = {
    blue: {
      bg: "bg-blue-600",
      ring: "border-blue-400",
      glow: "shadow-blue-500/40",
      accent: "text-blue-400",
      border: "border-blue-500/30",
    },
    emerald: {
      bg: "bg-emerald-600",
      ring: "border-emerald-400",
      glow: "shadow-emerald-500/40",
      accent: "text-emerald-400",
      border: "border-emerald-500/30",
    },
    amber: {
      bg: "bg-amber-500",
      ring: "border-amber-400",
      glow: "shadow-amber-500/40",
      accent: "text-amber-400",
      border: "border-amber-500/30",
    },
    rose: {
      bg: "bg-rose-600",
      ring: "border-rose-400",
      glow: "shadow-rose-500/40",
      accent: "text-rose-400",
      border: "border-rose-500/30",
    },
    purple: {
      bg: "bg-purple-600",
      ring: "border-purple-400",
      glow: "shadow-purple-500/40",
      accent: "text-purple-400",
      border: "border-purple-500/30",
    },
    indigo: {
      bg: "bg-indigo-600",
      ring: "border-indigo-400",
      glow: "shadow-indigo-500/40",
      accent: "text-indigo-400",
      border: "border-indigo-500/30",
    },
  }[color];

  const positionClasses = {
    right: "flex-row items-center",
    left: "flex-row-reverse items-center",
    top: "flex-col-reverse items-center",
    bottom: "flex-col items-center",
  }[tooltipPosition];

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        zIndex: 50,
        pointerEvents: "none",
      }}
      className={`flex ${positionClasses} gap-3 select-none`}
    >
      {/* Target Reticle with Double Pulse Rings */}
      <div className="relative flex items-center justify-center shrink-0">
        {/* Outer expanding ping ring */}
        <div
          style={{ transform: `scale(${pulse * 1.8})` }}
          className={`absolute w-10 h-10 rounded-full border-2 ${colorMap.ring} opacity-80 animate-ping`}
        />
        {/* Middle breathing ring */}
        <div
          style={{ transform: `scale(${pulse * 1.3})` }}
          className={`absolute w-8 h-8 rounded-full border border-white/60 bg-white/20 backdrop-blur-sm`}
        />
        {/* Center Target Dot */}
        <div
          style={{ transform: `scale(${pulse})` }}
          className={`w-5 h-5 rounded-full ${colorMap.bg} shadow-lg ${colorMap.glow} border-2 border-white flex items-center justify-center`}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
      </div>

      {/* Tooltip Card */}
      <div
        className={`bg-gray-950/90 backdrop-blur-xl text-white px-4 py-2 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.4)] border ${colorMap.border} whitespace-nowrap flex items-center gap-2.5`}
      >
        {icon && <div className={`${colorMap.accent}`}>{icon}</div>}
        <div className="text-left">
          <p className="text-xs font-black tracking-tight leading-snug">
            {label}
          </p>
          {sublabel && (
            <p className="text-[11px] text-gray-300 font-medium leading-snug">
              {sublabel}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
