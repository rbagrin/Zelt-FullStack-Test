import axios from 'axios';

export async function login(name: string, password: string): Promise<void> {
  await axios.post('/login', {
    name,
    password
  });
}