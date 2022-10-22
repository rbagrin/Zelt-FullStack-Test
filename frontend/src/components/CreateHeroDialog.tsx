import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Alert, TextField, Button } from '@mui/material';
import { createHero } from '../api/heroes';
import { useNavigate } from 'react-router-dom';

interface Props {
  open: boolean
  setOpen: Function
}

type ErrorState = {
  name: boolean
  power: boolean
  shortDescription: boolean
}

const CreateHeroDialog = ({ open, setOpen }: Props) => {
  const [name, setName] = useState<string>('');
  const [power, setPower] = useState<string>('');
  const [shortDescription, setShortDescription] = useState<string>('');
  const [longDescription, setLongDescription] = useState<string>('');
  const [errorState, setErrorState] = useState<ErrorState>({
    name: false,
    power: false,
    shortDescription: false
  })
  const navigate = useNavigate();

  async function handleCreateHero() {
    setErrorState({
      name: !name,
      power: !power,
      shortDescription: !shortDescription
    })

    if (name && power && shortDescription) {
      const response = await createHero({
        id: 0,
        name,
        shortDescription,
        description: longDescription,
        power
      })
      navigate(`/superheroes/${response}`)
    }
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add a superhero to your collection</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          variant="standard"
          fullWidth
          onChange={(e) => {
            setErrorState({
              ...errorState,
              name: false
            })
            setName(e.target.value)
          }}
          value={name}
          sx={{ mb: 2 }}
          error={errorState.name}
          required
        />
        <TextField
          margin="dense"
          id="power"
          label="Power"
          type="text"
          variant="standard"
          fullWidth
          onChange={(e) => {
            setErrorState({
              ...errorState,
              power: false
            })
            setPower(e.target.value)
          }}
          value={power}
          sx={{ mb: 2 }}
          error={errorState.power}
          required
        />
        <TextField
          margin="dense"
          id="short-description"
          label="Short description"
          type="text"
          fullWidth
          onChange={(e) => {
            setErrorState({
              ...errorState,
              shortDescription: false
            })
            setShortDescription(e.target.value)
          }}
          variant="standard"
          value={shortDescription}
          sx={{ mb: 2 }}
          error={errorState.shortDescription}
          required
        />
        <TextField
          margin="dense"
          id="long-description"
          label="Long description"
          multiline
          rows={4}
          fullWidth
          variant="standard"
          onChange={(e) => setLongDescription(e.target.value)}
          value={longDescription}
          sx={{ mb: 5 }}
        />
        {(errorState.name || errorState.power || errorState.shortDescription) && (
          <Alert sx={{ mb: 2 }} severity="error">Please fill in the required fields</Alert>
        )}
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={handleCreateHero}
        >
          Create
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default CreateHeroDialog;
