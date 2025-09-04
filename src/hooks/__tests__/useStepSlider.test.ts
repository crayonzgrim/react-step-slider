import { act, renderHook } from '@testing-library/react';
import { useStepSlider } from '../useStepSlider';

describe('useStepSlider', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
    jest.clearAllMocks();
  });

  describe('초기화', () => {
    it('기본값으로 초기화되어야 한다', () => {
      const { result } = renderHook(() => useStepSlider(5, 0, mockOnChange));

      expect(result.current.currentIndex).toBe(0);
      expect(result.current.stepIndices).toEqual([0, 1, 2, 3, 4]);
    });

    it('초기 인덱스가 설정되어야 한다', () => {
      const { result } = renderHook(() => useStepSlider(5, 2, mockOnChange));

      expect(result.current.currentIndex).toBe(2);
    });
  });

  describe('getStepPosition', () => {
    it('단계가 1개일 때 50을 반환해야 한다', () => {
      const { result } = renderHook(() => useStepSlider(1, 0, mockOnChange));

      expect(result.current.getStepPosition(0)).toBe(50);
    });

    it('여러 단계일 때 올바른 위치를 계산해야 한다', () => {
      const { result } = renderHook(() => useStepSlider(5, 0, mockOnChange));

      expect(result.current.getStepPosition(0)).toBe(0);
      expect(result.current.getStepPosition(2)).toBe(50);
      expect(result.current.getStepPosition(4)).toBe(100);
    });

    it('3단계일 때 올바른 위치를 계산해야 한다', () => {
      const { result } = renderHook(() => useStepSlider(3, 0, mockOnChange));

      expect(result.current.getStepPosition(0)).toBe(0);
      expect(result.current.getStepPosition(1)).toBe(50);
      expect(result.current.getStepPosition(2)).toBe(100);
    });
  });

  describe('handleStepClick', () => {
    it('유효한 인덱스에서 상태를 업데이트하고 onChange를 호출해야 한다', () => {
      const { result } = renderHook(() => useStepSlider(5, 0, mockOnChange));

      act(() => {
        result.current.handleStepClick(3);
      });

      expect(result.current.currentIndex).toBe(3);
      expect(mockOnChange).toHaveBeenCalledWith(3);
    });

    it('음수 인덱스에서 경고를 출력하고 상태를 변경하지 않아야 한다', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });
      const { result } = renderHook(() => useStepSlider(5, 2, mockOnChange));

      act(() => {
        result.current.handleStepClick(-1);
      });

      expect(result.current.currentIndex).toBe(2);
      expect(mockOnChange).not.toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('ReactStepSlider: Attempted to navigate to invalid step -1');

      consoleSpy.mockRestore();
    });

    it('범위를 초과한 인덱스에서 경고를 출력하고 상태를 변경하지 않아야 한다', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });
      const { result } = renderHook(() => useStepSlider(5, 2, mockOnChange));

      act(() => {
        result.current.handleStepClick(5);
      });

      expect(result.current.currentIndex).toBe(2);
      expect(mockOnChange).not.toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('ReactStepSlider: Attempted to navigate to invalid step 5');

      consoleSpy.mockRestore();
    });
  });

  describe('stepIndices', () => {
    it('올바른 인덱스 배열을 생성해야 한다', () => {
      const { result } = renderHook(() => useStepSlider(3, 0, mockOnChange));

      expect(result.current.stepIndices).toEqual([0, 1, 2]);
    });

    it('단계 수가 변경될 때 인덱스 배열이 업데이트되어야 한다', () => {
      const { result, rerender } = renderHook(
        ({ steps }) => useStepSlider(steps, 0, mockOnChange),
        { initialProps: { steps: 3 } }
      );

      expect(result.current.stepIndices).toEqual([0, 1, 2]);

      rerender({ steps: 5 });

      expect(result.current.stepIndices).toEqual([0, 1, 2, 3, 4]);
    });
  });

  describe('메모이제이션', () => {
    it('steps가 동일하면 getStepPosition 함수가 재생성되지 않아야 한다', () => {
      const { result, rerender } = renderHook(() => useStepSlider(5, 0, mockOnChange));

      const firstGetStepPosition = result.current.getStepPosition;

      rerender();

      expect(result.current.getStepPosition).toBe(firstGetStepPosition);
    });

    it('onChange나 steps가 동일하면 handleStepClick 함수가 재생성되지 않아야 한다', () => {
      const { result, rerender } = renderHook(() => useStepSlider(5, 0, mockOnChange));

      const firstHandleStepClick = result.current.handleStepClick;

      rerender();

      expect(result.current.handleStepClick).toBe(firstHandleStepClick);
    });

    it('steps가 동일하면 stepIndices 배열이 재생성되지 않아야 한다', () => {
      const { result, rerender } = renderHook(() => useStepSlider(5, 0, mockOnChange));

      const firstStepIndices = result.current.stepIndices;

      rerender();

      expect(result.current.stepIndices).toBe(firstStepIndices);
    });
  });
});
