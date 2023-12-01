const mongo =  require('mongoose')

const UserSchema = new mongo.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default : Date.now
    }
})

const UserCollection = new mongo.model('user',UserSchema)

module.exports = UserCollection