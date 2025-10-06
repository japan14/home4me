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
  const [origin, setOrigin] = useState(null);
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");

  const mapContainerStyle = {
    width: "50%",
    height: "300px",
    float: "left",
  };
  const initialCenter = {
    //longitude,latitude for Baltimore
    lat: 39.2904,
    lng: -76.6122,
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setOrigin({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
          alert("Geolocation failed. Please allow location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  }; //user destination input

  const handleTravelModeChange = (event) => {
    setTravelMode(event.target.value);
  }; //user selected mode

  const handleSearch = () => {
    if (!origin) {
      alert("Please allow location access to find directions.");
      console.log("Origin is not set.");
      return;
    }
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: destination }, (results, status) => {
      // get users destination
      if (status === "OK" && results.length > 0) {
        const newCenter = results[0].geometry.location;
        setCenter({ lat: newCenter.lat(), lng: newCenter.lng() });

        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
          {
            origin: origin,
            destination: destination,
            travelMode: travelMode,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              setDirections(result);
              const route = result.routes[0].legs[0];
              setDuration(route.duration.text);
              setDistance(route.distance.text);
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
        {/* <h2> city </h2> */}
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
          <input
            type="text"
            placeholder="Destination"
            value={destination || ""}
            onChange={handleDestinationChange}
            style={{ width: "49%", marginBottom: "10px", padding: "5px" }}
          />
          <select
            value={travelMode}
            onChange={handleTravelModeChange}
            style={{ width: "50%", marginBottom: "10px", padding: "5px" }}
          >
            <option value="DRIVING">Driving</option>
            <option value="WALKING">Walking</option>
            <option value="BICYCLING">Bicycling</option>
          </select>
        </div>
        <div>
          <p>Duration: {duration}</p>
          <p>Distance: {distance}</p>
          <button
            className="content"
            onClick={handleSearch}
            style={{
              width: "50%",
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
