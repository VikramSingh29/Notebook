import React from "react";
import { Link } from "react-router-dom";
import "../Styles/welcome.css"; // Ensure you create this CSS file for custom styles

function Welcome() {
  return (
    <div className="welcome-container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="text-center">
        <h1 className="welcome-title">Welcome to <span className="text-primary">Notes App</span></h1>
        <p className="welcome-subtitle text-muted">Organize your thoughts and stay productive!</p>
        <div className="welcome-buttons">
          <Link to="/login" className="btn btn-primary btn-lg mx-3 shadow-sm">Login</Link>
          <Link to="/signup" className="btn btn-success btn-lg mx-3 shadow-sm">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;

