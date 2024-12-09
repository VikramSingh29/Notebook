import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/notContext';
import Notes from './Notes';

function AddNote() {
  const { addNote } = useContext(noteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "", category: "" });

  // Handle form submission
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Submitting note:', note); // Debugging line
    addNote(note.title, note.description, note.tag, note.category);
    // Reset form fields after submission
    setNote({ title: "", description: "", tag: "", category: "" });
  };

  // Handle form field changes
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-4">
      <h1 className="my-4">Write Your Note:</h1>
      <form onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select className="form-select" id="category" name="category" onChange={onChange}>
            <option value="">Select a category</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            rows="3"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Note</button>
      </form>
  
    </div>
  );
}

export default AddNote;
