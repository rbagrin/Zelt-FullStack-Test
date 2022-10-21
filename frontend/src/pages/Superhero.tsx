import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { getHero } from '../api/heroes';
import { Hero } from '../api/heroes';
import { useParams } from 'react-router-dom';
import SuperheroCard from '../components/SuperheroCard';

const SuperheroPage = () => {
  const [hero, setHero] = useState<Hero>()
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await getHero(parseInt(id || '0'));
        setHero(response);
      } catch {

      }
    })();
  }, []);

  return (
    <Grid container direction="column" alignContent="center" spacing={2}>
      {hero && (
        <Grid item>
          <SuperheroCard hero={hero} context="single" />
        </Grid>
      )}
    </Grid>
  )
}

export default SuperheroPage;