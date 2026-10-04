import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface HighlightPointerProps {
  x: number;
  y: number;
  label: string;
  sublabel?: string;
  delay?: number;
  color?: "blue" | "emerald" | "amber" | "rose";
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

export const HighlightPointer: React.FC<HighlightPointerProps> = ({
  x,
  y,
  label,
  sublabel,
  delay = 0,
  color = "blue",
  tooltipPosition = "right",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);
  const scaleSpring = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  const pulse = Math.sin(frame / 5) * 0.15 + 1;

  const colorStyles = {
    blue: {
      bg: "bg-blue-600",
      ring: "border-blue-400",
      text: "text-blue-600",
      badge: "bg-blue-600 text-white",
    },
    emerald: {
      bg: "bg-emerald-600",
      ring: "border-emerald-400",
      text: "text-emerald-600",
      badge: "bg-emerald-600 text-white",
    },
    amber: {
      bg: "bg-amber-500",
      ring: "border-amber-400",
      text: "text-amber-600",
      badge: "bg-amber-600 text-white",
    },
    rose: {
      bg: "bg-rose-600",
      ring: "border-rose-400",
      text: "text-rose-600",
      badge: "bg-rose-600 text-white",
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
        transform: `translate(-50%, -50%) scale(${scaleSpring})`,
        zIndex: 40,
        pointerEvents: "none",
      }}
      className={`flex ${positionClasses} gap-2.5`}
    >
      {/* Animated target dot with ripple */}
      <div className="relative flex items-center justify-center">
        <div
          style={{ transform: `scale(${pulse * 1.6})` }}
          className={`absolute w-8 h-8 rounded-full border-2 ${colorStyles.ring} opacity-75 animate-ping`}
        />
        <div
          style={{ transform: `scale(${pulse})` }}
          className={`w-5 h-5 rounded-full ${colorStyles.bg} shadow-lg shadow-black/30 border-2 border-white`}
        />
      </div>

      {/* Floating tooltip badge */}
      <div className="bg-gray-900/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl shadow-2xl border border-white/20 whitespace-nowrap text-center">
        <p className="text-xs font-bold leading-tight">{label}</p>
        {sublabel && (
          <p className="text-[10px] text-gray-300 font-medium">{sublabel}</p>
        )}
      </div>
    </div>
  );
};
