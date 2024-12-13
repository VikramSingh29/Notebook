import React, { useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/notContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setNotes } = useContext(noteContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setNotes([]);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Notebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/addnote" ? "active" : ""}`} to="/addnote">
                Add Note
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Link className="btn btn-outline-success btn-sm mx-1" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-success btn-sm mx-1" to="/signup">
                SignUp
              </Link>
            </div>
          ) : (
            <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;