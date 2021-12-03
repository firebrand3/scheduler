import { useState } from "react";

//************************************************************Custom Hook function to set modes for use in Appointment component
export default function useVisualMode(initial) {
  //**********Set initial states
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  //**********Change state with new mode
  const transition = (newMode, replace = false) => {
    if (!replace) {
      history.push(newMode);
    }
    setMode(newMode);
  };
  //**********Change state back to previous mode
  const back = () => {
    history.pop();

    if (history.length < 1) {
      return;
    }

    setMode(history[history.length - 1]);
  };

  return {
    mode,
    transition,
    back,
  };
}
