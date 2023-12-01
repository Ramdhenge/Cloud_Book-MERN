import React, { useContext } from 'react'
import remove from './icons/delete.svg'
import edit from './icons/edit.svg'
import NoteContext from '../context/notes/NoteContext'

const NoteItem = (props) => {

    const context = useContext(NoteContext)
    const { deleteNote } = context
    const { note, updateNote } = props

    return (
        <div className='col-md-3'>
            <div className="card  my-3">
                <img src={edit} alt="Edit" onClick={() => { updateNote(note) }} className='icon icon-edit' />
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <img src={remove} alt="Delete" className='icon' onClick={() => {
                        const con = window.confirm("Do you want to delete this note?")
                        if(con === true){
                        deleteNote(note._id); 
                        props.showAlert("Deleted Successfully", "success")
                        }
                        else{
                            
                        }
                    }} />
                </div>
            </div>
        </div>
    )
}

export default NoteItem
