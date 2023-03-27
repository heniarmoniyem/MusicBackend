import React, { useRef, useState } from 'react';
import Container from './Styles/Container';
import Form from './Styles/Form';
import Main from './Styles/Main';
import Table from './Styles/Table';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  fetchSongs,
  postSongs,
  deleteSongs,
  updateSongs,
} from './redux/songSlice/songThunks';
import { useSelector } from 'react-redux';

import EditIcon from '@mui/icons-material/Edit';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import EditForm from './Styles/EditForm';

function App() {
  const songList = useSelector((state) => state.songs.songs);
  const formRef = useRef(null);
  const editRef = useRef(null);

  const [isEdit, setisEdit] = useState(false);
  const [editingSong, seteditingSong] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSongs());
  }, []);

  const handleEdit = (id) => {
    //edit
    console.log('Edit: ', songList);
    setisEdit(true);
    const filteredObject = songList.find((object) => object._id === id);
    seteditingSong(filteredObject);
  };

  const confirmEdit = (e) => {
    e.preventDefault();
    console.log('confirm Edit', editingSong);
    dispatch(
      updateSongs({
        id: editingSong._id,
        title: editingSong.title,
        album: editingSong.album,
        artist: editingSong.artist,
        genre: editingSong.genre,
      })
    );
    setisEdit(false);
    seteditingSong({});
  };

  const handleDelete = (id) => {
    //delete
    dispatch(deleteSongs({ id }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;

    // check if input fields have a value or not
    const title = form.title.value;
    const artist = form.artist.value;
    const album = form.album.value;
    const genre = form.genre.value;

    if (!title || !artist || !album || !genre) {
      return;
    }

    // submit the form
    // form.submit();
    dispatch(postSongs({ title, artist, album, genre }));
    form.title.value = '';
    form.artist.value = '';
    form.album.value = '';
    form.genre.value = '';
  };
  return (
    <Container>
      <Main>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>List of songs</h1>
          <div className="container">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title of the song...."
              required
            />
            <input
              type="text"
              id="artist"
              name="artist"
              placeholder="Artist of the song...."
              required
            />

            <input
              type="text"
              id="album"
              name="album"
              placeholder="Album of the song...."
              required
            />
            <input
              type="text"
              id="genre"
              name="genre"
              placeholder="Genre of the song...."
              required
            />
            <button type="submit">Submit</button>
          </div>
        </Form>
        {isEdit ? (
          <EditForm ref={editRef} onSubmit={confirmEdit}>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title of the song...."
              value={editingSong.title}
              onChange={(e) =>
                seteditingSong({ ...editingSong, title: e.target.value })
              }
              required
            />
            <input
              type="text"
              id="artist"
              name="artist"
              placeholder="Artist of the song...."
              value={editingSong.artist}
              onChange={(e) =>
                seteditingSong({ ...editingSong, artist: e.target.value })
              }
              required
            />

            <input
              type="text"
              id="album"
              name="album"
              placeholder="Album of the song...."
              value={editingSong.album}
              onChange={(e) =>
                seteditingSong({ ...editingSong, album: e.target.value })
              }
              required
            />
            <input
              type="text"
              id="genre"
              name="genre"
              placeholder="Genre of the song...."
              value={editingSong.genre}
              onChange={(e) =>
                seteditingSong({ ...editingSong, genre: e.target.value })
              }
              required
            />
            <button type="submit">Submit</button>
            <button
              className="cancel"
              type="button"
              onClick={() => {
                setisEdit(false);
                seteditingSong({});
              }}
            >
              Cancel
            </button>
          </EditForm>
        ) : null}

        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Genre</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {songList.map((song, index) => (
              <tr key={index}>
                <td>{song.artist}</td>
                <td>{song.title}</td>
                <td>{song.album}</td>
                <td>{song.genre}</td>
                <td onClick={() => handleEdit(song._id)}>
                  <EditIcon />
                </td>
                <td onClick={() => handleDelete(song._id)}>
                  <DeleteSweepIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Main>
    </Container>
  );
}

export default App;
