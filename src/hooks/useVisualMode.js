import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(nextMode, replace = false) {
    setMode(nextMode);
    if (replace === true) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), nextMode]);
    } else {
      setHistory((prev) => [...prev, nextMode]);
    }
  }

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
}
