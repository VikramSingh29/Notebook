import React, { useState, useCallback, useMemo } from "react";
import NoteContext from "./notContext";

const NoteState = (props) => {
  const URI = "http://localhost:8080/api/notes";
  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem("authToken");

  const apiHeaders = useMemo(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }), [token]);

  const getNotes = useCallback(async () => {
    try {
      const response = await fetch(`${URI}/fetchallnotes`, {
        method: "GET",
        headers: apiHeaders,
      });
      const data = await response.json();
      if (response.ok) {
        setNotes(data.notes || []);
      } else {
        throw new Error(data.message || "Failed to fetch notes");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }, [apiHeaders]);

  const addNote = useCallback(async (title, description, tag, category) => {
    try {
      const response = await fetch(`${URI}/addnote`, {
        method: "POST",
        headers: apiHeaders,
        body: JSON.stringify({ title, description, tag, category }),
      });
      const newNote = await response.json();
      if (response.ok) {
        setNotes((prevNotes) => [...prevNotes, newNote]);
      } else {
        throw new Error(newNote.message || "Failed to add note");
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }, [apiHeaders]);

  const deleteNote = useCallback(async (id) => {
    try {
      const response = await fetch(`${URI}/deletenote/${id}`, {
        method: "DELETE",
        headers: apiHeaders,
      });
      if (response.ok) {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      } else {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }, [apiHeaders]);

  const editNote = useCallback(async (id, title, description, tag, category) => {
    try {
      const response = await fetch(`${URI}/updatenote/${id}`, {
        method: "PUT",
        headers: apiHeaders,
        body: JSON.stringify({ title, description, tag, category }),
      });
      if (response.ok) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === id
              ? { ...note, title, description, tag, category }
              : note
          )
        );
      } else {
        const error = await response.json();
        throw new Error(error.message || "Failed to update note");
      }
    } catch (error) {
      console.error("Error editing note:", error);
    }
  }, [apiHeaders]);

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;