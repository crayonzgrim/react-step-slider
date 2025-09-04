import { useCallback, useMemo, useState } from 'react';

export const useStepSlider = (steps: number, initialIndex: number = 0, onChange: (value: number) => void) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

  const stepIndices = useMemo(
    () => Array.from({ length: steps }, (_, i) => i),
    [steps]
  );

  const getStepPosition = useCallback(
    (index: number): number => {
      if (steps <= 1) return 50;
      return (index / (steps - 1)) * 100;
    },
    [steps]
  );

  const handleStepClick = useCallback(
    (index: number): void => {
      if (index < 0 || index >= steps) {
        console.warn(`ReactStepSlider: Attempted to navigate to invalid step ${index}`);
        return;
      }

      setCurrentIndex(index);
      onChange(index);
    },
    [onChange, steps]
  );


  return {
    currentIndex,
    getStepPosition,
    handleStepClick,
    stepIndices,
  };
};
