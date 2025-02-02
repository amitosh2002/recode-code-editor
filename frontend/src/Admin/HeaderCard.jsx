import React from "react";
import styled from "styled-components";

const HeaderCard = ({ questionCount, tittle }) => {
  return (
    <CardWrapper>
      <div class="card">
        <div class="title">
          <span></span>
          <p class="title-text">{tittle}</p>
        </div>
        <div class="data">
          <p>{questionCount}</p>
        </div>
      </div>
    </CardWrapper>
  );
};
const CardWrapper = styled.div`
  /* From Uiverse.io by Yaya12085 */
  .card {
    padding: 1rem;
    /* background-color: #fff; */
    background-image: url("https://img.freepik.com/free-vector/puzzle-solving-question-mark-background-guidance-support_1017-43014.jpg");
    background-size: cover;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    width: 420px;
    max-width: 320px;
    max-height: 100px;
    border-radius: 20px;
  }

  .title {
    display: flex;
    align-items: center;
  }

  .title span {
    position: relative;
    padding: 0.5rem;
    background-color: #10b981;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
  }

  .title span svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    height: 0.5;
  }

  .title-text {
    margin-left: 0.5rem;
    color: #374151;
    font-size: 18px;
  }

  .data {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .data p {
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: #1f2937;
    font-size: 1.25rem;
    line-height: 0.5rem;
    font-weight: 700;
    text-align: left;
  }

  .data .range {
    position: relative;
    background-color: #e5e7eb;
    width: 100%;
    height: 0.5rem;
    border-radius: 0.25rem;
  }
`;
export default HeaderCard;
