import React from "react";
import Navbar from "./frontend/Navbar";
import Chatbot from "./frontend/Chatbot";
import HouseSelec from "./frontend/HouseSelc";
import Filter from "./frontend/Filter";
import Map from "./Map/map";
import "./App.css";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";



function App() {
  return (
    <div className="App">
      <Navbar />
      <Chatbot />
      <HouseSelec />
      <Map />
      <Filter />
    </div>
  );
}

export default App;
