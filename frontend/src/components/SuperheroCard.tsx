import React from 'react';
import { Card, CardMedia, CardContent, Typography, Divider, CardActionArea, Button } from '@mui/material';
import { Hero, deleteHero } from '../api/heroes';
import { useNavigate } from 'react-router-dom';

interface Props {
  hero: Hero,
  context: string
}

const SuperheroCard = ({ hero, context }: Props) => {
  const navigate = useNavigate();

  function handleView() {
    navigate(`/superheroes/${hero.id}`);
  }

  async function handleDelete() {
    await deleteHero(hero.id);
    navigate(`/superheroes`);
  }

  return (
    <Card sx={{ maxWidth: '400px' }}>
      <CardMedia
        component="img"
        image={`/images/${hero.id}.jpeg`}
        alt={`${hero.name}-image`}
        height="200"
      />
      <CardContent sx={context === 'list' ? { height: '200px' } : null}>
        <Typography gutterBottom variant="h5" component="div">
          {hero.name}
        </Typography>
        <Typography gutterBottom variant="caption" component="div">
          {hero.power}
        </Typography>
        <Divider sx={{ marginBottom: '20px' }} />
        <Typography variant="body2" component="div">
          {context === 'single' && hero.description}
          {context === 'list' && hero.shortDescription}
        </Typography>
      </CardContent>
      <CardActionArea>
        <Button
          fullWidth
          variant="contained"
          onClick={context === 'single' ? handleDelete : handleView}
          color={context === 'single' ? 'error' : 'info'}
        >
          {context === 'single' && 'Delete'}
          {context === 'list' && 'View'}
        </Button>
      </CardActionArea>
    </Card>
  )
}

export default SuperheroCard;
