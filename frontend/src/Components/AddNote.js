import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

const AddNote = (props) => {
  const context = useContext(NoteContext)
  const { addNote } = context
  const [note, setNote] = useState({ title: "", description: "", tag: "" })

  const handleClick = (e) => {
    e.preventDefault()
    addNote(note.title, note.description, note.tag)
    setNote({title: "", description :"", tag :""}) 
    props.showAlert("Note Added Successfully","success")
  }

  const onChange = (e) => {
    // The chnages of input fields should add to name through value
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <div className="container my-4 ">
      <h1>Add Notes</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} required minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange} required minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} required minLength={5} />
        </div>
        <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add</button>
      </form>
    </div>
  )
}

export default AddNote
