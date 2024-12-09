import React, { useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import noteContext from '../context/notes/notContext';
import '../Styles/Noteitem.css'; // Import additional CSS for custom styling

function Noteitem(props) {
  const { deleteNote } = useContext(noteContext);
  const { note, updateNote } = props;

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Function to count words in the description
  const wordCount = note.description.split(/\s+/).length;

  return (
    <div className="col-md-4 mb-4">
      <div className="card note-card shadow-sm border-light">
        <div className="card-body">
          <h5 className="card-title text-primary">{note.title}</h5>
          <p className="card-text text-muted">
            {wordCount > 50 ? `${note.description.slice(0, 150)}...` : note.description}
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Tag:</strong> #{note.tag}
          </li>
          <li className="list-group-item">
            <strong>Category:</strong> {note.category}
          </li>
        </ul>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <div>
            <button className="btn btn-sm btn-primary mx-1" onClick={() => updateNote(note)}>
              Edit
            </button>
            <button className="btn btn-sm btn-danger mx-1" onClick={() => deleteNote(note._id)}>
              Delete
            </button>
          </div>
          {wordCount > 50 && (
            <button className="btn btn-sm btn-info" onClick={handleShow}>
              View
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{note.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{note.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Noteitem;
