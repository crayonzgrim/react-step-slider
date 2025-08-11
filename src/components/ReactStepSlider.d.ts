import { FC } from "react";

export type ReactStepSliderProps = {
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

export declare const ReactStepSlider: FC<ReactStepSliderProps>;
