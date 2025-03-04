import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div>
      <h2>403 - Unauthorized</h2>
      <p>You do not have access to this page.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default Unauthorized;
