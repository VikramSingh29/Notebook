import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/notContext';

function UpdateNote() {
    const location = useLocation();
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { editNote } = context;

    // Get the note passed via state
    const { note } = location.state || {};
    
    const [updatedNote, setUpdatedNote] = useState({
        title: '',
        description: '',
        tag: '',
        category: '',
    });

    // Populate the state with the passed note details
    useEffect(() => {
        if (note) {
            setUpdatedNote(note);
        }else {
          console.error("No note received, redirecting to notes page.");
          navigate('/'); // Redirect if no note is provided
      }
    }, [note,navigate]);

    const handleChange = (e) => {
        setUpdatedNote({ ...updatedNote, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Note Submitted:", updatedNote);
        // Call the context method to update the note
        editNote(
            updatedNote._id,
            updatedNote.title,
            updatedNote.description,
            updatedNote.tag,
            updatedNote.category
        );
        // Redirect to Notes page after update
        navigate('/');
    };

    return (
        <div className="container my-3">
            <h1>Update Your Note</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={updatedNote.title}
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
                        className="form-control"
                        id="tag"
                        name="tag"
                        value={updatedNote.tag}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                        Category
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="category"
                        name="category"
                        value={updatedNote.category}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={updatedNote.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                    Update Note
                </button>
            </form>
        </div>
    );
}

export default UpdateNote;
