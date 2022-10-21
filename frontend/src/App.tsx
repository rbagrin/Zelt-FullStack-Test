import React from "react";
import { Container } from "@mui/material";
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Container maxWidth="xl" sx={{ mt: '50px' }}>
      <Outlet />
    </Container>
  );
}

export default App;
