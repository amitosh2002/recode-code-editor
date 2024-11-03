import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import styled from "styled-components";
import { BOILER_PLATE, LANGUAGE_VERSIONS } from "../EditorComponent/Language";
import Output from "./Output";
const EditorBody = () => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  // get the languages from the object
  const languageOption = Object.entries(LANGUAGE_VERSIONS);

  //set the languages as per choices
  const [language, setLanguage] = useState("javascript");
  const [boilerplate, setBoilerPlate] = useState(BOILER_PLATE.javascript);
  const handleLanguageChange = (language) => {
    setLanguage(language);
    setBoilerPlate(BOILER_PLATE[language]);
  };

  return (
    <Wrapper>
      <div className="languageBtn">
        <select
          name="languageOption"
          id="languageOption"
          onChange={(e) => handleLanguageChange(e.target.value)}
        >
          {languageOption.map(([currLanguage, version], key) => {
            return (
              <option value={currLanguage} key={key}>
                {currLanguage}:{version}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <div className="body">
          <Editor
            height="68vh"
            value={boilerplate}
            ref={editorRef}
            onMount={handleEditorDidMount}
            language={language}
            width="800px"
          />
          <Output editorRef={editorRef} language={language} />
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .body {
    display: flex;
    flex-direction: row;
  }
  #languageOption {
    padding: 5px;
    margin: 8px;
    text-size-adjust: "large";
    font-weight: "25px";
    border-radius: 15px;
  }
`;

export default EditorBody;
