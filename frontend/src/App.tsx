import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Superheroes from "./Superheroes";
import Superhero from "./Superhero";
import NewSuperhero from "./NewSuperhero";

function App() {
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("blue");

  useEffect(() => {
    (async () => {
      try {
        const message = (await axios.get("/hello-world")).data;
        setMessage(message);
        setColor("blue");
      } catch {
        setMessage("Something went wrong!");
        setColor("red");
      }
    })();
  }, []);

  return (
    // <Box sx={{ mt: 10 }}>
    //   <Typography variant="h4" color={color} align="center">
    //     {message}
    //   </Typography>
    // </Box>

    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/superheroes" element={<Superheroes />}/>
        <Route path="/superheroes/:id" element={<Superhero />}/>
        <Route path="/addsuperhero" element={<NewSuperhero />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
