const express = require('express')
const app = express()
require('./db')
const port = 5000
var cors = require('cors');
app.use(cors());

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port,()=>{
    console.log('Server has been started');
})