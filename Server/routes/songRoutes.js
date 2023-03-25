const express = require('express')
const router = express.Router()
const songsController = require('../controllers/songsController')

router.route('/')
    .get(songsController.getAllSongs)
    .post(songsController.addNewSongs)
    .patch(songsController.updateSongs)
    .delete(songsController.deleteSongs)

module.exports = router