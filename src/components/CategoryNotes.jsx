import React, { useContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/notContext";
import Noteitem from "./Noteitem";

function CategoryNotes() {
  const navigate = useNavigate();
  const { notes, getNotes } = useContext(noteContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        await getNotes();
      } catch (error) {
        setErrorMessage("Failed to fetch notes. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [getNotes]);

  const filteredNotes = useMemo(() => {
    return selectedCategory
      ? notes.filter((note) => note.category === selectedCategory)
      : notes;
  }, [selectedCategory, notes]);

  const handleClearFilter = () => {
    setSelectedCategory("");
  };

  if (isLoading) {
    return <div>Loading notes...</div>;
  }
  const handleUpdateNote = (note) => {
 
    navigate("/update-note", { state: { note } });
  };
  return (
    <div className="container my-4">
      <h2>Notes by Category</h2>
      {errorMessage && (
        <div className="alert alert-danger text-center">{errorMessage}</div>
      )}
      <div className="mb-3">
        <label htmlFor="categorySelect" className="form-label">
          Filter by Category:
        </label>
        <select
          id="categorySelect"
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {[...new Set(notes.map((note) => note.category || "Uncategorized"))].map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
        </select>
      </div>
      {selectedCategory && (
        <button className="btn btn-secondary mb-3" onClick={handleClearFilter}>
          Clear Filter
        </button>
      )}
      <div className="row">
        {filteredNotes.length === 0 ? (
          <p>No notes available for the selected category.</p>
        ) : (
          filteredNotes.map((note) => (
            <Noteitem key={note._id || Math.random()} note={note} updateNote={handleUpdateNote}  />
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryNotes;
