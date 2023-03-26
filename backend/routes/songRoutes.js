
const express = require('express')
const router = express.Router()
const songController=require('../controllers/songController')

router.route('/')
    .get(songController.getAllSong)
    .post(songController.createNewSong)
    .patch(songController.updateSong)
    .delete(songController.deleteSong)   

module.exports = router