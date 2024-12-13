// Updated Addnote.jsx
import React, { useContext, useState } from "react";
import noteContext from "../context/notes/notContext";
import Notes from "./Notes";

function AddNote() {
  const { addNote, getNotes } = useContext(noteContext);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
    category: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      await addNote(note.title, note.description, note.tag, note.category);
      setNote({ title: "", description: "", tag: "", category: "" });
      setSuccessMessage("Note added successfully!");
      getNotes();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage("Failed to add note. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="my-5" style={{ height: "20px" }}></div>
      <div className="container my-5 p-4 rounded shadow-lg bg-light" style={{ maxWidth: "600px" }}>
        <h1 className="my-4 text-center text-success">New Note Entry</h1>
        {successMessage && (
          <div className="alert alert-success text-center">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        )}
        <form onSubmit={handleClick}>
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="form-label fw-bold">
              Title
            </label>
            <input
              type="text"
              className="form-control border-success"
              id="title"
              name="title"
              value={note.title}
              onChange={onChange}
              placeholder="Enter note title"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-3">
          <label htmlFor="tag" className="form-label fw-bold">
            Tag
          </label>
          <input
            type="text"
            className="form-control border-success"
            id="tag"
            name="tag"
            placeholder="Enter note tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
          {/* Category */}
          <div className="mb-4">
            <label htmlFor="category" className="form-label fw-bold">
              Category
            </label>
            <select
              className="form-select border-success"
              id="category"
              name="category"
              value={note.category}
              onChange={onChange}
              required
              disabled={isSubmitting}
            >
              <option value="">Select a category</option>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="study">Study</option>
              <option value="others">Others</option>
            </select>
          </div>
          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="form-label fw-bold">
              Description
            </label>
            <textarea
              className="form-control border-success"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              rows="4"
              placeholder="Write your note here"
              required
              disabled={isSubmitting}
            />
          </div>
          {/* Submit Button */}
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-success w-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Note"}
            </button>
          </div>
        </form>
      </div>
      <div className="container">
        <h3>Your Notes</h3>
        <Notes />
      </div>
    </>
  );
}

export default AddNote;