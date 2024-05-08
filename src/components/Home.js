import React from "react";
import "./Home.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "./Dashhead";
import {
  Box,
  Card,
  CardActionArea,
  Grid,
} from "@mui/material";

import Darkmode from "./Darkmode";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Home() {
  const [display, setDisplay] = React.useState(false);
  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={1} display={display} />
      </div>

      <div
        className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container"
        onClick={() => display && setDisplay(false)}
      >
        <span className="iconbutton display-mobile">
          <IconButton
            size="large"
            aria-label="Menu"
            onClick={() => setDisplay(true)}
          >
            <MenuIcon fontSize="inherit" />
          </IconButton>
        </span>
        <h1 className="my-5 title text-center">
            Dashboard
          </h1>
      
        <Grid container    rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid  xs={4}>
    
    <Box>
      <Link to ="/Geneticstock">
      <Card sx={{ maxWidth: 345, height: 194 }} className="cardStyle card1">
            <CardActionArea>
              <h1 className="center-text">TCGC</h1>
            </CardActionArea>
          </Card>
      </Link>
          
        </Box>
  </Grid>
  <Grid  xs={4}>
  <Box>
  <Link to ="/Microbiologystock">
          <Card sx={{ maxWidth: 345, height: 194 }} className="cardStyle card2">
            <CardActionArea>
              <h1 className="center-text">Microbiology</h1>
            </CardActionArea>
          </Card>
          </Link>
        </Box>
  </Grid>
  
  <Grid  xs={4}>
  <Box> 
    
<Link to="/Centralsection">


          <Card sx={{ maxWidth: 345, height: 194 }} className="cardStyle card3">
            <CardActionArea>
              <h1 className="center-text">Central </h1>
            </CardActionArea>
          </Card>
          </Link>
        </Box>
  </Grid>

  </Grid>
        <Grid container  sx={{my:3}}   rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid  xs={4}>
    <Box>
    <Link to="/Parasitology">
          <Card sx={{ maxWidth: 345, height: 194 }} className="cardStyle card4">
            <CardActionArea>
              <h1 className="center-text">Parasitology</h1>
            </CardActionArea>
          </Card>
          </Link>
        </Box>
  </Grid>
  <Grid  xs={4}>
  <Box>
    <Link to="/Generalstock">
          <Card sx={{ maxWidth: 345, height: 194 }} className="cardStyle card5">
            <CardActionArea>
              <h1 className="center-text">General</h1>
            </CardActionArea>
          </Card>
          </Link>
        </Box>
  </Grid>
  
  <Grid  xs={4}>
  <Box>
    <Link to="/Orderdetails">

   
          <Card sx={{ maxWidth: 345, height: 194 }} className="cardStyle card6">
            <CardActionArea>
              <h1 className="center-text">All Order</h1>
            </CardActionArea>
          </Card>
          </Link>
        </Box>
  </Grid>

  </Grid>
 
      
      </div>
      <Darkmode/>
    </div>
  );
}

export default Home;
