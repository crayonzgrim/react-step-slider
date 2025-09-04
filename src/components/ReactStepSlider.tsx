import { CSSProperties, useMemo } from "react";
import { useStepSlider } from "../hooks/useStepSlider";

/**
 * Color type validation - accepts hex colors or CSS color names
 */
type Color = `#${string}` | string;

/**
 * Props type definition for ReactStepSlider component
 * 
 * @interface ReactStepSliderProps
 */
type ReactStepSliderProps = {
  /** Callback function called when step changes */
  onChange: (value: number) => void;
  /** Total number of steps (must be >= 1) */
  steps: number;
  /** Color for the moving dot (default: #0000ff) */
  dotColor?: Color;
  /** Size of the moving dot in pixels (default: 12) */
  dotSize?: number;
  /** Color for vertical step lines (default: #0000ff) */
  verticalLineColor?: Color;
  /** Height of vertical step lines in pixels (default: 16) */
  verticalLineHeight?: number;
  /** Width of vertical step lines in pixels (default: 2) */
  verticalLineWidth?: number;
  /** Color for horizontal connecting line (default: #0000ff) */
  horizontalLineColor?: Color;
  /** Height of horizontal connecting line in pixels (default: 2) */
  horizontalLineHeight?: number;
  /** Optional labels for each step */
  labels?: readonly string[];
  /** Font size for labels in pixels (default: 16) */
  labelSize?: number;
  /** Color for label text (default: #000000) */
  labelColor?: Color;
  /** Width for label container with ellipsis overflow (default: 20) */
  ellipsisLabelWidth?: number;
  /** Initial step index (0-based, must be within steps range) */
  initialIndex?: number;
  /** Padding around clickable area in pixels (default: 8) */
  pointerBoundary?: number;
  /** Animation duration for dot transition in seconds (default: 0.3) */
  transitionDuration?: number;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles for the container */
  style?: CSSProperties;
  /** Accessible label for screen readers */
  'aria-label'?: string;
};

/**
 * Validates props and throws appropriate errors
 * @param props - Component props to validate
 */
const validateProps = (props: ReactStepSliderProps): void => {
  const { steps, initialIndex } = props;

  if (steps < 1) {
    throw new Error('ReactStepSlider: steps must be at least 1');
  }

  if (initialIndex !== undefined && (initialIndex < 0 || initialIndex >= steps)) {
    throw new Error(`ReactStepSlider: initialIndex (${initialIndex}) must be between 0 and ${steps - 1}`);
  }
};

/**
 * ReactStepSlider - A customizable step slider component with full accessibility support
 * 
 * Features:
 * - Keyboard navigation (Tab, Enter, Space, Arrow keys)
 * - ARIA compliance for screen readers
 * - Customizable styling with inline styles (no CSS dependencies)
 * - Performance optimized with React hooks (useCallback, useMemo)
 * - TypeScript support with comprehensive prop validation
 * 
 * @param props - ReactStepSliderProps
 * @returns JSX.Element
 */
export const ReactStepSlider = (props: ReactStepSliderProps) => {
  // Validate props early to catch configuration errors
  validateProps(props);
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
    labelColor = "#000000",
    ellipsisLabelWidth = 20,
    initialIndex = 0,
    pointerBoundary = 8,
    transitionDuration = 0.3,
    className = "",
    style,
    'aria-label': ariaLabel = "Step slider"
  } = props;

  // Use custom hook for step slider logic
  const { currentIndex, getStepPosition, handleStepClick, stepIndices } = useStepSlider(
    steps,
    initialIndex,
    onChange
  );

  // Memoized style objects to prevent unnecessary re-renders
  // This optimization ensures styles are only recalculated when dependencies change
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
      color: labelColor,
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
      transition: `all ${transitionDuration}s ease-in-out`,
      zIndex: 1,
    }
  }), [
    horizontalLineHeight,
    horizontalLineColor,
    pointerBoundary,
    verticalLineHeight,
    verticalLineColor,
    verticalLineWidth,
    labelSize,
    labelColor,
    ellipsisLabelWidth,
    dotColor,
    dotSize,
    transitionDuration
  ]);

  return (
    <div
      className={`slider-container ${className}`}
      style={{ ...baseStyles.container, ...style }}
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
                // Enhanced keyboard accessibility with proper event handling
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleStepClick(index);
                }
                // Add arrow key navigation for better UX
                if (e.key === 'ArrowLeft' && index > 0) {
                  e.preventDefault();
                  handleStepClick(index - 1);
                }
                if (e.key === 'ArrowRight' && index < steps - 1) {
                  e.preventDefault();
                  handleStepClick(index + 1);
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
