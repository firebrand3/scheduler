import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // console.log("MODE",...mode);
  // console.log("HISTORY",...history);

  const transition = (newMode, replace = false) => {
    if (!replace) {
      setMode(newMode);
      history.push(newMode);
      // setHistory(newMode)
    }
    setMode(newMode);
  };

  const back = () => {
    history.pop();

    if (history.length < 1) {
      return;
    }

    setMode(history[history.length - 1]);
    // setHistory((prev) => [...prev, mode])
  };

  return {
    mode,
    transition,
    back,
  };
}
