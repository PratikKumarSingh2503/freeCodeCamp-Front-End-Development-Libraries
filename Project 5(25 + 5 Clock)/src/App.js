import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import beepSound from './assets/beep.mp3'; // Ensure this file is at least 1 second long

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [isRunning, setIsRunning] = useState(false);
  const timerIdRef = useRef(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleReset = () => {
    clearInterval(timerIdRef.current);
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setTimerLabel("Session");
    const beep = document.getElementById('beep');
    beep.pause();
    beep.currentTime = 0;
  };

  useEffect(() => {
    if (timeLeft === 0) {
      const beep = document.getElementById('beep');
      beep.play();
      if (timerLabel === "Session") {
        setTimerLabel("Break");
        setTimeLeft(breakLength * 60);
      } else {
        setTimerLabel("Session");
        setTimeLeft(sessionLength * 60);
      }
    }
  }, [timeLeft, timerLabel, breakLength, sessionLength]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerIdRef.current = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerIdRef.current);
    }
    if (timeLeft === 0) {
      clearInterval(timerIdRef.current);
    }
  }, [isRunning, timeLeft]);

  const handleStartStop = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  const handleBreakDecrement = () => {
    setBreakLength(prevLength => Math.max(prevLength - 1, 1));
  };

  const handleBreakIncrement = () => {
    setBreakLength(prevLength => Math.min(prevLength + 1, 60));
  };

  const handleSessionDecrement = () => {
    setSessionLength(prevLength => {
      const newLength = Math.max(prevLength - 1, 1);
      if (!isRunning) {
        setTimeLeft(newLength * 60);
      }
      return newLength;
    });
  };

  const handleSessionIncrement = () => {
    setSessionLength(prevLength => {
      const newLength = Math.min(prevLength + 1, 60);
      if (!isRunning) {
        setTimeLeft(newLength * 60);
      }
      return newLength;
    });
  };

  return (
    <div className="App">
      <h2>25 + 5 Clock</h2>

      <div id="break-label">
        <h3>Break Length</h3>
        <button id="break-decrement" onClick={handleBreakDecrement}>-</button>
        <span id="break-length">{breakLength}</span>
        <button id="break-increment" onClick={handleBreakIncrement}>+</button>
      </div>

      <div id="session-label">
        <h3>Session Length</h3>
        <button id="session-decrement" onClick={handleSessionDecrement}>-</button>
        <span id="session-length">{sessionLength}</span>
        <button id="session-increment" onClick={handleSessionIncrement}>+</button>
      </div>

      <div id="timer-label">
        <h3>{timerLabel}</h3>
        <div id="time-left">{formatTime(timeLeft)}</div>
      </div>

      <button id="start_stop" onClick={handleStartStop}>{isRunning ? "Pause" : "Start"}</button>
      <button id="reset" onClick={handleReset}>Reset</button>

      <audio id="beep" src={beepSound}></audio> {/* Audio element */}
    </div>
  );
}

export default App;