import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/notContext';
import Noteitem from './Noteitem';

function CategoryNotes() {
    const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const handleUpdateNote = (note) => {
    console.log('Edit button clicked for note:', note);
    navigate('/update-note', { state: { note } });
};
  useEffect(() => {
    getNotes();
  }, [getNotes]);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = notes.filter(note => note.category === selectedCategory);
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes);
    }
  }, [selectedCategory, notes]);
  // Group notes by category
  const categorizedNotes = notes.reduce((acc, note) => {
    if (!acc[note.category]) {
      acc[note.category] = [];
    }
    acc[note.category].push(note);
    return acc;
  }, {});
  return (
    <div className="container my-4">
      <h2>Notes by Category</h2>
      <div className="mb-3">
        <label htmlFor="categorySelect" className="form-label">Filter by Category:</label>
        <select
          id="categorySelect"
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {Array.from(new Set(notes.map(note => note.category))).map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="row">
        {filteredNotes.map((note) => (
          <Noteitem key={note._id} note={note} updateNote={handleUpdateNote}/>
        ))}
      </div>

      <div>
      {Object.keys(categorizedNotes).map((category) => (
        <div key={category} className="category-section">
          <h3 className="category-title">{category}</h3>
          <div className="row">
            {categorizedNotes[category].map((note) => (
              <Noteitem key={note._id} note={note} updateNote={() => {}} />
            ))}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default CategoryNotes;
