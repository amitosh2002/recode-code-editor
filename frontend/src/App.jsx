import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import NavBar from "./component/NavBar";
import EditorBody from "./component/Editor";
import Footer from "./component/Footer";
import Toggle from "./EditorComponent/Toggle";
import ImgTxt from "./component/ImgTxt";
import SpeechRecogination from "./component/SpeechRecogination";
import ContactMe from "./component/ContactMe";
import LearnQuiz from "./component/LearnQuiz";
import Home from "./component/Home";
import PracticeCode from "./component/PracticeCode";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import AdminPage from "./Admin/AdminPage";
import PracticeCodePanel from "./component/PracticeCodePanel";
import QuestionList from "./Admin/QuestionList";
import Userlist from "./Admin/Userlist";
import QuestionForm from "./Admin/QuestionForm";
import AdminGraph from "./Admin/AdminGraph";
import "../src/App.css";

// 🌟 Layout for Normal Pages
const MainLayout = () => (
  <>
    <NavBar />
    <Outlet /> {/* This renders the current page content */}
    <Toggle />
    <Footer />
  </>
);

// 🌟 Layout for Admin Pages (Includes NavBar)

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Wrap normal pages inside MainLayout
    children: [
      { path: "/", element: <Home /> },
      { path: "/editor", element: <EditorBody /> },
      { path: "/speechTotext", element: <SpeechRecogination /> },
      { path: "/imgtotext", element: <ImgTxt /> },
      { path: "/contact", element: <ContactMe /> },
      { path: "/learn", element: <LearnQuiz /> },
      { path: "/practice", element: <PracticeCode /> },
      { path: "/question/:id", element: <PracticeCodePanel /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />, // Admin pages get their own layout
    children: [
      { path: "", element: <AdminPage /> }, // Admin Dashboard
      { path: "questionList", element: <QuestionList /> },
      { index: true, element: <AdminGraph /> }, // Default admin route
      { path: "questionForm", element: <QuestionForm /> },
      { path: "userlist", element: <Userlist /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
