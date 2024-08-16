import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function StoreMap({ show, handleClose, product, location }) {
  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Store Map</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5>Location of {product.name}</h5>
          <p>Section: {location.section}</p>
          {/* Replace the following div with your actual store map implementation */}
          <div style={{ height: '400px', backgroundColor: '#f0f0f0' }}>
            <img src="images/map.jpeg" alt="Store Map" style={{height:'300px', width:'340px'}} />
          </div>
          Category: Home Electronics
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StoreMap;