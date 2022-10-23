import React, { useEffect, useState } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea, 
  TextField, 
  Tabs, 
  Tab,
  Button,
  Alert
} from '@mui/material';
import { checkLoginStatus, login, register } from '../api/auth';
import { useNavigate } from 'react-router-dom';

type ErrorState = {
  username: boolean
  password: boolean
  confirmPassword: boolean
  login: boolean
  register: boolean
}

interface TabPanelProps {
  index: number;
  value: number;
  handleUsernameChange: Function,
  handlePasswordChange: Function,
  handleConfirmPasswordChange: Function
  username: string,
  password: string,
  confirmPassword: string,
  errorState: ErrorState
}

const TabPanel = (props: TabPanelProps) => {
  const {
    value,
    index,
    username,
    password,
    confirmPassword,
    handleUsernameChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    errorState 
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
    >
      <Grid container direction="column" spacing={2} mt={1}>
        <Grid item>
          <TextField
            required
            fullWidth
            label="Username"
            variant="outlined"
            type="text"
            onChange={(e) => handleUsernameChange(e)}
            error={errorState.username}
            value={username}
            inputProps={{ id: `${index === 0 ? 'login' : 'register'}-username` }}
          />
        </Grid>
        <Grid item>
          <TextField 
            required
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => handlePasswordChange(e)}
            error={errorState.password}
            value={password}
            inputProps={{ id: `${index === 0 ? 'login' : 'register'}-password` }}
          />
        </Grid>
        {index === 1 && (
          <Grid item>
            <TextField 
              required
              fullWidth
              label="Confirm Password"
              variant="outlined"
              type="password"
              onChange={(e) => handleConfirmPasswordChange(e)}
              error={errorState.confirmPassword}
              value={confirmPassword}
              inputProps={{ id: `register-confirm-password` }}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
}

const LoginPage = () => {
  const [tab, setTab] = useState<number>(0);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [registered, setRegistered] = useState<boolean>(false);
  const navigate = useNavigate();
  const [errorState, setErrorState] = useState<ErrorState>({
    username: false,
    password: false,
    confirmPassword: false,
    login: false,
    register: false
  })

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setErrorState({
      username: false,
      password: false,
      confirmPassword: false,
      login: false,
      register: false
    });
  }

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorState({
        username: !username,
        password: !password,
        confirmPassword: false,
        login: false,
        register: false,
      })
    } else {
      try {
        await login(username, password);
        setLoggedIn(true);
      } catch {
        setErrorState({
          username: !username,
          password: !password,
          confirmPassword: false,
          login: true,
          register: false
        })
      }
    }
  }

  const handleRegister = async () => {
    const usernameError = !username
    const passwordError = !password
    const confirmPasswordError = !confirmPassword || (password !== confirmPassword)

    if (usernameError || passwordError || confirmPasswordError) {
      setErrorState({
        username: usernameError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        login: false,
        register: false,
      })
    } else {
      try {
        await register(username, password);
        setRegistered(true);
        setPassword('');
        setConfirmPassword('');
        setTab(0);
      } catch {
        setErrorState({
          username: !username,
          password: !password,
          confirmPassword: !confirmPassword && (password !== confirmPassword),
          login: false,
          register: true
        })
      }
    }
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
    setErrorState({
      ...errorState,
      username: false,
      login: false,
      register: false
    })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setErrorState({
      ...errorState,
      password: false,
      login: false
    })
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
    setErrorState({
      ...errorState,
      confirmPassword: false,
      login: false,
      register: false
    })
  }

  useEffect(() => {
    (async () => {
      const response = await checkLoginStatus();
      setLoggedIn(response);
    })()

    if (loggedIn) {
      navigate('/superheroes');
    }
  }, [loggedIn])

  return (
    <Grid container direction="column" alignContent="center">
      <Card sx={{ width: '400px' }}>
        <CardContent>
          <Tabs value={tab} onChange={handleTabChange}>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          <TabPanel
            value={tab}
            index={0}
            username={username}
            password={password}
            confirmPassword={confirmPassword}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleConfirmPasswordChange={handleConfirmPasswordChange}
            errorState={errorState}
          />
          <TabPanel
            value={tab} index={1}
            username={username}
            password={password}
            confirmPassword={confirmPassword}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleConfirmPasswordChange={handleConfirmPasswordChange}
            errorState={errorState} 
          />
        </CardContent>
        <CardActionArea>
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={tab === 0 ? handleLogin : handleRegister}
            data-testid="submit-button"
          >
            {tab === 0 ? 'Login' : 'Register'}
          </Button>
        </CardActionArea>
      </Card>
      {registered && (
        <Alert sx={{ mt: 2 }} severity="success">
          Successfully registered.
          <br />
          Please use your credentials to login!
        </Alert>
      )}
      {(errorState.login || errorState.register) && (
        <Alert sx={{ mt: 2 }} severity="error">
          Something went wrong.
          <br />
          {(errorState.login && username && password) && ' Your username and password may be invalid.'}
        </Alert>
      )}
      {(errorState.username || errorState.password || errorState.confirmPassword) && (
        <Alert sx={{ mt: 2 }} severity="error">
          {confirmPassword ? ' Please make sure that the passwords match.' : ' Please fill in the required fields.'}
        </Alert>
      )}
    </Grid>
  )
}

export default LoginPage;
