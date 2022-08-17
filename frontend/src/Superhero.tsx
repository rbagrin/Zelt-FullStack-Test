import React, { useState, useEffect } from "react";
import { Box, Button, Card, CardActions, CardContent, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ImageUploading, { ImageListType } from "react-images-uploading";

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
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;

    const onChange = (
      imageList: ImageListType,
      addUpdateIndex: number[] | undefined
    ) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      setImages(imageList as never[]);
    };

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
            <Button sx={{ p: 2, m:5 }} size="small" variant="contained" onClick={buttonHandler}>Delete Superhero</Button>

            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <Button
                    sx={{ p: 2, m:5 }} 
                    size="small" 
                    variant="contained" 
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Click or Drop here
                  </Button>
                  &nbsp;
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image.dataURL} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <Button sx={{ p: 2, m:5 }} size="small" variant="contained" onClick={() => onImageUpdate(index)}>Update</Button>
                        <Button sx={{ p: 2, m:5 }} size="small" variant="contained" onClick={() => onImageRemove(index)}>Remove</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </CardActions>
        </Card>
      </Box>
    );
}

export default Superhero;