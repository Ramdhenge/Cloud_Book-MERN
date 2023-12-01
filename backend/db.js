const mongo = require('mongoose')
mongo.connect('mongodb://localhost:27017/cloudBook')
// .then(()=>{
//     console.log('Connected to Mongo Successfully');
// })
.catch((err)=>{
    console.log(err);
})

module.exports = mongo