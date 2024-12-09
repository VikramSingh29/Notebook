import React, { useState } from "react";
import NoteContext from "./notContext";
import axios from "axios";

const NoteState = (props) => {
  const URI = "http://localhost:8080/api/notes";
  

  const [notes, setNotes] = useState([]);

// GEt all Notes
const getNotes = async () => {

    const response = await fetch (`${URI}/fetchallnotes`,{
        method: "GET",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDM3NjAzNzU3NmJjZGQ1MWViNjk2YyIsIm5hbWUiOiJUaG9zZHNyMXciLCJlbWFpbCI6InRoc29zZHIxZHdAZ21haWwuY29tIiwiaWF0IjoxNzMyNTEzMjA0fQ.cwbQN_1I_glKla_R2aJdR3K6NWyZYZgU8bRVeAMDuuk`
        }
    });
    
    const data = await response.json();
    setNotes(data.notes)
   

  
  };
  

  // Add a note

const addNote = async (title, description, tag, category) => {
   
    const response = await fetch (`${URI}/addnote`,{
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDM3NjAzNzU3NmJjZGQ1MWViNjk2YyIsIm5hbWUiOiJUaG9zZHNyMXciLCJlbWFpbCI6InRoc29zZHIxZHdAZ21haWwuY29tIiwiaWF0IjoxNzMyNTEzMjA0fQ.cwbQN_1I_glKla_R2aJdR3K6NWyZYZgU8bRVeAMDuuk`
        },
        body: JSON.stringify({title,description,category,tag})
    });
    



    const note =  {
        "user": "674376037576bcdd51eb696c",
        "title": title,
        "description": description,
        "tag": tag,
        "category": category,
        "_id": "675603ba234848cf49958dd2 [Added]",
        "date": "2024-12-08T20:38:18.804Z",
        "__v": 0
    }
   setNotes(notes.concat(note))
};

  // Delete a note
  const deleteNote = async(id) => {

    const response = await fetch (`${URI}/deletenote/${id}`,{
        method: "DELETE",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDM3NjAzNzU3NmJjZGQ1MWViNjk2YyIsIm5hbWUiOiJUaG9zZHNyMXciLCJlbWFpbCI6InRoc29zZHIxZHdAZ21haWwuY29tIiwiaWF0IjoxNzMyNTEzMjA0fQ.cwbQN_1I_glKla_R2aJdR3K6NWyZYZgU8bRVeAMDuuk`
        },
       
    });
    const json = response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };


// Edit a note

const editNote = async (id, title, description, tag, category) => {

    try{

        const response = await fetch (`${URI}/updatenote/${id}`,{
            method: "PUT",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDM3NjAzNzU3NmJjZGQ1MWViNjk2YyIsIm5hbWUiOiJUaG9zZHNyMXciLCJlbWFpbCI6InRoc29zZHIxZHdAZ21haWwuY29tIiwiaWF0IjoxNzMyNTEzMjA0fQ.cwbQN_1I_glKla_R2aJdR3K6NWyZYZgU8bRVeAMDuuk`
            },
            body: JSON.stringify({title, description, tag, category})
        });
        const json = response.json();
    
 for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if(element._id===id){
        element.title = title;
        element.description = description;
        element.tag = tag;
        element.category = category;
    }
 }
} catch(error){

}
};


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
