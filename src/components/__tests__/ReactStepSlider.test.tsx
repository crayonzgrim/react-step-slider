import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactStepSlider } from '../ReactStepSlider';

describe('ReactStepSlider', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  describe('기본 렌더링', () => {
    it('기본 props로 정상 렌더링되어야 한다', () => {
      render(<ReactStepSlider onChange={mockOnChange} />);

      // 슬라이더 컨테이너가 있는지 확인
      const slider = screen.getByRole('slider');
      expect(slider).toBeInTheDocument();
      expect(slider).toHaveAttribute('aria-label', 'Step slider');
    });

    it('지정된 스텝 수 만큼 스텝이 렌더링되어야 한다', () => {
      render(<ReactStepSlider onChange={mockOnChange} steps={3} />);

      // 3개의 스텝 버튼이 있는지 확인
      const stepButtons = screen.getAllByRole('button');
      expect(stepButtons).toHaveLength(3);
    });

    it('라벨이 있을 때 올바르게 표시되어야 한다', () => {
      const labels = ['시작', '중간', '끝'];
      render(<ReactStepSlider onChange={mockOnChange} steps={3} labels={labels} />);

      // 각 라벨이 표시되는지 확인
      labels.forEach(label => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });
  });

  describe('사용자 상호작용', () => {
    it('스텝 클릭 시 onChange가 호출되어야 한다', async () => {
      const user = userEvent.setup();
      const mockOnChange = jest.fn();

      render(<ReactStepSlider onChange={mockOnChange} steps={5} />);

      // 첫번째 Tab으로 첫 번째 스텝 버튼에 포커스
      await user.tab();
      const stepButtons = screen.getAllByRole('button');
      expect(stepButtons[0]).toHaveFocus();

      // Enter 키 누르기
      await user.keyboard('{Enter}')
      expect(mockOnChange).toHaveBeenCalledWith(0)
    });

    test('Tab 키로 이동 후 Enter 키로 스텝을 선택할 수 있다', () => {
      render(<ReactStepSlider onChange={mockOnChange} steps={5} />);

      const stepButtons = screen.getAllByRole('button');

      // 첫 번째 스텝에 포커스하고 Enter 키 입력
      stepButtons[0].focus();
      fireEvent.keyDown(stepButtons[0], { key: 'Enter' });

      expect(mockOnChange).toHaveBeenCalledWith(0);
    });

    test('Tab 키로 이동 후 Spacebar 키로 스텝을 선택할 수 있다', async () => {
      const user = userEvent.setup();
      const mockOnChange = jest.fn();

      render(<ReactStepSlider onChange={mockOnChange} steps={5} />);

      await user.tab();
      const stepButtons = screen.getAllByRole('button');
      expect(stepButtons[0]).toHaveFocus();

      await user.keyboard(' ');
      expect(mockOnChange).toHaveBeenCalledWith(0);
    });
  });

  describe('접근성', () => {
    it('올바른 ARIA 속성을 가져야 한다', () => {
      render(<ReactStepSlider onChange={mockOnChange} steps={5} initialIndex={2} />);

      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuemin', '0');
      expect(slider).toHaveAttribute('aria-valuemax', '4');
      expect(slider).toHaveAttribute('aria-valuenow', '2');
      expect(slider).toHaveAttribute('aria-valuetext', 'Step 3');
    });

    it('라벨이 있을 때 올바른 aria-valuetext를 가져야 한다', () => {
      const labels = ['시작', '중간', '끝'];
      render(<ReactStepSlider onChange={mockOnChange} steps={3} labels={labels} initialIndex={1} />);

      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuetext', '중간');
    });

    it('스텝 버튼이 올바른 aria-label을 가져야 한다', () => {
      const labels = ['시작', '중간', '끝'];
      render(<ReactStepSlider onChange={mockOnChange} steps={3} labels={labels} />);

      const stepButtons = screen.getAllByRole('button');
      expect(stepButtons[0]).toHaveAttribute('aria-label', 'Go to step 1: 시작');
      expect(stepButtons[1]).toHaveAttribute('aria-label', 'Go to step 2: 중간');
      expect(stepButtons[2]).toHaveAttribute('aria-label', 'Go to step 3: 끝');
    });
  });

  describe('props 검증', () => {
    it('초기 인덱스가 올바르게 설정되어야 한다', () => {
      render(<ReactStepSlider onChange={mockOnChange} steps={5} initialIndex={3} />);

      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuenow', '3');
    });

    it('커스텀 className이 적용되어야 한다', () => {
      const customClass = 'custom-slider';
      render(<ReactStepSlider onChange={mockOnChange} className={customClass} />);

      const slider = screen.getByRole('slider');
      expect(slider).toHaveClass('slider-container', customClass);
    });

    it('커스텀 aria-label이 적용되어야 한다', () => {
      const customAriaLabel = '단계 선택기';
      render(<ReactStepSlider onChange={mockOnChange} aria-label={customAriaLabel} />);

      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-label', customAriaLabel);
    });
  });

  describe('스타일링', () => {
    it('기본 스타일이 적용되어야 한다', () => {
      render(<ReactStepSlider onChange={mockOnChange} />);

      const slider = screen.getByRole('slider');
      expect(slider).toHaveStyle({ position: 'relative' });
    });

    it('커스텀 색상이 적용되어야 한다', () => {
      const customColor = '#ff0000';
      render(<ReactStepSlider onChange={mockOnChange} dotColor={customColor} />);

      // 슬라이더 도트 확인
      const dot = document.querySelector('.slider-dot');
      expect(dot).toHaveStyle({ backgroundColor: customColor });
    });
  });

  describe('엣지 케이스', () => {
    it('단계가 1개일 때도 정상 동작해야 한다', () => {
      render(<ReactStepSlider onChange={mockOnChange} steps={1} />);

      const stepButtons = screen.getAllByRole('button');
      expect(stepButtons).toHaveLength(1);
    });

    it('라벨 배열이 단계 수보다 적을 때 처리되어야 한다', () => {
      render(<ReactStepSlider onChange={mockOnChange} steps={5} labels={['첫번째', '두번째']} />);

      // 처음 두 개는 라벨이 있고, 나머지는 없어야 함
      expect(screen.getByText('첫번째')).toBeInTheDocument();
      expect(screen.getByText('두번째')).toBeInTheDocument();
    });
  });
});
