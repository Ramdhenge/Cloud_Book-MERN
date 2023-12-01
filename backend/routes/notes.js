const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')

// Rout 1
// Get all notes using : GET "/api/notes/getdata". *login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal server error')
    }
}
)
// Rout 2
// Add new note using : GET "/api/notes/addnote". *login required
router.post('/addnote', fetchuser, [
    body('title', 'Title should be minimum 3 char').isLength({ min: 3 }),
    body('description', 'description should be minimum 5 char').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        //If there are any errors then returns Bad request
        const err = validationResult(req)
        if (!err.isEmpty()) {
            return res.status(400).json({ err: err.array() })
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savednote = await note.save()
        res.json(savednote)

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal server error')
    }
})

// Rout 3
// Update an existing note using : PUT "/api/notes/updatenote/:id". *login required
router.put('/updatenote/:id', fetchuser, [
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        //Create newnode object
        let newnote = {}
        if (title) { newnote.title = title }
        if (description) { newnote.description = description }
        if (tag) { newnote.tag = tag }

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not Found")
        }
        //Allow Updation inly if the user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized User")
        }
        //Update
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
        res.json({ note })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Internal server error')
    }
})

// Rout 4
// Delete an existing note using : DELETE "/api/notes/deletenote". *login required
router.delete('/deletenote/:id', fetchuser, [
], async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not Found")
        }
        //Allow dletion inly if the user owns the note 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized User")
        }
        //Delete
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "success": "Note has been deleted", note: note })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Internal server error')
    }
})
module.exports = router