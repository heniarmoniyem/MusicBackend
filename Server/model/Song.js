const mongoose = require('mongoose')
const  AutoIncrement = require('mongoose-sequence')(mongoose)

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    album: {
        type: String,
        required: true
    },
    
    artist: {
        type: String,   
        required: true
    },
    genre: {
        type: String,
        required: true
    },
      
})

songSchema.plugin(AutoIncrement, {
    inc_field: 'ID',
    id: 'SongID',
    start_seq:1
})


module.exports= mongoose.model('Song', songSchema)