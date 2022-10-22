import React, { useEffect, useState } from 'react';
import { Grid, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { getHeroes } from '../api/heroes';
import { Hero } from '../api/heroes';
import SuperheroCard from '../components/SuperheroCard';
import CreateHeroDialog from '../components/CreateHeroDialog';
import { useNavigate } from 'react-router-dom';

const SuperheroesPage = () => {
  const [heroes, setHeroes] = useState<Hero[]>([])
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await getHeroes();
        setHeroes(response);
      } catch (e: any) {
        if (e.response.status === 401) {
          navigate('/login')
        }
      }
    })();
  }, []);

  return (
    <>
      <Grid container direction="row" spacing={2}>
        {heroes.map((hero) => (
          <Grid key={hero.id} item xs={12} md={4} alignSelf="center">
            <SuperheroCard key={hero.id} hero={hero} context="list" />
          </Grid>
        ))}
        <SpeedDial
          ariaLabel="SpeedDial for adding a hero"
          sx={{ position: 'absolute', top: 114, right: 16 }}
          icon={<SpeedDialIcon />}
          direction="left"
        >
          <SpeedDialAction
            icon={<SpeedDialIcon />}
            tooltipTitle="Create hero"
            onClick={() => setDialogOpen(true)}
          />
        </SpeedDial>
        {dialogOpen && <CreateHeroDialog open={dialogOpen} setOpen={setDialogOpen} />}
      </Grid>
    </>
  )
}

export default SuperheroesPage;
