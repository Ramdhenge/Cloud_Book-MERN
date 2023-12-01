import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)


  // Get all notes
  const getNotes = async () => {
    // API call
    let url = `${host}/api/notes/fetchallnotes`
    const response = await fetch(url, {
      method: "GET", 
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const note = await response.json()
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async(id) => {
    // API call
    let url = `${host}/api/notes/deletenote/${id}`
    const response = await fetch(url, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    // const json = response.json()
    
    // Delete logic
    const newNote = notes.filter((note)=>{return note._id !== id})
    setNotes(newNote)
  }

  // Update a Note
  const editNote = async(id, title, description, tag) => {
    // API call
    let url = `${host}/api/notes/updatenote/${id}`
    const response = await fetch(url, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}), 
    });
    // const json = await response.json()
    

    // To create deep copy of notes to update it on FrontEnd
    const newNote = JSON.parse(JSON.stringify(notes))
    // Edit logic 
    for (let i = 0; i < newNote.length; i++) {
      const element = newNote[i];
      if(element._id === id){
        newNote[i].title = title
        newNote[i].description = description
        newNote[i].tag = tag
        break;
      } 
    }
    setNotes(newNote)
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState