import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import "./App.css";

const data = [
  { option: "100", value: 100, style: { backgroundColor: "#008E97" } },
  { option: "200", value: 200, style: { backgroundColor: "#4BFF36" } },
  { option: "300", value: 300, style: { backgroundColor: "#8921C2" } },
  { option: "400", value: 400, style: { backgroundColor: "#35C4F8" } },
  { option: "500", value: 500, style: { backgroundColor: "#FEE123" } },
  {
    option: "600",
    value: 600,
    style: { backgroundColor: "#97233F", textColor: "#fff" },
  },
  {
    option: "700",
    value: 700,
    style: { backgroundColor: "#4F2683", textColor: "#fff" },
  },
  {
    option: "800",
    value: 800,
    style: { backgroundColor: "#003262", textColor: "#fff" },
  },
  {
    option: "900",
    value: 900,
    style: { backgroundColor: "#154733", textColor: "#fff" },
  },
  {
    option: "1000",
    value: 1000,
    style: { backgroundColor: "#A2AAAD" },
  },
  {
    option: "2000",
    value: 2000,
    style: { backgroundColor: "#B3995D" },
  },
  { option: "💣", value: 0, style: { backgroundColor: "#000" } },
  {
    option: "3000",
    value: 3000,
    style: { backgroundColor: "#9F792C" },
  },
];

const initialScores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const teams = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const App = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [scores, setScores] = useState(initialScores);
  const [activeIndex, setActiveIndex] = useState(0);
  const [teamCount, setTeamCount] = useState(2);
  const [openEdit, setOpenEdit] = useState<number | null>(null);

  const addScoreToIndex = ({
    index,
    score,
  }: {
    index: number;
    score: number;
  }) => {
    const newScores = [...scores];
    if (score) {
      newScores[index] = scores[index] + score;
    } else {
      newScores[index] = 0;
    }
    setScores(newScores);
  };

  const handleTeamSpin = (index: number) => {
    setActiveIndex(index);
    handleSpinClick();
  };

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const handleStop = () => {
    addScoreToIndex({ index: activeIndex, score: data[prizeNumber].value });
    setMustSpin(false);
  };

  const handleReset = () => {
    setScores(initialScores);
  };

  const handleTeamSelect = (e) => {
    setTeamCount(e.target.value);
    handleReset();
  };

  const updateTeamScore = (e) => {
    const newScore = e.get("newScore");
    const newScores = [...scores];
    if (openEdit !== null) {
      newScores[openEdit] = Number(newScore);
      setScores(newScores);
    }
    setOpenEdit(null);
  };

  return (
    <div className="App">
      <header className="App-header">Randy's Wheel of Fortune</header>
      <div className="row">
        <div className="column">
          {teams.map((team, i) => {
            if (teamCount <= i) return null;
            return (
              <div className="row team-row" key={team}>
                <button
                  className="team-button"
                  onClick={() => handleTeamSpin(i)}
                >{`Team ${team}`}</button>
                <span className="team-score">{scores[i]}</span>
                <button onClick={() => setOpenEdit(i)} className="edit-button">
                  ✎
                </button>
              </div>
            );
          })}
        </div>
        {openEdit !== null ? (
          <div className="modal">
            <p>{`Enter Team ${openEdit + 1} Score`}</p>
            <form action={updateTeamScore}>
              <input name="newScore" type="number" />
              <button>Submit</button>
              <button onClick={() => setOpenEdit(null)}>✕</button>
            </form>
          </div>
        ) : null}
        <div className="wheel-row">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={handleStop}
          />
        </div>
      </div>
      <div className="control-row">
        <button onClick={handleReset}>Reset</button>
        <div className="team-select">
          <span>How Many Teams?</span>
          <select onChange={handleTeamSelect}>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default App;
