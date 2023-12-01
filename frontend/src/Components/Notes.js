import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {

  const context = useContext(NoteContext)
  const { notes, getNotes, editNote } = context
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "Default" })
  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes()
  }
  else{
    navigate('/login')
  }
    // eslint-disable-next-line
  }, [])

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }

  const ref = useRef(null)
  const refclose = useRef(null)

  const handleClick = (e) => {
    e.preventDefault()
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refclose.current.click()
    props.showAlert("Updated Successfully","success")
  }

  const onChange = (e) => {
    // The chnages of input fields should add to name through value
    setNote({ ...note, [e.target.name]: e.target.value })
  }


  return (
    <>
      <AddNote showAlert={props.showAlert} />
      {/* Button trigger modal  */}
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* Modal  */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="etitle" onChange={onChange} required minLength={5} />
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} required />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h3>Your Notes</h3>
        <div className="container my-3 " >
          {notes.length === 0 && "No Record Found"}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
        })}
      </div>
    </>
  )
}

export default Notes
