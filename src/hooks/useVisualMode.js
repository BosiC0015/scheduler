import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) { 
    setMode(mode);
    if (!replace) {
      let newHistory = history;
      newHistory.push(mode);
      setHistory(newHistory);
    }
  }

  function back() {
    let newHistory = history;
    newHistory.pop();
    setHistory(newHistory);
    setMode(history[history.length - 1]);
    if (history.length <= 1) {
      setMode(initial)
    }
  }

  return { mode, transition, back };
}