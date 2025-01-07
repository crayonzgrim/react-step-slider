import React from "react";
import { ReactStepSlider } from "./components/ReactStepSlider";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "90%" }}>
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
      </div>
    </div>
  );
}

export default App;
