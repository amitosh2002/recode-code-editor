import React from "react";
import { FaDownload } from "react-icons/fa6";
import styled from "styled-components";
import { RiVoiceprintLine } from "react-icons/ri";
import { SiConvertio } from "react-icons/si";
import { IoIosSwitch } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import { FaHome } from "react-icons/fa";
import { MdConnectWithoutContact } from "react-icons/md";
import { SiCompilerexplorer } from "react-icons/si";
import { NavLink } from "react-router-dom";
const Toggle = () => {
  return (
    <Wrapper>
      <div className="toogle">
        <ol>
          <li
            data-tooltip-id="Home"
            data-tooltip-content="Home"
            data-tooltip-place="top"
          >
            <a href={`/`}>
              <FaHome size={40} color="white" />
            </a>
          </li>
          <Tooltip id="Home" />
          <li
            data-tooltip-id="Editor"
            data-tooltip-content="Editor"
            data-tooltip-place="top"
          >
            <a href={`/editor`}>
              <SiCompilerexplorer size={40} color="white" />
            </a>
          </li>
          <Tooltip id="Editor" />
          <li
            data-tooltip-id="voice"
            data-tooltip-content="Voice to text"
            data-tooltip-place="top"
          >
            <a href={`/speechTotext`}>
              <RiVoiceprintLine size={40} color="white" />
            </a>
          </li>
          <Tooltip id="voice" />

          <li
            data-tooltip-id="imgCode"
            data-tooltip-content="Image To Text"
            data-tooltip-place="top"
          >
            <a href={`/imgtotext`}>
              <SiConvertio size={40} color="white" />
            </a>
          </li>
          <Tooltip id="imgCode" />

          <li
            data-tooltip-id="contact"
            data-tooltip-content="Contact"
            data-tooltip-place="top"
          >
            <a href={`/contact`}>
              <MdConnectWithoutContact size={40} color="white" />
            </a>
          </li>
          <Tooltip id="contact" />
        </ol>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 25px;

  .toogle {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ol {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    list-style-type: none;
    /* background-color: grey; */
    border-radius: 15px;
    width: 60%;
    background-color: #ffffff;
    /* From https://css.glass */
    background: rgba(237, 237, 5, 0.532);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(18.7px);
    -webkit-backdrop-filter: blur(18.7px);
    border: 1px solid rgba(175, 237, 61, 0.562);

    background-attachment: fixed;
    background-size: cover;
    padding: 8px;
  }
  li {
    cursor: grab;
    list-style-type: none;
  }
`;

export default Toggle;
