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

function NewSuperhero() {
    const style = {marginLeft: 10}

    const [name, setName] = useState(""); 
    const [shortDescription, setShortDescription] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [power, setPower] = useState(""); 
    const navigate = useNavigate();

    const buttonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const message = (await axios.post("/heroes/hero", {
            name,
            shortDescription,
            description,
            power
            })).data;
        navigate("/superheroes");
    };

    return (
        <Box 
            sx={{
                boxShadow: 1,
                borderRadius: 2,
                p: 20,
                minWidth: 300,
                height: window.innerHeight,   
            }}
            >
            <Typography variant="h4" align="center">
                <TextField id="name" label="Name" value={name} variant="outlined" style={style} onChange={(ev) => setName(ev.target.value)}/>
                <TextField id="shortDescription" label="Short Description" value={shortDescription} variant="outlined" style={style} onChange={(ev) => setShortDescription(ev.target.value)}/>
                <TextField id="description" label="Description" value={description} variant="outlined" style={style} onChange={(ev) => setDescription(ev.target.value)}/>
                <TextField id="power" label="Power" value={power} variant="outlined" style={style} onChange={(ev) => setPower(ev.target.value)}/>
                <Button onClick={buttonHandler} variant="contained" style={style}>ADD SUPERHERO</Button>
            </Typography>
        </Box>
    );
}

export default NewSuperhero;