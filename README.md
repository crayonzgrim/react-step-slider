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
      steps={8}
      onChange={() => {}}
      dotColor={"red"}
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
    />
  );
}

export default App;
```

## Props

| Prop                 | Type                     | Default  | Description                                |
| -------------------- | ------------------------ | -------- | ------------------------------------------ |
| steps                | string                   | 5        | Number of steps in the slider              |
| onChange             | (value: number) => void2 | Required | Callback function triggered on step change |
| dotColor             | string                   | #0000FF  | Color of the moving dot                    |
| verticalLineColor    | string                   | #0000FF  | Color of the vertical lines                |
| verticalLineHeight   | string                   | 16px     | Height of the vertical lines               |
| verticalLineWidth    | number                   | 3        | Width of the vertical lines                |
| horizontalLineHeight | string                   | 2px      | Height of the horizontal line              |
| horizontalLineColor  | string                   | #0000FF  | Color of the horizontal line               |
| labels               | Array<string>            | []       | Array of labels for each step              |
| labelSize            | number                   | 16       | Font Size of label text                    |
| ellipsisLabelWidth   | number                   | 20       | Width of label                             |

## Custom Styling

```typescript
<ReactStepSlider
  steps={8}
  onChange={() => {}}
  dotColor={"red"}
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
/>
```

## License

MIT © crayonzgrim
