import React, { useEffect, useState } from "react";
import { getQuestion } from "../Services/QuizApi";
import styled from "styled-components";
import { Doughnut } from "react-chartjs-2"; // Import Doughnut chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const LearnQuiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([]); // Store multiple questions
  const [score, setScore] = useState(0); // Track total score
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // Track correct answers count
  const [incorrectAnswersCount, setIncorrectAnswersCount] = useState(0); // Track incorrect answers count

  // Fetch quiz questions (this could be multiple questions)
  const getQuizQuestions = async () => {
    try {
      const res = await getQuestion();

      // Initialize isCorrect as false for each question
      const initializedQuestions = res.data.map((question) => ({
        ...question,
        selectedAnswer: null, // Initially no answer selected
        isCorrect: false, // Initially no answer is correct
      }));

      setQuizQuestions(initializedQuestions); // Set the initialized questions state
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getQuizQuestions();
  }, []);

  // Handle answer selection for a specific question
  const handleAnswerSelect = (questionId, selectedAnswer, correctAnswer) => {
    setQuizQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              selectedAnswer, // Store the selected answer for this question
              isCorrect: selectedAnswer === correctAnswer, // Check if it's the correct answer
            }
          : question
      )
    );

    // Update score and correct/incorrect counts
    if (selectedAnswer === correctAnswer) {
      setScore((prevScore) => prevScore + 1); // Increment score if the answer is correct
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    } else {
      setIncorrectAnswersCount((prevCount) => prevCount + 1);
    }
  };
  const Loader = styled.div`
    /* From Uiverse.io by G4b413l */
    .three-body {
      --uib-size: 150px;
      --uib-speed: 0.8s;
      --uib-color: #5d3fd3;
      /* position: relative; */
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin: 350px;
      margin-left: 650px;
      height: var(--uib-size);
      width: var(--uib-size);
      animation: spin78236 calc(var(--uib-speed) * 2.5) infinite linear;
    }

    .three-body__dot {
      /* position: absolute; */
      height: 100%;
      width: 30%;
    }

    .three-body__dot:after {
      content: "";
      position: absolute;
      height: 0%;
      width: 100%;
      padding-bottom: 100%;
      background-color: var(--uib-color);
      border-radius: 50%;
    }

    .three-body__dot:nth-child(1) {
      bottom: 5%;
      left: 0;
      transform: rotate(60deg);
      transform-origin: 50% 85%;
    }

    .three-body__dot:nth-child(1)::after {
      bottom: 0;
      left: 0;
      animation: wobble1 var(--uib-speed) infinite ease-in-out;
      animation-delay: calc(var(--uib-speed) * -0.3);
    }

    .three-body__dot:nth-child(2) {
      bottom: 5%;
      right: 0;
      transform: rotate(-60deg);
      transform-origin: 50% 85%;
    }

    .three-body__dot:nth-child(2)::after {
      bottom: 0;
      left: 0;
      animation: wobble1 var(--uib-speed) infinite
        calc(var(--uib-speed) * -0.15) ease-in-out;
    }

    .three-body__dot:nth-child(3) {
      bottom: -5%;
      left: 0;
      transform: translateX(116.666%);
    }

    .three-body__dot:nth-child(3)::after {
      top: 0;
      left: 0;
      animation: wobble2 var(--uib-speed) infinite ease-in-out;
    }

    @keyframes spin78236 {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes wobble1 {
      0%,
      100% {
        transform: translateY(0%) scale(1);
        opacity: 1;
      }

      50% {
        transform: translateY(-66%) scale(0.65);
        opacity: 0.8;
      }
    }

    @keyframes wobble2 {
      0%,
      100% {
        transform: translateY(0%) scale(1);
        opacity: 1;
      }

      50% {
        transform: translateY(66%) scale(0.65);
        opacity: 0.8;
      }
    }
  `;
  // If questions are still loading, display loading message
  if (quizQuestions.length === 0) {
    return (
      <Loader>
        <div class="three-body">
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
        </div>
      </Loader>
    );
  }

  // Chart data for Doughnut chart
  const chartData = {
    labels: ["Correct Answers", "Incorrect Answers"],
    datasets: [
      {
        label: "User Performance",
        data: [correctAnswersCount, incorrectAnswersCount], // Correct vs Incorrect
        backgroundColor: ["#4CAF50", "#f44336"], // Green for correct, Red for incorrect
        borderColor: ["#4CAF50", "#f44336"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <section class="layout">
        <div class="sidebar">
          <AnalysisSection>
            <h3>Quiz Performance Analysis</h3>
            <div className="chart-container">
              <Doughnut data={chartData} /> {/* Using Doughnut chart */}
            </div>
            <MarksAnalysis>
              <section class="layout">
                <div class="grow1">
                  <p>Correct Answer : {correctAnswersCount}</p>
                </div>
                <div class="grow1">
                  {" "}
                  <p>Incorrect Answer : {incorrectAnswersCount}</p>
                </div>
                <div class="grow1">
                  {" "}
                  <p>Total Question :{quizQuestions.length}</p>
                </div>
                <div class="grow1">
                  {" "}
                  <p>
                    Percentage :{" "}
                    {(correctAnswersCount / quizQuestions.length) * 100}%
                  </p>
                </div>
              </section>
            </MarksAnalysis>
          </AnalysisSection>
        </div>
        <div class="body">
          <div>
            {quizQuestions.map(
              ({
                id,
                question,
                correct_answer,
                answers,
                selectedAnswer,
                isCorrect,
                category,
                difficulty,
              }) => {
                // Filter out any null or undefined values from the answers
                const options = Object.entries(answers).filter(
                  ([key, value]) =>
                    value !== null && value !== undefined && value !== ""
                );

                return (
                  <QuizQuestion key={id}>
                    <div className="radio-input">
                      <div className="stepDiv">
                        <span className="steps">{id}</span>
                        <span className="steps">{category}</span>
                        <span className="steps">{difficulty}</span>
                      </div>
                      <div className="info">
                        <span className="question">{question}</span>
                      </div>

                      <ol type={"A"}>
                        {options.map(([option, value]) => (
                          <li key={option}>
                            <button
                              className={`option ${
                                selectedAnswer === option
                                  ? isCorrect
                                    ? "correct"
                                    : "incorrect"
                                  : ""
                              }`}
                              onClick={() =>
                                handleAnswerSelect(id, option, correct_answer)
                              }
                              disabled={selectedAnswer !== null} // Disable after selection
                            >
                              {value}
                            </button>
                          </li>
                        ))}
                      </ol>

                      {selectedAnswer !== null && <p>Your score: {score}</p>}
                    </div>
                  </QuizQuestion>
                );
              }
            )}

            {/* Circular (Doughnut) Chart for Performance Analysis */}
          </div>
        </div>
      </section>
    </Container>
  );
};

const Container = styled.div`
  /* Ensure no scrollbars on the entire page */
  html,
  body {
    height: 100%;
    margin: 0;
    overflow: hidden; /* Prevent scrolling on the entire page */
  }

  /* The layout container that holds both the sidebar and body */
  .layout {
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr; /* Sidebar takes auto-width, and the body takes remaining space */
    gap: 16px;
    position: relative;
    height: 100vh; /* Ensure the container takes up at least the full viewport height */
  }

  /* Sidebar styling - make it sticky */
  .sidebar {
    position: sticky;
    top: 0; /* Stick it to the top of the viewport */
    grid-column: 1; /* Sidebar occupies the first column of the grid */
    padding: 20px;
    background-color: #f8f8f8;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Optional: add shadow for better separation */
    height: 100vh; /* Ensure sidebar takes full viewport height */
    overflow: hidden; /* Remove scrollbar from sidebar */
  }

  /* Body section styling */
  .body {
    grid-column: 2; /* Body takes the second column of the grid */
    padding: 20px;
    overflow-y: auto; /* Ensure the body content can scroll independently */
  }
`;

const MarksAnalysis = styled.div`
  .layout {
    width: 100%;

    display: flex;
    gap: 16px;
  }

  .grow1 {
    flex-grow: 1;
  }
`;

const QuizQuestion = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;

  .radio-input {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background: #fff;
    color: #000;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    width: 70%;
    max-width: 700px;
    margin: 20px auto;
  }

  .info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 100%;
  }

  .question {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    flex: 1;
  }
  .stepDiv {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }
  .steps {
    background-color: #27ea62;
    padding: 5px;
    margin: 5px;
    color: #0e0b0b;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
  }

  .option {
    background-color: #fff;
    padding: 8px;
    margin: 5px 0;
    font-size: 16px;
    font-weight: 600;
    border-radius: 10px;
    cursor: pointer;
    border: 1px solid rgba(187, 187, 187, 0.164);
    color: #000;
    transition: 0.3s ease;
    width: 100%;
    text-align: left;
  }

  .option:hover {
    background-color: rgba(24, 24, 24, 0.13);
    border: 1px solid #bbb;
  }

  .option.correct {
    background-color: #4caf50;
    color: white;
  }

  .option.incorrect {
    background-color: #f44336;
    color: white;
  }

  .score {
    font-size: 1rem;
    font-weight: bold;
    margin-top: 20px;
    color: #333;
  }

  /* Media Queries for responsiveness */
  @media (max-width: 768px) {
    .radio-input {
      width: 95%;
      padding: 15px;
    }

    .question {
      font-size: 1rem;
    }

    .option {
      font-size: 14px;
      padding: 12px;
    }

    .steps {
      font-size: 10px;
      padding: 3px 6px;
    }
  }

  @media (max-width: 480px) {
    .radio-input {
      width: 100%;
      padding: 10px;
    }

    .question {
      font-size: 0.9rem;
    }

    .option {
      font-size: 12px;
      padding: 10px;
    }

    .steps {
      font-size: 8px;
      padding: 2px 5px;
    }
  }
`;

const AnalysisSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .chart-container {
    width: 200px;
    max-width: 500px;
  }
`;

export default LearnQuiz;
