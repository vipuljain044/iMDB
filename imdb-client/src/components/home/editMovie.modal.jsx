import React, {useState} from 'react';

import {Modal, Button, Form} from "react-bootstrap";
import Select from 'react-select';

const EditMovieModal = ({movie, close, save, genres}) => {
  const [updatedMovie, setUpdatedMovies] = useState({...movie, genre: [...movie.genre.map(g => ({label: g, value: g}))]})
  const handleClose = () => close();
  const handleSave = () => save(updatedMovie);

  return (
    <>
      <Modal show={true} onHide={handleClose} style={{color: 'black'}}>
        <Modal.Header>
          <Modal.Title>{updatedMovie.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Director</Form.Label>
            <Form.Control type="text" placeholder="Enter Director Name" value={updatedMovie.director} onChange={(e) => setUpdatedMovies({...updatedMovie, director: e.target.value})}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>imDB Rating</Form.Label>
            <Form.Control type="text" placeholder="Enter iMDB Rating" value={updatedMovie.imdb_score}  onChange={(e) => setUpdatedMovies({...updatedMovie, imdb_score: e.target.value})}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Genre</Form.Label>
            <Select
              closeMenuOnSelect={false}
              defaultValue={updatedMovie.genre}
              isMulti
              options={genres.map((g => ({label: g, value: g})))}
              onChange= {(val) => setUpdatedMovies({...updatedMovie, genre: val})}
            />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSave()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditMovieModal;