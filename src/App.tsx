import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import "./App.css";

const segments = ["fart", "butt", "weiner", "happy", "up your butt"];

const segColors = ["#EE4040", "#F0cf50", "#815cd1", "#3da5e0", "#34a24f"];

const getWinner = (): string => {
  const index = Math.floor(Math.random() * segments.length);
  console.log(index, segments[index]);
  return segments[index];
};

const data = [
  { option: "1", style: { backgroundColor: "#EE4040" } },
  { option: "2", style: { backgroundColor: "#F0cf50" } },
  { option: "3", style: { backgroundColor: "#815cd1" } },
  { option: "4", style: { backgroundColor: "#3da5e0" } },
];

const App = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const toggleSpin = () => {
    setMustSpin((spin) => !spin);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={1}
          data={data}
          onStopSpinning={console.log}
        />
        <button onClick={toggleSpin}>Spin</button>
      </header>
    </div>
  );
};

export default App;
