import React from 'react'
import { useContext, useState } from 'react';
import noteContext from '../context/notes/NoteContext';


const AddNote = (props) => {
    const context = useContext(noteContext);
  const {addNote}= context;

  const [note, setNote]= useState({title: "", description: "", tag: ""});

  const handleClick =(e)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""})
    props.showAlert("Note Added successfully", "success"); 
  }
  const onChange= (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }
  return (

      <div className="container my-3">
      <h1>Add a note</h1>
      <form className='my-3'>
        <div className="form-group mb-3">
          <label htmlFor="exampleInputEmail1">Title</label>
          <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" placeholder="Write Title here" value={note.title} onChange={onChange} minLength={5} required/>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="desc">Description</label>
          <input type="text" className="form-control" id="description" name="description" placeholder="Write Note here" value={note.description} onChange={onChange} minLength={5} required/>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="tag">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" placeholder="Write Tag here" value={note.tag} onChange={onChange}/>
        </div>
        
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>

    </div>
    
  )
}

export default AddNote
