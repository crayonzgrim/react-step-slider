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
      <div style={{ width: "50%" }}>
        <ReactStepSlider
          steps={5}
          onChange={() => {}}
          dotColor={"red"}
          dotSize={12}
          verticalLineColor="#323232"
          verticalLineHeight={20}
          verticalLineWidth={2}
          horizontalLineHeight={2}
          labels={["11", "22", "33", "44", "55"]}
          labelSize={12}
        />
      </div>
    </div>
  );
}

export default App;
