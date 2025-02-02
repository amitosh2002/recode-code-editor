import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Stopwatch = () => {
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <StopwatchWrapper>
      {/* <header>Code Stopwatch</header> */}
      <div className="time-display">{formatTime(time)}</div>
      <div className="buttons">
        {!isRunning ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handlePause}>Pause</button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
    </StopwatchWrapper>
  );
};

const StopwatchWrapper = styled.div`
  font-family: "Fira Code", monospace;
  background: #1e1e1e;
  color: #dcdcdc;
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  header {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: #61dafb;
    text-shadow: 0 0 5px #61dafb;
  }

  .time-display {
    font-size: 1.8rem;
    background: #282c34;
    border: 2px solid #61dafb;
    border-radius: 5px;
    padding: 10px 20px;
    margin-bottom: 20px;
    color: #61dafb;
    text-shadow: 0 0 5px #61dafb;
    height: 40px;
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 10px;

    button {
      height: 40px;
      background: #61dafb;
      border: none;
      padding: 10px 15px;
      font-size: 1rem;
      color: #1e1e1e;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      transition: transform 0.2s;

      &:hover {
        background: #4cc3ea;
        transform: scale(1.1);
      }

      &:active {
        transform: scale(0.9);
      }
    }
  }
`;

export default Stopwatch;
