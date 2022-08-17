import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import Superheroes from "./Superheroes"
import { useNavigate } from "react-router-dom";

function Login() {
    const style = {marginLeft: 10}
    
    const [name, setName] = useState(""); 
    const [password, setPassword] = useState(""); 
    const navigate = useNavigate();

    const buttonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const message = (await axios.post("/login", {
            name,
            password
            })).data;
        if (message == "Success"){
            navigate("/superheroes");
        } else {
            navigate("/login");
        }
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
        <Typography variant="h4" align="center">
            <TextField id="username" label="Username" value={name} variant="outlined" style={style} onChange={(ev) => setName(ev.target.value)}/>
            <TextField id="password" label="Password" value={password} type="password" variant="outlined" style={style} onChange={(ev) => setPassword(ev.target.value)}/>
            <Button onClick={buttonHandler} variant="contained" style={style}>LOGIN</Button>
        </Typography>
      </Box>
    );
}

export default Login;