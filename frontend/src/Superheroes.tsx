import React, { useState, useEffect } from "react";
import { Box, Button, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Hero {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  power: string;
}

function Superheroes() {
    const style = {marginLeft: 10, width: "200%"}
    const [superheroes, setSuperheroes] = useState<Hero[]>([]); 
    const navigate = useNavigate();

    useEffect(() => {
      (async () => {
        const superheroes = (await axios.get("/heroes")).data;
        console.log(superheroes);
        setSuperheroes(superheroes);
      })();
    }, []);

    const buttonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
      console.log( "kjsndckn")

      navigate(`/addsuperhero`)
    };

    return (
      <Box 
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          p: 20,
          minWidth: 300,
          height: window.innerHeight        
        }}
      >
        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Hero Name</TableCell>
                <TableCell align="right">Short Description</TableCell>
                <TableCell align="right">Power</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {superheroes.map((hero) => (
                <TableRow 
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => navigate(`/superheroes/${hero.id}`)}
                  style={{cursor: "pointer"}}
                >
                  <TableCell component="th" scope="row">
                    {hero.name}
                  </TableCell>
                  <TableCell align="right">{hero.shortDescription}</TableCell>
                  <TableCell align="right">{hero.power}</TableCell>                         
                </TableRow>
              ))}
            </TableBody>
            <Button onClick={buttonHandler} variant="contained" style={style}>ADD SUPERHERO</Button>
          </Table>
        </TableContainer>
      </Box>
    );
}

export default Superheroes;