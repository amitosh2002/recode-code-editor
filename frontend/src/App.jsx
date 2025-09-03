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
// import AdminGraph from "./Admin/AdminGraph";
import "../src/App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { handleUserDetails } from "./Redux/Actions/actions";
import MyAccount from "./component/UserDetail/MyAccount";
import TestOrganizeHome from "./Admin/TestOrganize/TestOrganizeHome";
import TestPage from "./component/TestComponentV1/TestPage";
import ExamControl from "./component/TestComponentV1/ExamControl";
// import EmployeeChart from "./Admin/AdminGraph";
import DBStatsGraph from "./Admin/AdminGraph";
// import ProtectedRoute from "./AuthControl/ProtectedRoute";
import SessionTimeout from "./AuthControl/SessionTimeout";
import AdminReg from "./component/AdminReg";
import { useLocation } from 'react-router-dom';
// import Dashboard from "./Admin/AdminDashBoard";
  const location = useLocation();
  useEffect(() => {
    // This sends a pageview event to Google Analytics on every route change.
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname,
        page_title: document.title,
      });
    }
  }, [location]);

// 🌟 Layout for Normal Pages
const MainLayout = () => (
  <>
    <NavBar />
    <SessionTimeout session={10}/>
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
      { path: "/signup/admin", element: <AdminReg /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/my-account", element: <MyAccount /> },
      { path: "/exam",  element: <ExamControl /> },
      
      { path: "/exam/:subjectCode", element: <TestPage /> },
        // **Protected Student/Dev Routes**
      //   {
      //     path: "/exam",
      //     element: <ProtectedRoute allowedRoles={["student", "dev", "admin"]} />,
      //     children: [
      //         { path: "", element: <ExamControl /> },
      //         { path: ":subjectCode", element: <TestPage /> },
      //     ],
      // },
    ],
  },
  {
    path: "/admin",
    // element: <ProtectedRoute allowedRoles={["admin"]} />, // Admin pages get their own layout
    element: <AdminPage />, // Admin pages get their own layout
    children: [
      { path: "", element: <AdminPage /> }, // Admin Dashboard
      { path: "questionList", element: <QuestionList /> },
      { index: true, element: <DBStatsGraph /> }, // Default admin route
      { path: "questionForm", element: <QuestionForm /> },
      { path: "userlist", element: <Userlist /> },
      { path: "test_validation", element: <TestOrganizeHome /> },
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();
  // ��� Fetch user details from local storage and update Redux state on page load
  React.useEffect(() => {
    const storedUser = localStorage.getItem("userDetails");
    if (storedUser) {
      dispatch(handleUserDetails(JSON.parse(storedUser))); // ✅ Update Redux state on page load
    }
  }, [dispatch]);
     

  const [isSmallScreen, setIsSmallScreen] = React.useState(window.innerWidth < 650);

  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 650);
    };

    // Set initial state
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isSmallScreen) {
    return <div className="device-warning-card">
    <div className="warning-content">
        <h2>Switch to a Laptop or Tablet or enable Desktop version</h2>
        <p>For a better experience, please use a laptop or tablet to access Recode.</p>
    </div>
</div>;
  }


  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />{" "}
    </>
  );
};

export default App;
