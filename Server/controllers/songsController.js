const Song =require('../model/Song')
const asyncHandler = require('express-async-handler')

//@route GET /songs
const getAllSongs = asyncHandler( async (req, res)=>{

    const songs= await Song.find().lean()
    if(!songs?.length) {
        return res.status(400).json({message: 'No song found'})
    }
    res.json(songs)

})


//@route POST /songs
const addNewSongs =asyncHandler( async (req, res)=>{

    const {title,album,artist,genre} = req.body
    
    //confirm data
    if(!title || !album || !artist || !genre){
        return res.status(400).json({ message: 'All fileds are required'})
    }

    //check for duplicates
    const duplicate = await Song.findOne({title}).lean().exec()
    if(duplicate){
        return res.status(409).json({message: 'Duplicate Song'})
    }


    const songObject ={title,album,artist,genre}
    // create and store new song
    const song= await Song.create(songObject)
    if(song) {
        res.status(201).json({message: `New Song ${title} Added`})
    }else{
        res.status(400).json({message: 'Invalid Data Received'})
    }
})

//@route PATCH /songs
const updateSongs =asyncHandler( async (req, res)=>{

    const {id,title,album,artist,genre} = req.body

    //Confirm data
    if(!id|| !title || !album || !artist || !genre){
        return res.status(400).json({ message: 'All fileds are required'})
    }

    const song = await Song.findById(id).exec()

    if(!song){
        return res.status(400).json({message: 'User Not Found'})
    }

    //check for duplicate
    const duplicate =await Song.findOne({title}).lean().exec()
    //Allow update tp original Song
    if(duplicate && duplicate?._id.toString() !==id){
        return res.status(409).json({message: 'Duplicate Song Title'})
    }

    song.title = title
    song.album =album
    song.artist = artist
    song.genre = genre

    const updatedSong = await song.save()

    res.json({message: `${updateSong.title} Updated`})

})

//@route DELETE /songs
const deleteSongs =asyncHandler( async (req, res)=>{

    const { id }= req.body

    if(!id){
        return  res.status(400).json({message: 'Song ID Requried'})
    }

   const song= await Song.findById(id).exec()

   if(!song){
    return res.status(400).json({message: 'Song Not Found'})
   }

   const result =await song.deleteOne()

   const replay =  `Title ${result.title} with ID ${result._id} Deleted`

   res.json(replay)

})

module.exports = {
    getAllSongs,
    addNewSongs,
    updateSongs,
    deleteSongs
}