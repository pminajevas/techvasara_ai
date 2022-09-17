import React, { useRef, useState } from "react";
import { SketchField, Tools } from "react-sketch";

import { makePrediction } from "./Api";

import "./App.css";

const pixels = (count) => `${count}px`;
const percents = (count) => `${count}%`;

const MAIN_CONTAINER_WIDTH_PX = 200;
const MAIN_CONTAINER_HEIGHT = 100;
const MAIN_CONTAINER_STYLE = {
  width: pixels(MAIN_CONTAINER_WIDTH_PX),
  height: percents(MAIN_CONTAINER_HEIGHT),
  margin: "0 auto",
};

const SKETCH_CONTAINER_STYLE = {
  border: "1px solid black",
  width: pixels(MAIN_CONTAINER_WIDTH_PX - 2),
  height: pixels(MAIN_CONTAINER_WIDTH_PX - 2),
  backgroundColor: "white",
};

const App = () => {
  const sketchRef = useRef(null);
  const [error, setError] = useState();
  const [prediction, setPrediction] = useState();

  const handleSubmit = () => {
    const image = sketchRef.current.toDataURL();

    setPrediction(undefined);
    setError(undefined);

    makePrediction(image).then(setPrediction).catch(setError);
  };

  const handleClear = (e) => sketchRef.current.clear();

  return (
    <div className="App" style={MAIN_CONTAINER_STYLE}>
      <div>
          <h1 className="App-title">Nupieškite numerį ir spauskite spėti</h1>
        <div style={SKETCH_CONTAINER_STYLE}>
          <SketchField
            ref={sketchRef}
            width="100%"
            height="100%"
            tool={Tools.Pencil}
            imageFormat="jpg"
            lineColor="#111"
            lineWidth={10}
          />
        </div>
        {prediction && <h3>Modelis spėja, kad nupiešėtė: {prediction}</h3>}
        <button onClick={handleClear}>Išvalyti</button>
        <button onClick={handleSubmit}>Spėti</button>
        {error && <p style={{ color: "red" }}>Įvyko duomenų perdavimo klaida</p>}
      </div>
    </div>
  );
};

export default App;
