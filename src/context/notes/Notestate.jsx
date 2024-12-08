import React, { useState } from "react";
import NoteContext from "./notContext";
import axios from "axios";

const NoteState = (props) => {
  const URI = "http://localhost:8080/api/notes";
  

  const [notes, setNotes] = useState([]);

// GEt all Notes
const getNotes = async () => {
    try {
      // API call to fetch notes
      const response = await axios.get(`${URI}/fetchallnotes`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDM3NjAzNzU3NmJjZGQ1MWViNjk2YyIsIm5hbWUiOiJUaG9zZHNyMXciLCJlbWFpbCI6InRoc29zZHIxZHdAZ21haWwuY29tIiwiaWF0IjoxNzMyNTEzMjA0fQ.cwbQN_1I_glKla_R2aJdR3K6NWyZYZgU8bRVeAMDuuk"
        },
      });
  
      // Handle the response
      console.log("Notes fetched successfully:", response.data);
  
      if (Array.isArray(response.data.notes)) {
        setNotes(response.data.notes);
      } 
  
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };
  

  // Add a note

const addNote = async (title, description, tag, category) => {
  try {
    // Prepare the data to be sent in the request
    const data = { title, tag , category ,description};
    console.log('Data being sent to the server:', data);

    // API Call using Axios
    const response = await axios.post(
      `${URI}/addnote`, // Replace `URI` with your base API URL
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDM3NjAzNzU3NmJjZGQ1MWViNjk2YyIsIm5hbWUiOiJUaG9zZHNyMXciLCJlbWFpbCI6InRoc29zZHIxZHdAZ21haWwuY29tIiwiaWF0IjoxNzMyNTEzMjA0fQ.cwbQN_1I_glKla_R2aJdR3K6NWyZYZgU8bRVeAMDuuk", // Replace with your actual JWT token
        },
      }
    );

    // Extract the newly added note from the API response
    const newNote = response.data.note;

    // Update the local notes array
    setNotes(notes.concat(newNote)); // Add the new note to the existing state

    console.log("Note added successfully", newNote);
  } catch (error) {
    console.error("Error adding note:", error.message);
  }
};

  // Delete a note
  const deleteNote = (id) => {
    console.log("deleteNote " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };


// Edit a note

const editNote = async (id, title, description, tag, category) => {
  try {
    // Prepare the data to be sent in the request
    const data = { title, description, tag, category };

    // API Call using Axios
    const response = await axios.put(
      `${URI}/updatenote/${id}`, // Replace `URI` with your base API URL
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_JWT_TOKEN", // Replace with your actual JWT token
        },
      }
    );

    // Extract updated note from response
    const updatedNote = response.data;

    // Update the local notes array
    const updatedNotes = notes.map((note) =>
      note._id === id ? { ...note, ...updatedNote } : note
    );

    setNotes(updatedNotes); // Update state with new notes
    console.log("Note updated successfully", updatedNote);
  } catch (error) {
    console.error("Error updating note:", error.message);
  }
};


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
