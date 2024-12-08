import React,{ useContext } from 'react';
import noteContext from '../context/notes/notContext';

function Noteitem(props) {
    const context = useContext(noteContext);
    const {deleteNote} = context;
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque tempore tempora, at consequuntur, harum, quaerat ipsum unde rerum rem velit laudantium quibusdam aut? Distinctio, ut. Magnam excepturi natus fugiat quibusdam, numquam qui consequuntur accusamus?</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Tag: #{note.tag}</li>
          <li className="list-group-item">Category: {note.category} </li>
        </ul>
        <div className="card-body">
          <button className="btn btn-sm btn-primary mx-1"> Edit </button>
          <button className="btn btn-sm btn-danger mx-1" onClick={()=>{deleteNote(note._id)}}> Delete </button>
          
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
