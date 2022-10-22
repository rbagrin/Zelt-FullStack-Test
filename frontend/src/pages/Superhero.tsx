import React, { useEffect, useState } from 'react';
import { Grid, Link } from '@mui/material';
import { getHero } from '../api/heroes';
import { Hero } from '../api/heroes';
import { useNavigate, useParams } from 'react-router-dom';
import SuperheroCard from '../components/SuperheroCard';

const SuperheroPage = () => {
  const [hero, setHero] = useState<Hero>()
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const response = await getHero(parseInt(id || '0'));
        setHero(response);
      } catch(e: any) {
        if (e.response.status === 401) {
          navigate('/login')
        }
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
      <Grid item>
        <Link href="/superheroes" sx={{ color: 'black' }}>{`< Back to your collection`}</Link>
      </Grid>
    </Grid>
  )
}

export default SuperheroPage;