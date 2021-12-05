import React from 'react';

import {Modal, Button} from "react-bootstrap";

const DeleteMovieModal = ({movie, close, remove}) => {
  const handleClose = () => close();
  const handleDelete = () => remove(movie._id);

  return (
    <>
      <Modal show={true} onHide={handleClose} style={{color: 'black'}}>
        <Modal.Header>
          <Modal.Title>Delete {movie.name}</Modal.Title>
        
        </Modal.Header>
        <Modal.Body> Do you want to delete <b>{movie.name}</b>?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteMovieModal;