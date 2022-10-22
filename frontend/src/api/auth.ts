import axios from 'axios';

export async function login(name: string, password: string): Promise<void> {
  await axios.post('/login', {
    name,
    password
  });
}

export async function register(name: string, password: string): Promise<void> {
  await axios.post('/register', {
    name,
    password
  });
}

export async function checkLoginStatus(): Promise<boolean> {
  const response = await axios.get('/check_login_status');

  return response.data;
}