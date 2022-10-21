import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { getHeroes } from '../api/heroes';
import { Hero } from '../api/heroes';
import SuperheroCard from '../components/SuperheroCard';

const SuperheroesPage = () => {
  const [heroes, setHeroes] = useState<Hero[]>([])

  useEffect(() => {
    (async () => {
      try {
        const response = await getHeroes();
        setHeroes(response);
      } catch {

      }
    })();
  }, []);

  return (
    <Grid container direction="row" spacing={2}>
      {heroes.map((hero) => (
        <Grid key={hero.id} item xs={12} md={4} alignSelf="center">
          <SuperheroCard key={hero.id} hero={hero} context="list" />
        </Grid>
      ))}
    </Grid>
  )
}

export default SuperheroesPage;
