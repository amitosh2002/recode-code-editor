import React, { useState } from "react";
import styled from "styled-components";
import { LANGUAGE_VERSIONS } from "../EditorComponent/Language";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLanguage } from "../Redux/Slices/EditiorSlice";

const LanguageButton = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const currentSelectedLanguage = useSelector(
    (state) => state.editor.currentLanguage
  );

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <DropdownWrapper>
      <div
        className="select"
        onClick={toggleDropdown}
        aria-expanded={isDropdownOpen}
        aria-label="Select Language"
      >
        <div className="selected">
          {currentSelectedLanguage || "Select Language"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
            className={`arrow ${isDropdownOpen ? "open" : ""}`}
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
          </svg>
        </div>
        {isDropdownOpen && (
          <div className="options">
            {LANGUAGE_VERSIONS &&
            Object.entries(LANGUAGE_VERSIONS).length > 0 ? (
              Object.entries(LANGUAGE_VERSIONS).map(
                ([language, version], index) => (
                  <div
                    key={`${language}-${index}`}
                    className="option"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(setCurrentLanguage(language)); // Dispatch the language string directly
                      setDropdownOpen(false);
                      console.log(language); // Log the selected language for debugging
                    }}
                    title={language}
                  >
                    {language} - {version}
                  </div>
                )
              )
            ) : (
              <div className="option">No Languages Available</div>
            )}
          </div>
        )}
      </div>
    </DropdownWrapper>
  );
};

export default LanguageButton;

const DropdownWrapper = styled.div`
  .select {
    width: fit-content;
    cursor: pointer;
    position: relative;
    color: white;
  }

  .selected {
    background-color: #2a2f3b;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    transition: border 300ms;
  }

  .selected:hover {
    border: 1px solid #4a90e2;
  }

  .arrow {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    fill: white;
    transition: transform 300ms;
  }

  .arrow.open {
    transform: rotate(180deg);
  }

  .options {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 5px;
    background-color: #2a2f3b;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  }

  .option {
    padding: 10px;
    transition: background-color 300ms;
    background-color: #2a2f3b;
    font-size: 15px;
    color: white;
    border-radius: 5px;
  }

  .option:hover {
    background-color: #323741;
  }
`;
// ---

// Let me know if you need further adjustments or explanations!
