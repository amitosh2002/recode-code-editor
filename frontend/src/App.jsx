import React from "react";
import NavBar from "./component/NavBar";
import EditorBody from "./component/Editor";
import Footer from "./component/Footer";
import Toggle from "./EditorComponent/Toggle";
import ImgTxt from "./component/ImgTxt";
import SpeechRecogination from "./component/SpeechRecogination";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../src/App.css";
import ContactMe from "./component/ContactMe";
import LearnQuiz from "./component/LearnQuiz";
import Home from "./component/Home";
import PracticeCode from "./component/PracticeCode";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import AdminPage from "./Admin/AdminPage";
import PracticeCodePanel from "./component/PracticeCodePanel";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/editor",
      element: <EditorBody />,
    },
    {
      path: "/speechTotext",
      element: <SpeechRecogination />,
    },
    {
      path: "/imgtotext",
      element: <ImgTxt />,
    },
    {
      path: "/contact",
      element: <ContactMe />,
    },
    {
      path: "/learn",
      element: <LearnQuiz />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/practice",
      element: <PracticeCode />,
    },
    {
      path: "/question/:id",
      element: <PracticeCodePanel />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/admin",
      element: <AdminPage />,
    },
  ]);
  return (
    <>
      <NavBar />
      <RouterProvider router={router} />
      <Toggle />

      <Footer />
      {/* <ImgTxt /> */}
      {/* <SpeechRecogination /> */}
    </>
  );
};

export default App;
