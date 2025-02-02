import React, { useEffect, useState } from "react";
import { getQuestionList } from "../Services/QuestionServices";
import { useSelector } from "react-redux";
import { updateQuestionProblems } from "../Redux/Slices/AdminSlice";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const PracticeCode = () => {
  const dispatch = useDispatch();
  const [allQn, setAllQn] = useState([]);
  // const QuestionProblem = useSelector((state) => state.mainComponent.problems);
  const questionList = async () => {
    try {
      const res = await getQuestionList();
      setAllQn(res.data.allQuestion); // update state with the fetched data
      // console.log(res.data.allQuestion);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    questionList();
  }, []);
  return (
    <div>
      <QuestionContainer>
        <div className="container">
          <header>
            <h1>Questions</h1>
            <p>
              Unleash your potential, one challenge at a time—turn your ideas
              into code and watch them transform the world!
            </p>
          </header>
          {/* <nav className="tabs">
            <button className="tab active">Upcoming</button>
            <button className="tab">Pending</button>
            <button className="tab">Recurring</button>
            <button className="tab">Past</button>
            <button className="tab">Cancelled</button>
          </nav> */}

          {allQn.map((problem, index) => {
            const { description, _id, questionText, tittle } = problem;
            return (
              <div className="bookings-list" key={index}>
                <div className="booking">
                  <div className="date">
                    <span className="day">Q</span>
                    <span className="number">{index + 1}</span>
                  </div>
                  <div className="details">
                    <p>
                      <strong>{tittle}</strong>
                    </p>
                    <p>{questionText}</p>
                  </div>
                  <NavLink to={`/question/${_id}`}>
                    <button className="solve-btn">Solve</button>
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
      </QuestionContainer>
    </div>
  );
};
const QuestionContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  /* background-color: #f5f7fa; */

  .container {
    max-width: 800px;
    margin: 20px auto;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    height: 500px; /* Fixed height for the container */
    overflow-y: auto; /* Enable vertical scrolling */
  }

  header {
    margin-bottom: 20px;
  }

  header h1 {
    margin: 0;
    font-size: 24px;
  }

  header p {
    color: #888;
    font-size: 14px;
  }

  .tabs {
    display: flex;
    margin-bottom: 20px;
  }

  .tab {
    flex: 1;
    padding: 10px;
    background: #f0f0f0;
    border: none;
    border-radius: 4px 4px 0 0;
    text-align: center;
    cursor: pointer;
  }

  .tab.active {
    background: white;
    border-bottom: 2px solid white;
  }

  .bookings-list {
    border-top: 1px solid #ddd;
  }

  .booking {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 15px 0;
    justify-content: space-between;
  }

  .date {
    text-align: center;
    margin-right: 20px;
  }

  .date .day {
    font-weight: bold;
    font-size: 18px;
  }

  .date .number {
    font-size: 24px;
    color: #ff5e57;
  }

  .details {
    flex: 1;
  }

  .details p {
    margin: 5px 0;
  }

  .score-input {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .score-input input {
    width: 60px;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .solve-btn {
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    margin: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .solve-btn:hover {
    background: #078f86;
  }
`;

export default PracticeCode;
