import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/notContext";
import Noteitem from "./Noteitem";

function Notes() {
  const { notes, getNotes } = useContext(noteContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      getNotes().catch((error) => {
        console.error("Error fetching notes:", error);
      });
    } else {
      navigate("/login");
    }
  }, [navigate, getNotes]);

  const handleUpdateNote = (note) => {
    console.log("Updating note:", note);
    navigate("/update-note", { state: { note } });
  }

  return (
    <div className="container my-3">
      <h2 className="mb-4">Your Notes</h2>
      <div className="row">
        {notes.length > 0 ? (
          notes.map((note) => (
            <Noteitem
              key={note._id || `${note.title}-${note.category}`}
              note={note}
              updateNote={handleUpdateNote}
            />
          ))
        ) : (
          <p className="text-muted">No notes available. Add some to get started!</p>
        )}
      </div>
    </div>
  );
}

export default Notes;