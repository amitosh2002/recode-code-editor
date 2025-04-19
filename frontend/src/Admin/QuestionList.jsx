// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
// import { deleteQuestion, getQuestionList } from "../Services/QuestionServices";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { updateTotalQuestionCount } from "../Redux/Slices/AdminSlice";
// const QuestionList = () => {
//   const dispatch = useDispatch();
//   const [question, setQuestion] = useState([]);
//    const navigate = useNavigate();

//   const questionList = async () => {
//     try {
//       const res = await getQuestionList();
//       setQuestion(res.data.allQuestion);
//       dispatch(updateTotalQuestionCount(question.length));

//       console.log(res.data.allQuestion);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   useEffect(() => {
//     questionList();
//   }, []);
//   const submitDelete = ({ id }) => {
//     confirmAlert({
//       title: "Confirm to submit",
//       message: "Are you sure to delete this question?",
//       buttons: [
//         {
//           label: "Yes",
//           onClick: () => {
//             handleDeleteQuestion(id);
//           },
//         },
//         {
//           label: "No", // Dialog closes automatically without any action
//         },
//       ],
//     });
//   };

//   const handleDeleteQuestion = async (id) => {
//     try {
//       const response = await deleteQuestion(id);
//       console.log("Question deleted successfully:", response.data);
//       setQuestion(question.filter((q) => q._id !== id));
//       // Handle success (e.g., update UI, show success message)
//     } catch (error) {
//       console.error("Error deleting question:", error);
//       // Handle error (e.g., display error message to user)
//     }
//   };

//   return (
     
//     <QuestionContainerAdmin>
//       <div className="container">
//         <div className="header">
//           <h1>Question Management</h1>
//           <p>Manage all your existing question or add a new question.</p>
//           <button
//             className="add-schedule-btn"
//             onClick={() => {
//             navigate("/admin/questionForm");
//             }}
//           >
//             + Add New Question
//           </button>
//         </div>
//         <div className="table-body">
//           <table className="schedule-table">
//             <thead>
//               <tr style={{ display: "flex", gap: "50px" ,borderBottom:"1px solid white"}}>
//                 <th>Sl No</th>
//                 <th>Tittle</th>
//                 <th>Question</th>
//                 <th>Difficulty</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* <tr> */}
//               {question.map((question, index) => {
//                 const {
//                   tittle,
//                   difficulty,
//                   questionText,
//                   _id,
//                   testCases,
//                   description,
//                 } = question;
//                 const data = {
//                   isUpdate: false,
//                   tittle: tittle,
//                   difficulty: difficulty,
//                   questionText: questionText,
//                   _id: _id,
//                   testCases: testCases,
//                   description,
//                 };
//                 return (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td className="employee-info">
//                       <span>{tittle}</span>
//                     </td>
//                     <td>{questionText}</td>
//                     <td>
//                       <span className="status inactive">{difficulty}</span>
//                     </td>
//                     <td className="actions">
//                       <NavLink to="/admin/questionForm" state={data}>
//                         <button className="edit-btn">✏️</button>
//                       </NavLink>

//                       <button
//                         className="delete-btn"
//                         onClick={() => {
//                           // handleDeleteQuestion(_id);
//                           submitDelete({ id: _id });
//                         }}
//                       >
//                         🗑️
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//               {/* </tr> */}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </QuestionContainerAdmin>
//   );
// };

// export default QuestionList;
// // Styled Components
// const QuestionContainerAdmin = styled.div`
//   /* styles.css */
//   font-family: Arial, sans-serif;
//   margin: 0;
//   padding: 0;
//   background-color: #102c54;

//   .table-body {
//     max-height: 500px; /* Fixed height for the container */
//     height: 500px; /* Fixed height for the container */
//     overflow-y: auto; /* Enable vertical scrolling */
//   }
//   .container {
//     max-width: 900px;
//     /* width: 100%; */
//     margin: 20px auto;
//     padding: 20px;
//   background-color: #102c54;
//     /* background: white; */
//     border-radius: 8px;
//     box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//   }
//   tr{
//     display: flex;
//     /* justify-content: space-between; */
//     /* align-items: center; */
//     /* gap: 20px; */
//     /* padding: 10px; */
//   }
  
//   .header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 20px;
//   }

//   .header h1 {
//     font-size: 1.5rem;
//     margin: 0;
//   }

//   .header p {
//     color: #6c757d;
//     margin: 0;
//     font-size: 0.9rem;
//   }

//   .add-schedule-btn {
//     background: #007bff;
//     color: white;
//     padding: 10px 20px;
//     border: none;
//     border-radius: 5px;
//     font-size: 0.9rem;
//     cursor: pointer;
//   }

//   .add-schedule-btn:hover {
//     background: #0056b3;
//   }

//   .schedule-table {
//     width: 100%;
//     border-collapse: collapse;
//   }

//   .schedule-table th,
//   .schedule-table td {
//     text-align: left;
//     padding: 12px;
//     border-bottom: 1px solid #e9ecef;
//   }

//   .schedule-table th {
//     /* background: #f8f9fa; */
//   background-color: #102c54;

//     font-weight: bold;
//   }

//   .employee-info {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 10px;
//   }

//   .employee-info img {
//     width: 40px;
//     height: 40px;
//     border-radius: 50%;
//     object-fit: cover;
//   }

//   .status {
//     padding: 5px 10px;
//     border-radius: 12px;
//     font-size: 0.9rem;
//     color: white;
//     font-weight: bold;
//   }

//   .status.active {
//     background: #28a745;
//   }

//   .status.inactive {
//     background: #ffc107;
//     color: #343a40;
//   }

//   .actions {
//     display: flex;
//     gap: 10px;
//   }

//   .actions button {
//     background: none;
//     border: none;
//     font-size: 1.2rem;
//     cursor: pointer;
//   }

//   .actions button:hover {
//     opacity: 0.7;
//   }
// `;


import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteQuestion, getQuestionList } from "../Services/QuestionServices";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTotalQuestionCount } from "../Redux/Slices/AdminSlice";

const QuestionList = () => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState([]);
  const navigate = useNavigate();

  const questionList = async () => {
    try {
      const res = await getQuestionList();
      setQuestion(res.data.allQuestion);
      dispatch(updateTotalQuestionCount(question.length));
      console.log(res.data.allQuestion);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    questionList();
  }, []);

  const submitDelete = ({ id }) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete this question?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            handleDeleteQuestion(id);
          },
        },
        {
          label: "No", // Dialog closes automatically without any action
        },
      ],
    });
  };

  const handleDeleteQuestion = async (id) => {
    try {
      const response = await deleteQuestion(id);
      console.log("Question deleted successfully:", response.data);
      setQuestion(question.filter((q) => q._id !== id));
      // Handle success (e.g., update UI, show success message)
    } catch (error) {
      console.error("Error deleting question:", error);
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <QuestionContainerAdmin>
      <div className="container">
        <div className="header">
          <h1>Question Management</h1>
          <p>Manage all your existing question or add a new question.</p>
          <button
            className="add-schedule-btn"
            onClick={() => {
              navigate("/admin/questionForm");
            }}
          >
            + Add New Question
          </button>
        </div>
        <div className="table-body">
          <table className="schedule-table">
            <thead>
              <tr style={{ display: "flex"}}>
                <th style={{ flex: 1 }}>Sl No</th>
                <th style={{ flex: 3 }}>Tittle</th>
                <th style={{ flex: 5 }}>Question</th>
                <th style={{ flex: 2 }}>Difficulty</th>
                <th style={{ flex: 2 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {question.map((question, index) => {
                const {
                  tittle,
                  difficulty,
                  questionText,
                  _id,
                  testCases,
                  description,
                } = question;
                const data = {
                  isUpdate: false,
                  tittle: tittle,
                  difficulty: difficulty,
                  questionText: questionText,
                  _id: _id,
                  testCases: testCases,
                  description,
                };
                return (
                  <tr key={index} style={{ display: "flex" }}>
                    <td style={{ flex: 1 }}>{index + 1}</td>
                    <td className="employee-info" style={{ flex: 3 }}>
                      <span>{tittle}</span>
                    </td>
                    <td style={{ flex: 5 }}>{questionText}</td>
                    <td style={{ flex: 2 }}>
                      <span className={`status ${difficulty === 'Easy' ? 'active' : difficulty === 'Medium' ? 'inactive' : ''}`}>{difficulty}</span>
                    </td>
                    <td className="actions" style={{ flex: 2, justifyContent: "flex-start" }}>
                      <NavLink to="/admin/questionForm" state={data}>
                        <button className="edit-btn">✏️</button>
                      </NavLink>
                      <button
                        className="delete-btn"
                        onClick={() => {
                          submitDelete({ id: _id });
                        }}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </QuestionContainerAdmin>
  );
};

export default QuestionList;

// Styled Components
const QuestionContainerAdmin = styled.div`
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #102c54;
  color: white; /* Added default text color for better visibility */

  .table-body {
    max-height: 500px;
    height: 500px;
    /* overflow-y: auto; */
  }

  .container {
    margin: 20px auto;
    width: 100%;
    width: 1090px; /* Increased max-width for better readability */
    padding: 20px;
    background-color: #1a365d; /* Slightly darker background */
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Slightly stronger shadow */
  }

  tr {
    display: flex;
    align-items: center; /* Vertically align items in a row */
    padding: 10px 0; /* Adjust vertical padding for rows */
    width: 100%; /* Ensure rows take full width */
    max-width: 1050px; /* Increased max-width for better readability */

  }

  th {
    color: #f8f9fa; /* Light text color for header */
    font-weight: bold;
    padding: 12px 0; /* Adjust header padding */
    text-align: left;
  }

  td {
    padding: 12px 0; /* Adjust cell padding */
    text-align: left;
    overflow: hidden; /* Prevent text overflow */
    text-overflow: ellipsis; /* Show ellipsis for overflowed text */
    white-space: wrap; /* Prevent text wrapping */
    
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #4a5568; 
  }

  .header h1 {
    font-size: 2rem; /* Increased heading font size */
    margin: 0;
  }

  .header p {
    color: #a0aec0; /* Lighter text color for paragraph */
    margin: 5px 0 0;
    font-size: 1rem;
  }

  .add-schedule-btn {
    background: #4299e1; /* Blue button color */
    color: white;
    padding: 12px 24px; /* Increased button padding */
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background: #2b6cb0; /* Darker blue on hover */
    }
  }

  .schedule-table {
    width: 100%;
    /* border-collapse: collapse;
    
*/
  }

  .schedule-table thead th {
    /* Inherit text alignment from the style attribute */
    /* word-wrap: break-word; */
  }

  .schedule-table tbody tr:nth-child(even) {
    background-color: #2d3748; /* Slightly darker background for even rows */
  }

  .employee-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .employee-info img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .status {
    padding: 6px 12px;
    border-radius: 15px;
    font-size: 0.9rem;
    color: white;
    font-weight: bold;
    display: inline-block; /* Ensures proper width */
    text-align: center;
  }

  .status.active {
    background: #48bb78; /* Green for active/easy */
  }

  .status.inactive {
    background: #ed8936; /* Orange for inactive/medium */
    color: white;
  }

  .actions {
    display: flex;
    gap: 10px;
  }

  .actions button {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #cbd5e0; /* Light gray for action buttons */
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #f7fafc; /* White on hover */
    }
  }
`;