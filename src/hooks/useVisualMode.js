import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(nextMode, replace = false) {
    setMode(nextMode);
    if (replace === true) {
      setHistory([...history, mode]);
    } else {
      setHistory([...history, nextMode]);
    }
  }
  function back() {
    if (history.length > 1) {
      history.pop();
      //console.log(typeof history, "history");
      //setHistory(history);
      setMode(history[history.length - 1]);
    }
  }
  return { mode, transition, back };
}
