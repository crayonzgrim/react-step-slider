import React, { useCallback, useState } from "react";
import { ReactStepSlider } from "./components/ReactStepSlider";

const ONBOARDING_STEPS = [
  'Personal Info',
  'Account Setup',
  'Preferences',
  'Payment Method',
  'Review & Confirm',
  'Welcome'
] as const;

const useOnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set([0]));
  const [stepData, setStepData] = useState<Record<number, unknown>>({});

  const handleStepChange = useCallback((stepIndex: number) => {
    setCurrentStep(stepIndex);
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
  }, []);

  const isStepAccessible = useCallback((stepIndex: number) => {
    return completedSteps.has(stepIndex) || stepIndex <= Math.max(...completedSteps) + 1;
  }, [completedSteps]);

  return {
    currentStep,
    completedSteps,
    stepData,
    handleStepChange,
    isStepAccessible,
    setStepData
  };
};

function App() {
  const { currentStep, handleStepChange, } = useOnboardingFlow();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10rem",
      }}
    >
      {/* Normal case : Multi-step slider */}
      <div style={{ width: "90%", maxWidth: "800px" }}>
        <h2 style={{ marginBottom: 30 }}>User Onboarding Process</h2>
        <ReactStepSlider
          steps={ONBOARDING_STEPS.length}
          onChange={handleStepChange}
          initialIndex={currentStep}
          labels={ONBOARDING_STEPS}
          labelColor="#004d00"
          dotColor="blue"
          dotSize={14}
          verticalLineColor="dodgerblue"
          verticalLineHeight={20}
          verticalLineWidth={2}
          horizontalLineColor="#00ecef"
          horizontalLineHeight={2}
          labelSize={14}
          ellipsisLabelWidth={120}
          transitionDuration={0.5}
          aria-label="Onboarding progress"
        />
      </div>

      {/* Edge Case : Single Step */}
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <h4 style={{ marginBottom: 10 }}>Single Step Example</h4>
        <ReactStepSlider
          steps={1}
          onChange={() => console.log('Single step clicked')}
          labels={['Complete']}
          dotColor="gray"
          labelColor="#FFFFFF"
          aria-label="Single step indicator"
          ellipsisLabelWidth={100}
          transitionDuration={0.1}
          style={{
            border: '2px dashed red',
            backgroundColor: '#333333',
            padding: '40px',
            borderRadius: '8px'
          }}
        />
      </div>
    </div>
  );
}

export default App;
