import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/notContext';
import Noteitem from './Noteitem';

function Notes() {
    
    const { notes, getNotes } = useContext(noteContext);
    const navigate = useNavigate();

    // Fetch notes when the component mounts
    useEffect(() => {
        getNotes();
    }, [getNotes]);

    // Handle the update note functionality
    const handleUpdateNote = (note) => {
        console.log('Edit button clicked for note:', note);
        navigate('/update-note', { state: { note } });
    };

    return (
        <div className="container my-3">
            <h2 className="mb-4">Your Notes</h2>
            <div className="row">
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <Noteitem key={note._id} note={note} updateNote={handleUpdateNote} />
                    ))
                ) : (
                    <p className="text-muted">No notes available. Add some to get started!</p>
                )}
            </div>
        </div>
    );
}

export default Notes;
