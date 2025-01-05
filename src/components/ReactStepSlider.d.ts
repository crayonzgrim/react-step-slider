import { FC } from "react";

export type ReactStepSliderProps = {
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
  width?: string;
};

export declare const ReactStepSlider: FC<ReactStepSliderProps>;
