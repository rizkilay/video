import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  Check,
  ShoppingBag,
  CreditCard,
  ReceiptText,
} from "lucide-react";

export interface BottomStepperProps {
  currentStep: number; // 0, 1, 2
  currentStepStartFrame: number;
}

export const steps = [
  { id: 0, label: "Sélectionner", icon: ShoppingBag },
  { id: 1, label: "Éditer", icon: CreditCard },
  { id: 2, label: "Imprimer", icon: ReceiptText },
];

// Olive/khaki color palette matching the reference design
const COLORS = {
  olive: "#8B8B3A",        // Main olive for completed circle fill
  oliveDark: "#5C5C28",    // Dark olive for labels of completed steps
  oliveLight: "#D4D4A8",   // Light olive for rings, upcoming lines
  olivePale: "#ECECDA",    // Pale olive for outer rings
  oliveFaint: "#F5F5EA",   // Very faint olive for upcoming circle background
  lineComplete: "#2D2D2D", // Dark line between completed steps
  linePending: "#D4D4A8",  // Light olive line for pending
  textPending: "#A0A070",  // Text color for pending steps
  white: "#FFFFFF",
};

export const BottomStepper: React.FC<BottomStepperProps> = ({
  currentStep,
  currentStepStartFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance animation
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 100 },
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const bottomPosition = interpolate(
    frame,
    [360, 390],
    [200, 32],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const clampedStep = Math.min(currentStep, steps.length - 1);

  // Animate step transition
  const stepTransition = spring({
    frame: Math.max(0, frame - currentStepStartFrame),
    fps,
    config: { damping: 18, mass: 0.8, stiffness: 100 },
  });

  // Circle sizes
  const CIRCLE_DONE = 80;    // Completed circle diameter
  const CIRCLE_PENDING = 40; // Pending/upcoming circle diameter
  const RING_GAP = 6;        // Gap between circle and ring
  const RING_WIDTH = 3;      // Ring stroke width

  return (
    <div
      style={{
        bottom: bottomPosition,
        opacity,
      }}
      className="absolute left-[60px] z-40 w-[960px] pointer-events-none select-none"
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(24px)",
          borderRadius: 28,
          boxShadow: "0 20px 50px rgba(15, 23, 42, 0.18)",
          border: "1px solid rgba(255,255,255,0.8)",
          padding: "16px 40px 20px",
        }}
      >
        {/* Stepper Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {steps.map((step, idx) => {
            const isDone = clampedStep > idx;
            const isActive = clampedStep === idx;
            const isPending = clampedStep < idx;

            // Animate current step becoming active
            const circleScale = isActive
              ? interpolate(stepTransition, [0, 1], [0.6, 1])
              : 1;
            const circleOpacity = isActive
              ? interpolate(stepTransition, [0, 1], [0.3, 1])
              : 1;

            // Determine sizes
            const circleSize = isDone || isActive ? CIRCLE_DONE : CIRCLE_PENDING;
            const outerRingSize = circleSize + (RING_GAP + RING_WIDTH) * 2;

            return (
              <React.Fragment key={step.id}>
                {/* Step Node */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    transform: `scale(${circleScale})`,
                    opacity: circleOpacity,
                    minWidth: outerRingSize + 20,
                  }}
                >
                  {/* Label above the circle */}
                  <div
                    style={{
                      marginBottom: 8,
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: isDone || isActive ? 22 : 18,
                        fontWeight: isDone || isActive ? 800 : 600,
                        color: isDone
                          ? COLORS.oliveDark
                          : isActive
                          ? COLORS.olive
                          : COLORS.textPending,
                        lineHeight: 1.2,
                        letterSpacing: "-0.01em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {step.label}
                    </p>
                  </div>

                  {/* Concentric rings + circle */}
                  <div
                    style={{
                      position: "relative",
                      width: outerRingSize,
                      height: outerRingSize,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* Outer ring */}
                    {(isDone || isActive) && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "50%",
                          border: `${RING_WIDTH}px solid ${COLORS.olivePale}`,
                        }}
                      />
                    )}

                    {/* Inner ring */}
                    {(isDone || isActive) && (
                      <div
                        style={{
                          position: "absolute",
                          top: RING_WIDTH + 1,
                          left: RING_WIDTH + 1,
                          right: RING_WIDTH + 1,
                          bottom: RING_WIDTH + 1,
                          borderRadius: "50%",
                          border: `2px solid ${COLORS.oliveLight}`,
                        }}
                      />
                    )}

                    {/* Main circle */}
                    <div
                      style={{
                        width: circleSize,
                        height: circleSize,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: isDone
                          ? COLORS.olive
                          : isActive
                          ? `linear-gradient(135deg, ${COLORS.olive}, ${COLORS.oliveDark})`
                          : COLORS.oliveFaint,
                        boxShadow: isDone || isActive
                          ? `0 4px 16px rgba(139, 139, 58, 0.35)`
                          : "none",
                        border: isPending
                          ? `2px solid ${COLORS.oliveLight}`
                          : "none",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {isDone ? (
                        <Check
                          size={circleSize * 0.4}
                          color={COLORS.white}
                          strokeWidth={3.5}
                        />
                      ) : isActive ? (
                        <step.icon
                          size={circleSize * 0.35}
                          color={COLORS.white}
                          strokeWidth={2.5}
                        />
                      ) : (
                        /* Small dot for pending steps */
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: COLORS.oliveLight,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Connector line between steps */}
                {idx < steps.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: isDone ? 4 : 2,
                      marginTop: 28, // offset to align with circles (below labels)
                      marginLeft: -6,
                      marginRight: -6,
                      borderRadius: 4,
                      background: isDone
                        ? COLORS.lineComplete
                        : COLORS.linePending,
                      transition: "all 0.4s ease",
                      position: "relative",
                    }}
                  >
                    {/* Animated progress fill on the line leading to current step */}
                    {isActive && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          height: "100%",
                          width: `${interpolate(stepTransition, [0, 1], [0, 40])}%`,
                          background: COLORS.lineComplete,
                          borderRadius: 4,
                        }}
                      />
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>


      </div>
    </div>
  );
};
