import React, { useState } from 'react';
import Container from './Styles/Container';
import Form from './Styles/Form';
import Main from './Styles/Main';
import Table from './Styles/Table';

import EditIcon from '@mui/icons-material/Edit';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

function App() {
  const [songList, setSongList] = useState([
    { id: 1, title: 'test', artist: 'test', album: 'test', genre: 'test' },
    { id: 2, title: 'test', artist: 'test', album: 'test', genre: 'test' },
  ]);

  const handleEdit = (id) => {
    //edit
    console.log('Edit: ', id);
  };

  const handleDelete = (id) => {
    //delete
    console.log('Delete: ', id);
  };
  return (
    <Container>
      <Main>
        <Form>
          <h1>List of songs</h1>
          <div className="container">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title of the song...."
            />
            <input
              type="text"
              id="artist"
              name="artist"
              placeholder="Artist of the song...."
            />

            <input
              type="text"
              id="album"
              name="album"
              placeholder="Album of the song...."
            />
            <input
              type="text"
              id="genre"
              name="genre"
              placeholder="Genre of the song...."
            />
            <button type="submit">Submit</button>
          </div>
        </Form>

        {/* <div
          contentEditable
          onInput={handleTextChange}
          dangerouslySetInnerHTML={{ __html: text }}
        ></div> */}
        {/* <p className="edit_instruction">
          <EditIcon />
          Double click on the items to Edit
        </p> */}
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
                <td onClick={() => handleEdit(song.id)}>
                  <EditIcon />
                </td>
                <td onClick={() => handleDelete(song.id)}>
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
