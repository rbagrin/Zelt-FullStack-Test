import axios from 'axios';

export interface Hero {
  id: number,
  name: string,
  shortDescription: string,
  description: string,
  power: string
}

export async function getHeroes(): Promise<Hero[]> {
  const response = await axios.get('/heroes');

  return response.data;
}

export async function getHero(id: number): Promise<Hero> {
  const response = await axios.get(`/heroes/${id}`);

  return response.data;
}

export async function deleteHero(id: number): Promise<void> {
  await axios.delete(`/heroes/${id}`);
}