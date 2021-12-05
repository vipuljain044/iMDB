import React, {useState} from 'react';
import {Modal, Button, Form} from "react-bootstrap";
import Select from 'react-select';

const AddMovieModal = ({close, save, genres}) => {
  const [addMovie, setAddMovie] = useState({})
  const handleClose = () => close();
  const handleSave = () => save(addMovie);

  return (
    <>
      <Modal show={true} onHide={handleClose} style={{color: 'black'}}>
        <Modal.Header>
          <Modal.Title>Add New Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Form.Group className="mb-3">
            <Form.Label>Movie Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Movie Name" value={addMovie.name} onChange={(e) => setAddMovie({...addMovie, name: e.target.value})}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Director</Form.Label>
            <Form.Control type="text" placeholder="Enter Director Name" value={addMovie.director} onChange={(e) => setAddMovie({...addMovie, director: e.target.value})}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>imDB Rating</Form.Label>
            <Form.Control type="text" placeholder="Enter iMDB Rating" value={addMovie.imdb_score}  onChange={(e) => setAddMovie({...addMovie, imdb_score: e.target.value})}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Genre</Form.Label>
            <Select
              closeMenuOnSelect={false}
              defaultValue={addMovie.genre}
              isMulti
              options={genres.map((g => ({label: g, value: g})))}
              onChange= {(val) => setAddMovie({...addMovie, genre: val})}
            />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSave()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddMovieModal;