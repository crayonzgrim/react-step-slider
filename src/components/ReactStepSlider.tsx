import { useState } from "react";

type ReactStepSliderProps = {
  onChange: (value: number) => void;
  dotColor?: string;
  dotSize?: number;
  verticalLineColor?: string;
  verticalLineHeight?: number;
  verticalLineWidth?: number;
  horizontalLineColor?: string;
  horizontalLineHeight?: number;
  steps: number;
  labels?: Array<string>;
  labelSize?: number;
  ellipsisLabelWidth?: number;
};

export const ReactStepSlider = ({
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
}: ReactStepSliderProps) => {
  /** Property */
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  /** Render */
  return (
    <div
      className="slider-container"
      style={{ position: "relative", height: "auto" }}
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
          const position = (index / (steps - 1)) * 100;

          return (
            <div
              key={index}
              className="slider-step"
              style={{
                position: "absolute",
                top: "0%",
                left: `${position}%`,
                transform: "translate(-50%, -50%)",
                padding: "0 2px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                setCurrentIndex(index);
                onChange(index);
              }}
            >
              <div className="flex flex-col items-center justify-center border border-black relative">
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
                    top: 0,
                    left: "50%",
                    transform: "translate(-50%, 100%)",
                    fontSize: `${labelSize}px`,
                    marginTop: "4px",
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
            left: `${(currentIndex / (steps - 1)) * 100}%`,
            transform: "translate(-50%, -50%)",
            borderRadius: "100%",
            backgroundColor: dotColor,
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            transition: "all 0.3s",
          }}
        />
      )}
    </div>
  );
};
