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
import quiz from "../assets/Quiz.png";
import CustomLoader from "./Platform/Loader/customLoader";
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
  const [tagPerformance, setTagPerformance] = useState({});

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
    } // Update tag-based performance
    tags.forEach((tag) => {
      const tagName = tag.name;

      setTagPerformance((prevTagPerformance) => {
        const newPerformance = { ...prevTagPerformance };

        if (!newPerformance[tagName]) {
          newPerformance[tagName] = { correct: 0, incorrect: 0, total: 0 };
        }

        newPerformance[tagName].total += 1;

        if (selectedAnswer === correctAnswer) {
          newPerformance[tagName].correct += 1;
        } else {
          newPerformance[tagName].incorrect += 1;
        }

        return newPerformance;
      });
    });
  };

  const generateTagChartData = (tagName) => {
    const performance = tagPerformance[tagName];

    if (!performance) return null;

    const { correct, incorrect } = performance;

    return {
      labels: [
        `Correct Answers (${correct})`,
        `Incorrect Answers (${incorrect})`,
      ],
      datasets: [
        {
          label: `Performance for ${tagName}`,
          data: [correct, incorrect],
          backgroundColor: ["#4CAF50", "#f44336"], // Green for correct, Red for incorrect
          borderColor: ["#4CAF50", "#f44336"],
          borderWidth: 1,
        },
      ],
    };
  };

  const Loader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    .loader {
      width: 84.8px;
      height: 84.8px;
      color: #554cb5;
      position: relative;
      background: radial-gradient(11.2px, currentColor 94%, #0000);
    }

    .loader:before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: radial-gradient(
            10.08px at bottom right,
            #0000 94%,
            currentColor
          )
          top left,
        radial-gradient(10.08px at bottom left, #0000 94%, currentColor) top
          right,
        radial-gradient(10.08px at top right, #0000 94%, currentColor) bottom
          left,
        radial-gradient(10.08px at top left, #0000 94%, currentColor) bottom
          right;
      background-size: 42.4px 42.4px;
      background-repeat: no-repeat;
      animation: loader 1.5s infinite cubic-bezier(0.3, 1, 0, 1);
    }

    @keyframes loader {
      33% {
        inset: -11.2px;
        transform: rotate(0deg);
      }

      66% {
        inset: -11.2px;
        transform: rotate(90deg);
      }

      100% {
        inset: 0;
        transform: rotate(90deg);
      }
    }
  `;
  const AnalysisSectionTag = styled.div`
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
      margin-bottom: 20px;
    }

    p {
      font-size: 1rem;
      color: #333;
    }
  `;

  // If questions are still loading, display loading message
  if (quizQuestions.length === 0) {
    return (
      // <Loader>
      //   <div className="loader"></div>
      // </Loader>
      <CustomLoader />
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
                  <strong>Correct Answer : {correctAnswersCount}</strong>
                </div>
                <div class="grow1">
                  {" "}
                  <strong>Incorrect Answer : {incorrectAnswersCount}</strong>
                </div>
                <div class="grow1">
                  {" "}
                  <strong>Total Question :{quizQuestions.length}</strong>
                </div>
                <div class="grow1">
                  {" "}
                  <strong>
                    Percentage :{" "}
                    {(correctAnswersCount / quizQuestions.length) * 100}%
                  </strong>
                  <img src={quiz} alt="" />
                </div>
              </section>
            </MarksAnalysis>
          </AnalysisSection>
          <AnalysisSectionTag></AnalysisSectionTag>
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
                tags,
              }) => {
                // Filter out any null or undefined values from the answers
                const options = Object.entries(answers).filter(
                  ([key, value]) =>
                    value !== null && value !== undefined && value !== ""
                );
                const tagName =
                  tags && tags.length > 0 ? tags[0].name : "No Tag";

                return (
                  <QuizQuestion key={id}>
                    <div className="radio-input">
                      <div className="stepDiv">
                        <span className="steps">{id}</span>
                        <span className="steps">{category}</span>
                        <span className="steps">{difficulty}</span>
                        <span className="steps">{tagName}</span>
                      </div>
                      <div className="info">
                        <span className="question">{question}</span>
                      </div>
                      <hr />
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
    height: 100vh;
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
    margin-top: 30px;
    width: 300px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    /* gap: 16px; */
  }

  .grow1 {
    flex-grow: 1 1;
  }
`;

const QuizQuestion = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* margin: 20px; */

  .radio-input {
    display: flex;
    flex-direction: column;
    padding: 30px;
    background: #fff;
    color: #000;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    width: 70%;
    max-width: 700px;
    margin: 20px;
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
    margin: 8px;
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
