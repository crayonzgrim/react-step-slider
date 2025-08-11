import { useCallback, useState } from "react";

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
  labels?: Array<string>;
  labelSize?: number;
  ellipsisLabelWidth?: number;
  initialIndex?: number;
  pointerBoundary?: number;
  className?: string;
  'aria-label'?: string;
};

// 리팩토링: 기본값 상수 분리
const DEFAULT_PROPS = {
  dotColor: "#0000ff",
  dotSize: 12,
  verticalLineColor: "#0000ff",
  verticalLineHeight: 16,
  verticalLineWidth: 2,
  horizontalLineColor: "#0000ff",
  horizontalLineHeight: 2,
  steps: 5,
  labels: [],
  labelSize: 16,
  ellipsisLabelWidth: 20,
  initialIndex: 0,
  pointerBoundary: 8,
  className: "",
  'aria-label': "Step slider"
} as const;

export const ReactStepSlider = (props: ReactStepSliderProps) => {
  /** Property */
  const {
    onChange,
    dotColor = DEFAULT_PROPS.dotColor,
    dotSize = DEFAULT_PROPS.dotSize,
    verticalLineColor = DEFAULT_PROPS.verticalLineColor,
    verticalLineHeight = DEFAULT_PROPS.verticalLineHeight,
    verticalLineWidth = DEFAULT_PROPS.verticalLineWidth,
    horizontalLineColor = DEFAULT_PROPS.horizontalLineColor,
    horizontalLineHeight = DEFAULT_PROPS.horizontalLineHeight,
    steps = DEFAULT_PROPS.steps,
    labels = DEFAULT_PROPS.labels,
    labelSize = DEFAULT_PROPS.labelSize,
    ellipsisLabelWidth = DEFAULT_PROPS.ellipsisLabelWidth,
    initialIndex = DEFAULT_PROPS.initialIndex,
    pointerBoundary = DEFAULT_PROPS.pointerBoundary,
    className = DEFAULT_PROPS.className,
    'aria-label': ariaLabel = DEFAULT_PROPS['aria-label']
  } = props;

  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

  /** Function */
  const getStepPosition = useCallback((index: number) => {
    return (index / (steps - 1)) * 100;
  }, [steps]);

  const handleStepClick = useCallback((index: number) => {
    setCurrentIndex(index);
    onChange(index);
  }, [onChange]);

  /** Render */
  return (
    <div
      className={`slider-container ${className}`}
      style={{ position: "relative", height: "auto" }}
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={steps - 1}
      aria-valuenow={currentIndex}
      aria-valuetext={labels[currentIndex] || `Step ${currentIndex + 1}`}
    >
      {/* 수평, 수직 라인 */}
      <div
        className="slider-horizontal-line"
        style={{
          position: "relative",
          width: "100%",
          height: `${horizontalLineHeight}px`,
          backgroundColor: horizontalLineColor,
        }}
      >
        {Array.from({ length: steps }, (_, i) => i).map((_, index) => {
          const position = getStepPosition(index);

          return (
            <div
              key={index}
              className="slider-step"
              style={{
                position: "absolute",
                top: "0%",
                left: `${position}%`,
                transform: "translate(-50%, -50%)",
                padding: `${pointerBoundary}px`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={() => handleStepClick(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleStepClick(index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Go to step ${index + 1}${labels[index] ? `: ${labels[index]}` : ''}`}
            >
              <div className="slider-step-content" style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `translate(-50%, -50%)`,
                    height: `${verticalLineHeight}px`,
                    backgroundColor: verticalLineColor,
                    width: `${verticalLineWidth}px`,
                  }}
                />
                <p
                  className="step-label"
                  title={labels[index]}
                  style={{
                    position: "absolute",
                    top: `${verticalLineHeight / 2 + 8}px`,
                    left: "50%",
                    transform: "translate(-50%, 0)",
                    fontSize: `${labelSize}px`,
                    width: `${ellipsisLabelWidth}px`,
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textAlign: "center",
                  }}
                >
                  {labels[index]}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 움직이는 원 */}
      {currentIndex !== null && (
        <div
          className="slider-dot"
          style={{
            position: "absolute",
            top: "50%",
            left: `${getStepPosition(currentIndex)}%`,
            transform: "translate(-50%, -50%)",
            borderRadius: "100%",
            backgroundColor: dotColor,
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            transition: "all 0.3s ease-in-out",
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
};
