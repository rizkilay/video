import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface ComicBubbleProps {
  text: string;
  subtext?: string;
  emoji?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  x?: number;
  y?: number;
  scale?: number;
  rotation?: number;
  delay?: number;
}

export const ComicBubble: React.FC<ComicBubbleProps> = ({
  text,
  subtext,
  emoji,
  bgColor = "#FEF08A",
  textColor = "#000000",
  borderColor = "#000000",
  x = 0,
  y = 0,
  scale = 1,
  rotation = 0,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 9, mass: 0.6, stiffness: 200 },
  });

  if (frame < delay) return null;

  return (
    <div
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${pop * scale})`,
        transformOrigin: "center center",
      }}
      className="absolute z-30"
    >
      <div
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
          color: textColor,
          boxShadow: "8px 8px 0px #000000",
        }}
        className="px-6 py-4 rounded-3xl border-4 font-black flex items-center gap-3 select-none"
      >
        {emoji && <span className="text-4xl animate-bounce">{emoji}</span>}
        <div className="flex flex-col">
          <span className="text-2xl tracking-wide uppercase drop-shadow-sm">{text}</span>
          {subtext && (
            <span className="text-base font-bold opacity-80 mt-0.5">{subtext}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export const ComicSoundFx: React.FC<{
  text: string;
  color?: string;
  bgColor?: string;
  rotation?: number;
  x?: number;
  y?: number;
  scale?: number;
  delay?: number;
}> = ({
  text,
  color = "#FACC15",
  bgColor = "#EF4444",
  rotation = -8,
  x = 0,
  y = 0,
  scale = 1,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 8, mass: 0.5, stiffness: 240 },
  });

  if (frame < delay) return null;

  return (
    <div
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${pop * scale})`,
        transformOrigin: "center center",
      }}
      className="absolute z-40 pointer-events-none"
    >
      <div
        style={{
          backgroundColor: bgColor,
          borderColor: "#000000",
          boxShadow: "10px 10px 0px #000000",
          textShadow: "4px 4px 0px #000000",
        }}
        className="px-8 py-3 rounded-2xl border-6 font-black text-4xl tracking-widest text-yellow-300 uppercase italic transform -skew-x-6"
      >
        {text}
      </div>
    </div>
  );
};
