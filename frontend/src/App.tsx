import React, { useEffect, useState } from "react";
import { AppBar, Container, Toolbar, Typography, Button } from "@mui/material";
import { Outlet, useNavigate } from 'react-router-dom';
import { checkLoginStatus, logout } from './api/auth';

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const handleLogout = async () => {
    await logout();
    setLoggedIn(false);
    navigate('/login')
  }

  useEffect(() => {
    navigate('/login')
  }, []);

  useEffect(() => {
    (async () => {
      const response = await checkLoginStatus();
      setLoggedIn(response);
    })()
  });

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: 'rgb(238, 232, 227)', color: 'black' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Zelt Superheroes
          </Typography>
          {loggedIn && (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: '50px', mb: '50px' }}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
