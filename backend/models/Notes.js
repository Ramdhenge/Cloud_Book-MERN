const { default: mongoose } = require('mongoose')
const mongo =  require('mongoose')

const NotesSchema = new mongo.Schema({
    //Get all notes according to specific user ID
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default : Date.now
    }
})

const notesCollection = mongo.model('notes',NotesSchema)

module.exports = notesCollection