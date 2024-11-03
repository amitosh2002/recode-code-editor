import React, { useState } from "react";
import styled from "styled-components";
import Tesseract from "tesseract.js";
import { createWorker } from "tesseract.js";
const ImgTxt = () => {
  const [result, setResult] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    if (selectedFile) {
      // Store the file in local storage
      localStorage.setItem("uploadedFile", selectedFile);
    }
  };

  async function recognizeText() {
    try {
      const worker = await Tesseract.createWorker();

      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");

      // Ensure that imageFile is not null

      if (selectedFile) {
        const { data } = await worker.recognize(selectedFile);
        console.log(data.text);
        const result = data.text;
        setResult(data.text);
        setUploaded(true);
      } else {
        console.error("imageFile is null");
      }

      await worker.terminate();
    } catch (error) {
      console.error("Error recognizing text:", error);
    }
  }

  return (
    // <Wrapper>
    <div className="body">
      {!uploaded ? (
        <Wrapper>
          <div className="uploadBody">
            <div class="file-upload-container">
              <div class="file-upload">
                <input
                  multiple=""
                  class="file-input"
                  id="fileInput"
                  type="file"
                  onChange={handleFileChange}
                />
                <label class="file-label" for="fileInput">
                  <i class="upload-icon">📁</i>
                  {/* <p>Drag &amp; Drop your files here or click to upload</p> */}
                  <p>click to upload files here</p>
                </label>
              </div>
            </div>
            <button class="cssbuttons-io" onClick={recognizeText}>
              <span>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
                    fill="currentColor"
                  ></path>
                </svg>
                CONVERT!
              </span>
            </button>
          </div>
        </Wrapper>
      ) : (
        <Output>
          <OutputWrapper>
            <figure>
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Uploaded Preview"
                style={{
                  maxWidth: "200px",
                  height: "auto",
                  position: "center",
                }}
              />
              <figcaption>{selectedFile.name}</figcaption>
            </figure>
            <textarea
              name="output"
              id="output"
              placeholder="Upload File to use this feature!"
              value={result}
              rows={10}
              cols={55}
            ></textarea>
            <ButtonContainer>
              <button
                onClick={() => {
                  setUploaded(false);
                  selectedFile(null);
                }}
              >
                Convert Another{" "}
              </button>
              <button>Copy</button>
            </ButtonContainer>
          </OutputWrapper>
        </Output>
        // <p>{selectedFile.name}</p>
      )}
    </div>
  );
};
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const OutputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  figure {
    padding: 10px;
    margin: 10px;
    border: 2px solid black;
    border-radius: 5px;
  }
  figcaption {
    position: relative;
    padding: 5px;
    border-radius: 10px;
    top: 0;
    left: 0;
  }
  button {
    padding: 5px;
    margin: 10px;
    border-radius: 10px;
    width: 65px;
  }
  button:hover {
    background-color: #e48d14e4;
    border-color: azure;
  }
`;
const Output = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* margin: 20px auto; */
`;

const Wrapper = styled.div`
  /*************************BUTTON CSS*********************** */

  /* From Uiverse.io by adamgiebl */
  margin: 40px auto;
  .uploadBody {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .cssbuttons-io {
    position: relative;
    font-family: inherit;
    font-weight: 500;
    font-size: 18px;
    letter-spacing: 0.05em;
    border-radius: 0.8em;
    cursor: pointer;
    border: none;
    background: linear-gradient(to right, #8e2de2, #4a00e0);
    color: ghostwhite;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px;
  }

  .cssbuttons-io svg {
    width: 1.2em;
    height: 1.2em;
    margin-right: 0.5em;
  }

  .cssbuttons-io span {
    position: relative;
    z-index: 10;
    transition: color 0.4s;
    display: inline-flex;
    align-items: center;
    padding: 0.8em 1.2em 0.8em 1.05em;
  }

  .cssbuttons-io::before,
  .cssbuttons-io::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .cssbuttons-io::before {
    content: "";
    background: #000;
    width: 120%;
    left: -10%;
    transform: skew(30deg);
    transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
  }

  .cssbuttons-io:hover::before {
    transform: translate3d(100%, 0, 0);
  }

  .cssbuttons-io:active {
    transform: scale(0.95);
  }

  /*************************BUTTON CSS*********************** */

  /* From Uiverse.io by Cksunandh */
  .file-upload-container {
    width: 50%;
    max-width: 500px;
  }

  .file-upload {
    position: relative;
    border: 2px dashed #b8bcbf;
    border-radius: 10px;
    padding: 40px;
    text-align: center;
    background-color: rgb(255, 255, 255);
    transition: background-color 0.3s ease-in-out;
  }

  .file-upload:hover {
    background-color: #e2e6ea;
  }

  .file-input {
    display: none;
  }

  .file-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }

  .upload-icon {
    font-size: 50px;
    color: #007bff;
    margin-bottom: 10px;
  }

  .file-upload p {
    margin: 0;
    font-size: 16px;
    color: #6c757d;
  }

  .file-upload.dragover {
    background-color: #007bff;
    color: white;
  }
`;
export default ImgTxt;
