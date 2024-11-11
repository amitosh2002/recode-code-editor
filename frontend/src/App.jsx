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
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
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
