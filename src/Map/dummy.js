import React, { useEffect, useState, useRef } from "react";
import "./map.css";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const api_key = process.env.REACT_APP_API_KEY;
function Map() {
  const mapRef = useRef(null);
  const [shelters, setShelters] = useState([]);
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [directions, setDirections] = useState(null);
  const [travelMode, setTravelMode] = useState("DRIVING");
  const [destination, setDestination] = useState("");
  const [center, setCenter] = useState({ lat: 39.2904, lng: -76.6122 });

  const mapContainerStyle = {
    width: "50%",
    height: "400px",
    float: "left",
  };
  // const center = {
  //   //longitude,latitude for Baltimore
  //   lat: 39.2904,
  //   lng: -76.6122,
  // };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  }; //user destination input

  const handleTravelModeChange = (event) => {
    setTravelMode(event.target.value);
  }; //user selected mode

  const handleSearch = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: destination }, (results, status) => {
      if (status === "OK" && results.length > 0) {
        const newCenter = results[0].geometry.location;
        setCenter({ lat: newCenter.lat(), lng: newCenter.lng() });

        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
          {
            origin: center,
            destination: destination,
            travelMode: travelMode,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              setDirections(result);
            } else {
              console.error("Error fetching directions:", result);
              setDirections(null);
            }
          }
        );
      }
    });
  };

  return (
    <div className="Map">
      <header className="Map-container">
        <LoadScript googleMapsApiKey={api_key}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={14}
            streetViewControl={true}
          >
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </LoadScript>
        <div>
          <h3>Find Routes</h3>
          <input
            type="text"
            placeholder="Destination"
            value={destination || ""}
            onChange={handleDestinationChange}
            style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
          />
          <select
            value={travelMode}
            onChange={handleTravelModeChange}
            style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
          >
            <option value="DRIVING">Driving</option>
            <option value="WALKING">Walking</option>
            <option value="BICYCLING">Bicycling</option>
          </select>
          <button
            onClick={handleSearch}
            style={{
              width: "100%",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            Get Directions
          </button>
        </div>
      </header>
    </div>
  );
}

export default Map;
