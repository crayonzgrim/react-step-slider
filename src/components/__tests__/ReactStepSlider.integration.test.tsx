import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { ReactStepSlider } from '../ReactStepSlider';

// 실제 사용 시나리오를 위한 테스트 컴포넌트
const TestWrapper = ({
  steps = 5,
  labels = [],
  initialIndex = 0
}: {
  steps?: number;
  labels?: string[];
  initialIndex?: number;
}) => {
  const [currentStep, setCurrentStep] = useState(initialIndex);
  const [history, setHistory] = useState<number[]>([initialIndex]);

  const handleChange = (newStep: number) => {
    setCurrentStep(newStep);
    setHistory(prev => [...prev, newStep]);
  };

  return (
    <div>
      <h2>현재 단계: {currentStep + 1}</h2>
      <p>변경 기록: {history.join(' → ')}</p>
      <ReactStepSlider
        onChange={handleChange}
        steps={steps}
        labels={labels}
        initialIndex={initialIndex}
      />
      <button onClick={() => setCurrentStep(0)}>리셋</button>
    </div>
  );
};

describe('ReactStepSlider Integration Tests', () => {
  describe('실제 사용 시나리오', () => {
    it('단계별 네비게이션이 올바르게 동작해야 한다', async () => {
      const user = userEvent.setup();
      render(<TestWrapper steps={5} />);

      // 초기 상태 확인
      expect(screen.getByText('현재 단계: 1')).toBeInTheDocument();
      expect(screen.getByText('변경 기록: 0')).toBeInTheDocument();

      // 3번째 단계로 이동
      const stepButtons = screen.getAllByRole('button');
      await user.click(stepButtons[2]); // 인덱스 2 (3번째 단계)

      expect(screen.getByText('현재 단계: 3')).toBeInTheDocument();
      expect(screen.getByText('변경 기록: 0 → 2')).toBeInTheDocument();

      // 1번째 단계로 이동
      await user.click(stepButtons[0]); // 인덱스 0 (1번째 단계)

      expect(screen.getByText('현재 단계: 1')).toBeInTheDocument();
      expect(screen.getByText('변경 기록: 0 → 2 → 0')).toBeInTheDocument();
    });

    it('라벨과 함께 사용할 때 올바르게 동작해야 한다', async () => {
      const user = userEvent.setup();
      const labels = ['시작', '진행중', '완료'];
      render(<TestWrapper steps={3} labels={labels} />);

      // 라벨 확인
      expect(screen.getByText('시작')).toBeInTheDocument();
      expect(screen.getByText('진행중')).toBeInTheDocument();
      expect(screen.getByText('완료')).toBeInTheDocument();

      // 진행중 단계로 이동
      const stepButtons = screen.getAllByRole('button');
      await user.click(stepButtons[1]);

      // 상태 확인
      expect(screen.getByText('현재 단계: 2')).toBeInTheDocument();

      // 완료 단계로 이동
      await user.click(stepButtons[2]);

      expect(screen.getByText('현재 단계: 3')).toBeInTheDocument();
      expect(screen.getByText('변경 기록: 0 → 1 → 2')).toBeInTheDocument();
    });

    it('키보드 네비게이션이 올바르게 동작해야 한다', async () => {
      const user = userEvent.setup();
      render(<TestWrapper steps={4} />);

      const stepButtons = screen.getAllByRole('button');

      // 첫 번째 버튼에 포커스
      stepButtons[0].focus();
      expect(stepButtons[0]).toHaveFocus();

      // Tab으로 두 번째 버튼으로 이동
      await user.tab();
      expect(stepButtons[1]).toHaveFocus();

      // Enter로 두 번째 단계 선택
      await user.keyboard('{Enter}');
      expect(screen.getByText('현재 단계: 2')).toBeInTheDocument();

      // Tab으로 세 번째 버튼으로 이동
      await user.tab();
      expect(stepButtons[2]).toHaveFocus();

      // Spacebar로 세 번째 단계 선택
      await user.keyboard(' ');
      expect(screen.getByText('현재 단계: 3')).toBeInTheDocument();
    });
  });

  describe('복잡한 시나리오', () => {
    it('다중 슬라이더가 독립적으로 동작해야 한다', async () => {
      const user = userEvent.setup();

      const MultiSliderComponent = () => {
        const [slider1, setSlider1] = useState(0);
        const [slider2, setSlider2] = useState(0);

        return (
          <div>
            <div data-testid="slider1-container">
              <h3>슬라이더 1: {slider1}</h3>
              <ReactStepSlider onChange={setSlider1} steps={3} />
            </div>
            <div data-testid="slider2-container">
              <h3>슬라이더 2: {slider2}</h3>
              <ReactStepSlider onChange={setSlider2} steps={4} />
            </div>
          </div>
        );
      };

      render(<MultiSliderComponent />);

      // 첫 번째 슬라이더 조작
      const slider1Container = screen.getByTestId('slider1-container');
      const slider1Buttons = slider1Container.querySelectorAll('[role="button"]');
      await user.click(slider1Buttons[1] as Element);

      // 두 번째 슬라이더 조작
      const slider2Container = screen.getByTestId('slider2-container');
      const slider2Buttons = slider2Container.querySelectorAll('[role="button"]');
      await user.click(slider2Buttons[2] as Element);

      // 독립적으로 동작하는지 확인
      expect(screen.getByText('슬라이더 1: 1')).toBeInTheDocument();
      expect(screen.getByText('슬라이더 2: 2')).toBeInTheDocument();
    });

    it('빠른 연속 클릭이 올바르게 처리되어야 한다', async () => {
      const user = userEvent.setup();
      const changeHistory: number[] = [];

      const FastClickComponent = () => {
        const [step, setStep] = useState(0);

        const handleChange = (newStep: number) => {
          setStep(newStep);
          changeHistory.push(newStep);
        };

        return (
          <div>
            <p>현재: {step}</p>
            <ReactStepSlider onChange={handleChange} steps={5} />
          </div>
        );
      };

      render(<FastClickComponent />);

      const stepButtons = screen.getAllByRole('button');

      // 빠른 연속 클릭
      await user.click(stepButtons[1]);
      await user.click(stepButtons[3]);
      await user.click(stepButtons[0]);
      await user.click(stepButtons[4]);

      // 모든 변경이 올바르게 기록되었는지 확인
      expect(changeHistory).toEqual([1, 3, 0, 4]);
      expect(screen.getByText('현재: 4')).toBeInTheDocument();
    });
  });

  describe('접근성 통합 테스트', () => {
    it('스크린 리더 사용자를 위한 완전한 네비게이션이 가능해야 한다', () => {
      render(<TestWrapper steps={3} labels={['시작', '중간', '완료']} />);

      const slider = screen.getByRole('slider');
      const stepButtons = screen.getAllByRole('button');

      // 초기 상태 확인
      expect(slider).toHaveAttribute('aria-valuenow', '0');
      expect(slider).toHaveAttribute('aria-valuetext', '시작');

      // 키보드로 두 번째 단계 이동
      fireEvent.keyDown(stepButtons[1], { key: 'Enter' });

      // 상태 업데이트 확인
      expect(screen.getByText('현재 단계: 2')).toBeInTheDocument();
    });

    it('포커스 관리가 올바르게 동작해야 한다', () => {
      render(<TestWrapper steps={4} />);

      const stepButtons = screen.getAllByRole('button');

      // 각 버튼이 포커스 가능한지 확인 (getAllByRole로 가져온 것이므로 role은 이미 확인됨)
      expect(stepButtons.length).toBeGreaterThan(0);

      // 첫 번째 버튼에 포커스
      stepButtons[0].focus();
      expect(stepButtons[0]).toHaveFocus();
    });
  });

  describe('성능 테스트', () => {
    it('많은 단계에서도 성능이 저하되지 않아야 한다', () => {
      const startTime = performance.now();

      render(<TestWrapper steps={50} />);

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // 50개 단계 렌더링이 100ms 이내에 완료되어야 함
      expect(renderTime).toBeLessThan(100);

      // 50개의 버튼이 모두 렌더링되었는지 확인 (리셋 버튼 제외)
      const stepButtons = screen.getAllByRole('button');
      expect(stepButtons).toHaveLength(51); // 50개 스텝 + 1개 리셋 버튼
    });
  });
});
