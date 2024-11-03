import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import textToSpeech from "../assets/text_to_speech-removebg-preview.png";
import styled from "styled-components";
import { useRef } from "react";
const SpeechRecogination = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const [copied, setCopied] = useState(false);
  const textAreaRef = useRef(null);

  const handleCopy = () => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.select();
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Clear copied state after 2 seconds
    }
  };
  return (
    <Wrapper>
      <div className="container">
        <div className="view">
          <img src={textToSpeech} alt="" width="150px" />
          <h1> Voice to Text Conversion </h1>
          <h3>Microphone: {listening ? "on" : "off"}</h3>
        </div>
        <div className="controls">
          <button onClick={SpeechRecognition.startListening} className="btn">
            Start
          </button>
          <button onClick={SpeechRecognition.stopListening} className="btn">
            Stop
          </button>
          <button onClick={resetTranscript} className="btn">
            Reset
          </button>
          <button onClick={handleCopy} className="btn">
            Copy
          </button>
        </div>
        <textarea
          name="transcript"
          id=" "
          rows={10}
          cols={45}
          value={transcript}
          ref={textAreaRef}
          placeholder="Click on start button to start speech recognition !"
        ></textarea>
        {/* <p>{transcript}</p> */}
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  textarea {
    padding: 10px;
  }
  .view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .controls {
    padding: 8px;
    margin: 12px;
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .btn {
    font-size: 17px;
    background: transparent;
    border: none;
    padding: 1em 1.5em;
    color: #070701;
    text-transform: uppercase;
    position: relative;
    transition: 0.5s ease;
    cursor: pointer;
    height: 50px;
  }

  .btn::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 0;
    background-color: #ffc506;
    transition: 0.5s ease;
  }

  .btn:hover {
    color: #1e1e2b;
    transition-delay: 0.5s;
  }

  .btn:hover::before {
    width: 100%;
  }

  .btn::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 0;
    width: 100%;
    background-color: #ffc506;
    transition: 0.4s ease;
    z-index: -1;
  }

  .btn:hover::after {
    height: 100%;
    transition-delay: 0.2s;
    color: aliceblue;
  }
`;
export default SpeechRecogination;
