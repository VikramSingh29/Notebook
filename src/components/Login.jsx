import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/apiService";
import { Alert } from "react-bootstrap";
import  "../Styles/utils.css"
import useAlert from "../services/useAlert";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { alert, showAlert, clearAlert } = useAlert();
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login(credentials.email, credentials.password);
      localStorage.setItem("authToken", token);
      showAlert("success", "Login successful!");
      setTimeout(() => navigate("/home"), 1000);
      setTimeout(() =>window.location.reload(), 1000);
    } catch (error) {
      showAlert("danger", error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center my-5 align-items-center min-vh-90 ">
      <div className="card shadow-lg p-4 card-margin" style={{ width: "24rem", borderRadius: "1rem" }}>
        <h2 className="text-center text-success mb-4">Login</h2>
        {alert.show && (
          <Alert
            variant={alert.type}
            dismissible
            onClose={clearAlert}
          >
            {alert.message}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">Email address</label>
            <input
              type="email"
              className="form-control border-success"
              id="email"
              name="email"
              value={credentials.email}
              placeholder="Enter your email"
              onChange={onChange}
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
              value={credentials.password}
              placeholder="Enter your password"
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <small>Don't have an account? <Link to="/signup" className="text-success">Sign up</Link></small>
        </div>
      </div>
    </div>
  );
}

export default Login;
