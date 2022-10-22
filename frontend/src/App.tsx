import React from "react";
import { AppBar, Container, Toolbar, Typography, Button } from "@mui/material";
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: 'rgb(238, 232, 227)', color: 'black' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Zelt Superheroes
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: '50px', mb: '50px' }}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
