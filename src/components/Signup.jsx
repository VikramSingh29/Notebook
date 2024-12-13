import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/apiService";
import { Alert } from "react-bootstrap";
import useAlert from "../services/useAlert";

function SignupForm() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState(null);
  const { alert, showAlert, clearAlert } = useAlert();
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const { token } = await signup(credentials.name, credentials.email, credentials.password);
      localStorage.setItem("authToken", token);
      showAlert("success", "Signup successful!");
      setTimeout(() => navigate("/home"), 1000);
      setTimeout(() =>window.location.reload(), 1000);
    } catch (error) {
      setError(error.message);
      showAlert("danger", "Signup failed!");
    }
  };

  return (
    <div className=" d-flex justify-content-center my-5 align-items-center min-vh-90">
      <div className="card shadow-lg p-4" style={{ width: "24rem", borderRadius: "1rem" }}>
        <h2 className="text-center text-success mb-4">Sign Up</h2>
        {alert.show && (
          <Alert
            variant={alert.type}
            dismissible
            onClose={clearAlert}
          >
            {alert.message}
          </Alert>
        )}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-bold">Full Name</label>
            <input
              type="text"
              className="form-control border-success"
              id="name"
              name="name"
              onChange={onChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">Email Address</label>
            <input
              type="email"
              className="form-control border-success"
              id="email"
              name="email"
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control border-success"
              id="password"
              name="password"
              minLength={5}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label fw-bold">Confirm Password</label>
            <input
              type="password"
              className="form-control border-success"
              id="confirmPassword"
              name="confirmPassword"
              minLength={5}
              onChange={onChange}
              placeholder="Re-enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Sign Up</button>
        </form>
        <div className="text-center mt-3">
          <small>Already have an account? <Link to="/login" className="text-success">Log in</Link></small>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
