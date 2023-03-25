const express = require('express');

const morgan = require('morgan');
const helmet = require('helmet');
const cores = require('cors');

require('dotenv').config();

const Song = require('./models/Song');

const app = express();

const connectDB = require('./config/db');

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));
app.use(helmet());
app.use(cores());
// app.use(errorHandler);

connectDB();

// run the server on port 3000 or the port defined in the environment
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// CREATE a new song
app.post('/', async (req, res) => {
  try {
    const { title, artist, album, genre } = req.body;
    const song = new Song({ title, artist, album, genre });
    await song.save();
    res.status(201).json(song);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ all songs
app.get('/', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ a single song
app.get('/:id', getSong, (req, res) => {
  res.json(res.song);
});

// UPDATE a song
app.post('/:id', getSong, async (req, res) => {
  if (req.body.title != null) {
    res.song.title = req.body.title;
  }
  if (req.body.artist != null) {
    res.song.artist = req.body.artist;
  }
  if (req.body.album != null) {
    res.song.album = req.body.album;
  }
  if (req.body.genre != null) {
    res.song.genre = req.body.genre;
  }
  try {
    const updatedSong = await res.song.save();
    res.json(updatedSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a song
app.delete('/:id', getSong, async (req, res) => {
  try {
    await res.song.deleteOne(); // use deleteOne() to remove the Song document
    res.json({ message: 'Deleted Song' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a single song by ID
async function getSong(req, res, next) {
  try {
    const song = await Song.findById(req.params.id);
    if (song == null) {
      return res.status(404).json({ message: 'Cannot find song' });
    }
    res.song = song; // set the retrieved document as res.song
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
