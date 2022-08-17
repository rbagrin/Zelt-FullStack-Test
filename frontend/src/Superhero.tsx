import React, { useState, useEffect } from "react";
import { Box, Button, Card, CardActions, CardContent, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

interface Hero {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  power: string;
}

function Superhero() {

    let { id } = useParams();

    const [superhero, setSuperhero] = useState<Hero>(); 
    const navigate = useNavigate();

    useEffect(() => {
      (async () => {
        const superhero = (await axios.get(`/heroes/${id}`)).data;
        console.log(superhero);
        setSuperhero(superhero);
      })();
    }, []);

    const buttonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const message = (await axios.delete(`/heroes/${id}`)).data;
        setSuperhero(superhero);
        navigate("/superheroes");
    };
    return (
      <Box>
        <Card sx={{ minWidth: 275, m: 30 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {superhero ? superhero.name: "Hero not found!"}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {superhero ? superhero.shortDescription: ""}
            </Typography>
            <Typography variant="body2">
              {superhero ? superhero.description: ""}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={buttonHandler}>Delete Superhero</Button>
          </CardActions>
        </Card>
      </Box>
    );
}

export default Superhero;