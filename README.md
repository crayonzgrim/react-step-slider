# React Step Slider

`ReactStepSlider` is a step-based slider component that allows users to navigate through steps with customizable styling and full accessibility support.

## Installation

Install the package using npm or yarn

```bash
npm install react-step-slider

yarn add react-step-slider
```

## Usage

```typescript
import { ReactStepSlider } from "react-step-slider";

function App() {
  const handleStepChange = (value: number) => {
    console.log("Current step:", value);
  };

  return (
    <ReactStepSlider
      steps={8}
      onChange={handleStepChange}
      dotColor="red"
      dotSize={12}
      verticalLineColor="#0F0F"
      verticalLineHeight={25}
      verticalLineWidth={3}
      horizontalLineHeight={3}
      horizontalLineColor="#C0FF"
      labels={[
        "first label",
        "second label hello world",
        "third label",
        "fourth label",
        "fifth label",
      ]}
      labelSize={16}
      ellipsisLabelWidth={110}
      initialIndex={0}
      pointerBoundary={8}
      className="custom-slider"
      aria-label="Navigation steps"
    />
  );
}

export default App;
```

## Props

| Prop                 | Type                     | Required | Default      | Description                                          |
| -------------------- | ------------------------ | -------- | ------------ | ---------------------------------------------------- |
| onChange             | (value: number) => void  | ✅       | -            | Callback function triggered on step change          |
| steps                | number                   | ✅       | -            | Number of steps in the slider                        |
| dotColor             | string                   | ❌       | #0000ff      | Color of the moving dot                              |
| dotSize              | number                   | ❌       | 12           | Size of the moving dot in pixels                     |
| verticalLineColor    | string                   | ❌       | #0000ff      | Color of the vertical lines                          |
| verticalLineHeight   | number                   | ❌       | 16           | Height of the vertical lines in pixels               |
| verticalLineWidth    | number                   | ❌       | 2            | Width of the vertical lines in pixels                |
| horizontalLineColor  | string                   | ❌       | #0000ff      | Color of the horizontal line                         |
| horizontalLineHeight | number                   | ❌       | 2            | Height of the horizontal line in pixels              |
| labels               | Array<string>            | ❌       | []           | Array of labels for each step                        |
| labelSize            | number                   | ❌       | 16           | Font size of label text in pixels                    |
| ellipsisLabelWidth   | number                   | ❌       | 20           | Width of label container in pixels                   |
| initialIndex         | number                   | ❌       | 0            | Initial step index (0-based)                         |
| pointerBoundary      | number                   | ❌       | 8            | Padding around clickable area in pixels              |
| className            | string                   | ❌       | ""           | Additional CSS class names                           |
| aria-label           | string                   | ❌       | "Step slider"| Accessible label for screen readers                 |

## Features

- ✅ **Accessible**: Full keyboard navigation support with proper ARIA attributes
- ✅ **Customizable**: Extensive styling options for colors, sizes, and layout
- ✅ **Typescript**: Full Typescript support with proper type definitions
- ✅ **Responsive**: Works well on different screen sizes
- ✅ **Lightweight**: Minimal dependencies and optimized performance
- ✅ **Testing**: Comprehensive test coverage with Jest and React Testing Library

## Accessibility Features

- **Keyboard Navigation**: Navigate using Tab, Enter, and Space keys
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators and logical tab order
- **Semantic HTML**: Uses proper button and slider roles

## Advanced Examples

### Basic Usage

```typescript
import { ReactStepSlider } from "react-step-slider";

function BasicExample() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <ReactStepSlider
      steps={5}
      onChange={setCurrentStep}
      initialIndex={currentStep}
    />
  );
}
```

### Custom Styling

```typescript
function CustomStyledExample() {
  const [step, setStep] = useState(0);

  return (
    <ReactStepSlider
      steps={7}
      onChange={setStep}
      dotColor="#ff4444"
      dotSize={16}
      verticalLineColor="#333"
      verticalLineHeight={20}
      verticalLineWidth={3}
      horizontalLineColor="#ddd"
      horizontalLineHeight={4}
      labelSize={14}
      ellipsisLabelWidth={120}
      pointerBoundary={12}
      className="my-custom-slider"
      labels={[
        "Start",
        "Profile Setup",
        "Preferences",
        "Payment",
        "Confirmation",
        "Complete",
        "Finish"
      ]}
    />
  );
}
```

### With Labels and Accessibility

```typescript
function AccessibleExample() {
  const [step, setStep] = useState(0);
  const steps = ["Personal Info", "Address", "Payment", "Review", "Complete"];

  return (
    <div>
      <h2>Registration Process</h2>
      <ReactStepSlider
        steps={steps.length}
        onChange={setStep}
        initialIndex={step}
        labels={steps}
        labelSize={12}
        ellipsisLabelWidth={100}
        aria-label="Registration progress"
      />
      <p>Current step: {steps[step]}</p>
    </div>
  );
}
```

## Development

To run the project locally:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build the library
npm run build-tsup

# Lint code
npm run lint
```

## License

MIT © crayonzgrim
