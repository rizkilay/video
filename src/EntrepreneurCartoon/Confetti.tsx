import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";

interface ConfettiProps {
  count?: number;
}

const COLORS = ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#FCD34D"];

export const ConfettiShower: React.FC<ConfettiProps> = ({ count = 60 }) => {
  const frame = useCurrentFrame();

  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      // Deterministic pseudo-random seed
      const seed1 = Math.sin(i * 999) * 10000;
      const seed2 = Math.cos(i * 777) * 10000;
      const seed3 = Math.sin(i * 333) * 10000;

      const x = ((seed1 - Math.floor(seed1)) * 1080);
      const speed = 7 + (seed2 - Math.floor(seed2)) * 14;
      const rotationSpeed = (seed3 - Math.floor(seed3) - 0.5) * 18;
      const size = 12 + ((seed1 + seed2) % 1) * 16;
      const color = COLORS[i % COLORS.length];
      const isCoin = i % 5 === 0;

      return { x, speed, rotationSpeed, size, color, isCoin };
    });
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      {particles.map((p, idx) => {
        const y = ((frame * p.speed + idx * 40) % 2100) - 100;
        const rot = frame * p.rotationSpeed;
        const wobbleX = Math.sin((frame + idx * 10) / 10) * 35;

        if (p.isCoin) {
          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: `${p.x + wobbleX}px`,
                top: `${y}px`,
                transform: `rotate(${rot}deg)`,
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "radial-gradient(circle, #FDE047 30%, #EAB308 90%)",
                border: "3px solid #000000",
                boxShadow: "3px 3px 0px #000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 16,
                color: "#78350F",
              }}
            >
              $
            </div>
          );
        }

        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: `${p.x + wobbleX}px`,
              top: `${y}px`,
              transform: `rotate(${rot}deg)`,
              width: `${p.size}px`,
              height: `${p.size * 0.55}px`,
              backgroundColor: p.color,
              border: "2px solid #000000",
              boxShadow: "2px 2px 0px #000000",
            }}
          />
        );
      })}
    </div>
  );
};
