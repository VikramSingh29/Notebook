import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/notContext";
import { Alert } from "react-bootstrap";
import useAlert from "../services/useAlert";

function UpdateNote() {
  const location = useLocation();
  const navigate = useNavigate();
  const { editNote } = useContext(noteContext);
  const { alert, showAlert, clearAlert } = useAlert();
  const { note } = location.state || {}; // Retrieve the note from navigation state

  const [updatedNote, setUpdatedNote] = useState({
    title: "",
    description: "",
    tag: "",
    category: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // New state for error handling

  useEffect(() => {
    if (note) {
      setUpdatedNote(note);
    } else {
      console.error("No note received, redirecting to home page.");
      navigate("/home"); // Redirect if no note is passed
    }
  }, [note, navigate]);

  const handleChange = (e) => {
    setUpdatedNote({ ...updatedNote, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editNote(
        updatedNote._id,
        updatedNote.title,
        updatedNote.description,
        updatedNote.tag,
        updatedNote.category
      );
      showAlert("success", "Note update successful!");
      setTimeout(() => navigate("/home"), 1000);
     // Redirect to home after successful update
    } catch (error) {
      console.error("Error updating note:", error);
      setErrorMessage("Failed to update the note. Please try again.");
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center text-success mb-4">Update Your Note</h2>
      {alert.show && (
          <Alert
            variant={alert.type}
            dismissible
            onClose={clearAlert}
          >
            {alert.message}
          </Alert>
        )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control border-success"
            id="title"
            name="title"
            value={updatedNote.title || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control border-success"
            id="tag"
            name="tag"
            value={updatedNote.tag || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select border-success"
            id="category"
            name="category"
            value={updatedNote.category || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control border-success"
            id="description"
            name="description"
            value={updatedNote.description || ""}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success w-100">
          Update Note
        </button>
      </form>
    </div>
  );
}

export default UpdateNote;
