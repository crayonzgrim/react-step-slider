# React Step Slider

`ReactStepSlider` is a step-based slider component that allows users to navigate through steps with customizable styling.

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
      steps={5}
      onChange={setLineValue}
      dotColor={"red"}
      dotSize={12}
      verticalLineColor="#323232"
      verticalLineHeight={20}
      verticalLineWidth={2}
      horizontalLineHeight={2}
      labels={["11", "22", "33", "44", "55"]}
      labelSize={12}
    />
  );
}

export default App;
```

## Props

| Prop                 | Type                     | Default   | Description                                |
| -------------------- | ------------------------ | --------- | ------------------------------------------ |
| onChange1            | (value: number) => void2 | Required  | Callback function triggered on step change |
| dotColor1            | string                   | #0000FF   | Color of the moving dot                    |
| verticalLineColor    | string                   | #0000FF   | Color of the vertical lines                |
| verticalLineHeight   | string                   | 16px      | Height of the vertical lines               |
| horizontalLineColor  | string                   | #0000FF   | Color of the horizontal line               |
| horizontalLineHeight | string                   | 2px       | Height of the horizontal line              |
| steps                | string                   | 5         | Number of steps in the slider              |
| labels               | string                   | []        | Labels for each step                       |
| width                | string                   | 100%      | Width of the slider                        |
| className            | string                   | undefined | Addional custom class for the slider       |

## Custom Styling

```typescript
<ReactStepSlider
  steps={3}
  labels={["Small", "Medium", "Large"]}
  dotColor="#ff5733"
  verticalLineColor="#2ecc71"
  horizontalLineColor="#3498db"
  verticalLineHeight="20px"
  horizontalLineHeight="4px"
  width="300px"
/>
```

## License

MIT © crayonzgrim
