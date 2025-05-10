// src/components/SessionTimeout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onerrorToast } from "../component/Tostify";

const SessionTimeout = ({ session }) => {
  const navigate = useNavigate();
  const timeDuration =session*60*1000;
  useEffect(() => {
    let timeout;

    // Reset the timeout on any user activity
    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        // Clear user session
        localStorage.removeItem("token");
        localStorage.removeItem("userDetails");
        navigate("/login");
        onerrorToast("You have been logged out due to inactivity.")
      }, timeDuration);
    };

    // Set the initial timeout
    resetTimeout();

    // Listen for user activity
    const events = ["click", "keydown", "mousemove", "scroll", "touchstart"];
    events.forEach((event) =>
      window.addEventListener(event, resetTimeout)
    );

    // Clean up listeners on component unmount
    return () => {
      clearTimeout(timeout);
      events.forEach((event) =>
        window.removeEventListener(event, resetTimeout)
      );
    };
  }, [navigate, timeDuration]);

  return null;
};

export default SessionTimeout;
