import { useCallback, useState, useMemo } from "react";

type ReactStepSliderProps = {
  onChange: (value: number) => void;
  steps: number;
  dotColor?: string;
  dotSize?: number;
  verticalLineColor?: string;
  verticalLineHeight?: number;
  verticalLineWidth?: number;
  horizontalLineColor?: string;
  horizontalLineHeight?: number;
  labels?: readonly string[];
  labelSize?: number;
  ellipsisLabelWidth?: number;
  initialIndex?: number;
  pointerBoundary?: number;
  className?: string;
  'aria-label'?: string;
};

export const ReactStepSlider = (props: ReactStepSliderProps) => {
  const {
    onChange,
    dotColor = "#0000ff",
    dotSize = 12,
    verticalLineColor = "#0000ff",
    verticalLineHeight = 16,
    verticalLineWidth = 2,
    horizontalLineColor = "#0000ff",
    horizontalLineHeight = 2,
    steps = 5,
    labels = [],
    labelSize = 16,
    ellipsisLabelWidth = 20,
    initialIndex = 0,
    pointerBoundary = 8,
    className = "",
    'aria-label': ariaLabel = "Step slider"
  } = props;

  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

  const getStepPosition = useCallback((index: number) => (index / (steps - 1)) * 100, [steps]);

  const handleStepClick = useCallback((index: number) => {
    setCurrentIndex(index);
    onChange(index);
  }, [onChange]);

  const stepIndices = useMemo(() => Array.from({ length: steps }, (_, i) => i), [steps]);

  const baseStyles = useMemo(() => ({
    container: { position: "relative" as const, height: "auto" as const },
    horizontalLine: {
      position: "relative" as const,
      width: "100%",
      height: `${horizontalLineHeight}px`,
      backgroundColor: horizontalLineColor,
    },
    stepContainer: {
      position: "absolute" as const,
      top: "0%",
      transform: "translate(-50%, -50%)",
      padding: `${pointerBoundary}px`,
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      cursor: "pointer",
    },
    stepContent: { position: "relative" as const },
    verticalLine: {
      position: "absolute" as const,
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      height: `${verticalLineHeight}px`,
      backgroundColor: verticalLineColor,
      width: `${verticalLineWidth}px`,
    },
    label: {
      position: "absolute" as const,
      top: `${verticalLineHeight / 2 + 8}px`,
      left: "50%",
      transform: "translate(-50%, 0)",
      fontSize: `${labelSize}px`,
      width: `${ellipsisLabelWidth}px`,
      textOverflow: "ellipsis",
      whiteSpace: "nowrap" as const,
      overflow: "hidden",
      textAlign: "center" as const,
    },
    dot: {
      position: "absolute" as const,
      top: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "100%",
      backgroundColor: dotColor,
      width: `${dotSize}px`,
      height: `${dotSize}px`,
      transition: "all 0.3s ease-in-out",
      zIndex: 1,
    }
  }), [horizontalLineHeight, horizontalLineColor, pointerBoundary, verticalLineHeight, verticalLineColor, verticalLineWidth, labelSize, ellipsisLabelWidth, dotColor, dotSize]);

  return (
    <div
      className={`slider-container ${className}`}
      style={baseStyles.container}
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={steps - 1}
      aria-valuenow={currentIndex}
      aria-valuetext={labels[currentIndex] || `Step ${currentIndex + 1}`}
    >
      <div className="slider-horizontal-line" style={baseStyles.horizontalLine}>
        {stepIndices.map((index) => {
          const position = getStepPosition(index);
          const stepLabel = labels[index];

          return (
            <div
              key={index}
              className="slider-step"
              style={{ ...baseStyles.stepContainer, left: `${position}%` }}
              onClick={() => handleStepClick(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleStepClick(index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Go to step ${index + 1}${stepLabel ? `: ${stepLabel}` : ''}`}
            >
              <div className="slider-step-content" style={baseStyles.stepContent}>
                <div style={baseStyles.verticalLine} />
                {stepLabel && (
                  <p className="step-label" title={stepLabel} style={baseStyles.label}>
                    {stepLabel}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="slider-dot"
        style={{ ...baseStyles.dot, left: `${getStepPosition(currentIndex)}%` }}
      />
    </div>
  );
};
