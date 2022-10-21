import React, { useState } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea, 
  TextField, 
  Tabs, 
  Tab,
  Button,
} from '@mui/material';

interface TabPanelProps {
  index: number;
  value: number;
  handleUsernameChange: Function,
  handlePasswordChange: Function,
  username: string,
  password: string
}

const TabPanel = (props: TabPanelProps) => {
  const { value, index, username, password, handleUsernameChange, handlePasswordChange } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
    >
      <Grid container direction="column" spacing={2} mt={1}>
        <Grid item>
          <TextField
            required
            label="Username"
            variant="outlined"
            onChange={(e) => handleUsernameChange(e)}
            value={username}
          />
        </Grid>
        <Grid item>
          <TextField 
            required
            label="Password"
            variant="outlined"
            onChange={(e) => handlePasswordChange(e)}
            value={password}
          />
        </Grid>
      </Grid>
    </div>
  );
}

const LoginPage = () => {
  const [tab, setTab] = useState<number>(0);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  }

  const handleLogin = () => {

  }

  const handleRegister = () => {

  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <Grid container direction="column" alignContent="center">
      <Card>
        <CardContent>
          <Tabs value={tab} onChange={handleTabChange}>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          <TabPanel value={tab} index={0} username={username} password={password} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} />
          <TabPanel value={tab} index={1} username={username} password={password} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange}  />
        </CardContent>
        <CardActionArea>
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={tab === 0 ? handleLogin : handleRegister}
          >
            {tab === 0 ? 'Login' : 'Register'}
          </Button>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default LoginPage;
