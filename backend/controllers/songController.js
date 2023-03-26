const Song = require('../models/Song')
const asyncHandeler = require('express-async-handler')




//Get all Songs in the List

const getAllSong = asyncHandeler( async(req, res) =>{

    const songs = await Song.find().lean()
    if(!songs?.length){
            return res.status(400).json({message:'No Song Found in the List'})
    }
    res.json(songs)

})


// Add Songs to the List
const createNewSong = asyncHandeler(async(req, res) =>{
        const {title, album, artist, genre} = req.body
       
        
        const duplicate = await Song.findOne({title}).lean().exec()

        if(duplicate){
            return res.status(409).json({message: 'Duplicate Song'})
        }

        const songObject= {title, album, artist, genre}

        const song= await Song.create(songObject)

            if(song){
                res.status(201).json({message: `New Song ${title} Added to the List`})
            }else{
                res.status(400).json({message: 'Invalid data received'})
            }

})


//Update Song

const updateSong = asyncHandeler(async(req, res) =>{
    const {title, album, artist, genre} = req.body

   
    const song= await Song.findById(id).exec()

    if(!song){
        return res.status(400).json({message: 'User Not found'})
    }

    // const duplicate = await Song.findOne({name}).lean().exec()
    // if(duplicate && duplicate?._id.toString()  !== id){
    //     return res.status(409).json({message: 'Duplicate name'})
    // } 

    song.title= title
    song.album=album
    song.artist=artist
    song.genre=genre

    const updateSong= await song.save()

    res.json({message: `${updateSong.title} updated`})
    
})


//Remove Song from list

const deleteSong = asyncHandeler(async(req, res) =>{
        const {id} = req.body
        if(!id){
            return res.status(400).json({message: 'Song ID Required'})
        }

    const song= await Song.findById(id).exec()
    if(!song){  
        return res.status(400).json({message: 'Song Not Found'})
    }

    const result = await song.deleteOne()

    const reply = `Song ${result.title} with ID ${result.id} deleted`

    res.json(reply)
})

module.exports={
    getAllSong,
    createNewSong,
    updateSong,
    deleteSong
}