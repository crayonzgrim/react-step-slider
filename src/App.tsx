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
          onChange={() => { }}
          dotColor={"green"}
          dotSize={12}
          verticalLineColor="#ff0000"
          verticalLineHeight={25}
          verticalLineWidth={3}
          horizontalLineHeight={3}
          horizontalLineColor={"yellow"}
          labels={[
            "First Label",
            "Second Label hello world",
            "This is Third Label",
            "Fourth Label",
          ]}
          labelSize={16}
          ellipsisLabelWidth={110}
        />
      </div>
    </div>
  );
}

export default App;
