import React from "react";
import "./HouseSelc.css"
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";


function HouseSelc() {
  return (
    <div className="card-container">
      <Card className="bottom-left-card" sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component=""
            height="140"
            image=""
            alt="Kash helpingHands"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              #1
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              This is the top 1 shelter in your area. click to learn more!
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card className="bottom-left-card" sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component=""
            height="140"
            image="/static/images/cards/Salvation Army.jpeg"
            alt="SalvationArmy"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              #2
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              This is the top 2 shelter in your area. click to learn more!
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card className="bottom-left-card" sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component=""
            height="140"
            image="/static/images/cards/Tiny houses.jpeg"
            alt="TinyHouses"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              #3
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              This is the top 3 shelter in your area. click to learn more!
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card className="bottom-left-card" sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component=""
            height="140"
            image="/static/images/cards/IngeniumSolutions.jpeg"
            alt="IngeniumSolutions"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              #4
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              This is the top 4 shelter in your area. click to learn more!
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default HouseSelc;