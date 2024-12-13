import React, { useContext, useEffect, useState } from "react";
import CategoryNotes from "./CategoryNotes";
import Noteitem from "./Noteitem";
import noteContext from "../context/notes/notContext";
import {  useNavigate } from "react-router-dom";
import  "../Styles/utils.css"

function Home() {
  const { notes, getNotes } = useContext(noteContext);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        if (localStorage.getItem("authToken")) {
          await getNotes();
        } else {
          navigate("/login");
        }
      } catch (error) {
        setErrorMessage("Failed to load notes. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [navigate, getNotes]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleUpdateNote = (note) => {
    navigate("/update-note", { state: { note } });
  };

  // Safely get recent notes
  const recentNotes = Array.isArray(notes) ? notes.slice(-3) : [];

  return (
    <div className="home-container my-3 ">
      <div className="jumbotron container margin bg-success d-flex  flex-column justify-content-center align-items-center " style={{height:'250px',borderRadius:'15px', color:'white'}}>
        <h1>Welcome to Your Notes App</h1>
        <p>Organize your thoughts and stay productive!</p>
      </div>

      <div className="container my-4">
        <h2>Explore Your Notes by Category</h2>
        <CategoryNotes />
      </div>

      <div className="container my-4">
        <h2>Recent Notes</h2>
        {errorMessage && (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        )}
        <div className="row">
          {recentNotes.length > 0 ? (
            recentNotes.map((note) => (
              <Noteitem
                key={note._id || Math.random()}
                note={note}
                updateNote={handleUpdateNote} 
              />
            ))
          ) : (
            <p className="text-muted text-center">No recent notes available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
