import axios from 'axios';

export interface Hero {
  id: number,
  name: string,
  shortDescription: string,
  description: string,
  power: string
}

export async function getHeroes(): Promise<Hero[]> {
  try {
    const response = await axios.get(`/heroes`);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export async function getHero(id: number): Promise<Hero> {
  try {
    const response = await axios.get(`/heroes/${id}`);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export async function createHero({ name, shortDescription, description, power }: Hero): Promise<number> {
  const response = await axios.post(`/heroes`, {
    name,
    shortDescription,
    description,
    power
  })

  return response.data.id
}

export async function deleteHero(id: number): Promise<void> {
  await axios.delete(`/heroes/${id}`);
}