import React, { useContext, useEffect, useState } from 'react';
import '../Styles/Home.css';
import CategoryNotes from './CategoryNotes';
import Noteitem from './Noteitem'; // Make sure this is imported if you're showing recent notes
import noteContext from '../context/notes/notContext';
import { Link } from 'react-router-dom';

function Home() {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  const [recentNotes, setRecentNotes] = useState([]);

  useEffect(() => {
    getNotes();
    setRecentNotes(notes.slice(-3)); // Show the 3 most recent notes
  }, [notes]);

  return (
  
    <div className="home-container my-5" style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
      <div className="jumbotron text-center" style={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '10px' }}>
        <h1>Welcome to Your Notes App</h1>
        <p className="lead">Organize your thoughts and stay productive!</p>
      </div>

      <div className="container my-4">
        <h2 className="my-4">Explore Your Notes by Category</h2>
        <CategoryNotes />
      </div>

      {/* New section for recent notes */}
      <div className="container my-4">
        <h2 className="my-4">Recent Notes</h2>
        <div className="row">
          {recentNotes.map((note) => (
            <Noteitem key={note._id} note={note} />
          ))}
        </div>
      </div>

      {/* Additional section for app features */}
      <div className="container my-4">
        <h2 className="my-4">App Features</h2>
        <ul>
          <li>Organize notes by categories like personal, work, and more.</li>
          <li>Quickly add and edit notes to stay productive.</li>
          <li>Search notes easily using filters or tags.</li>
        </ul>
      </div>

      {/* Optional interactive widget */}
      <div className="container my-4 text-center">
      <Link to='/addnote'> <button className="btn btn-primary">Add a New Note</button></Link>
      </div>
    </div>
  );
}

export default Home;
