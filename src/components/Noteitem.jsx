import React, { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import noteContext from "../context/notes/notContext";

function Noteitem({ note, updateNote }) {
  const { deleteNote } = useContext(noteContext);
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const description = note.description || ""; // Default to an empty string if undefined

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm border-light">
        <div className="card-body">
          <h5 className="card-title text-success">{note.title || "Untitled"}</h5>
          <p className="card-text text-muted">
            {description.length > 100 ? `${description.slice(0, 100)}...` : description}
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Tag:</strong> #{note.tag || "No Tag"}
          </li>
          <li className="list-group-item">
            <strong>Category:</strong> {note.category || "Uncategorized"}
          </li>
        </ul>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <div>
            <button
              className="btn btn-sm btn-success mx-1"
              onClick={() => updateNote(note)}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-danger mx-1"
              onClick={() => deleteNote(note._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{note.title || "Untitled"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{description}</p>
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
