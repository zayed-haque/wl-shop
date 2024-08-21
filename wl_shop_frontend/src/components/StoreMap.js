import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

function StoreMap({ show, handleClose, product, location }) {
  useEffect(() => {
    if (show) {
      const map = L.map('store-map', {
        crs: L.CRS.Simple,
        minZoom: -1,
        maxZoom: 1,
      });

      const bounds = [[0, 0], [1000, 1000]];
      const image = L.imageOverlay('images/maps.png', bounds).addTo(map);
      map.fitBounds(bounds);

      // Create a custom icon
      const customIcon = L.icon({
        iconUrl: 'images/custom-marker.png', // Path to your custom marker image
        iconSize: [32, 32], // Size of the icon
        iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
        popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
      });

      // Add markers for different sections with custom icon
      const sections = {
        'You': [100, 220],
        'Shirts': [400, 450],
        // Add more sections as needed
      };

      Object.keys(sections).forEach((section) => {
        L.marker(sections[section], { icon: customIcon }).addTo(map).bindPopup(section);
      });

      // Check if location is defined and has valid coordinates
      if (location && location.x !== undefined && location.y !== undefined) {
        const productLocation = [location.x, location.y];
        L.marker(productLocation, { icon: customIcon }).addTo(map).bindPopup(`Product: ${product.name}`);

        // Add a route to the product location
        L.Routing.control({
          waypoints: [
            L.latLng(0, 0), // Starting point (e.g., entrance)
            L.latLng(productLocation[0], productLocation[1]), // Product location
          ],
          createMarker: function() { return null; }, // Hide default markers
        }).addTo(map);
      } else {
        console.error('Invalid product location:', location);
      }

      return () => {
        map.remove();
      };
    }
  }, [show, product, location]);

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Store Map</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5>Location of {product.name}</h5>
          <p>Section: {location ? location.section : 'Unknown'}</p>
          <div id="store-map" style={{ height: '400px', backgroundColor: '#f0f0f0' }}></div>
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