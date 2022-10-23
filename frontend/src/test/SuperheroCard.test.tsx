import { render, screen } from '@testing-library/react';
import SuperheroCard from '../components/SuperheroCard';
import { BrowserRouter } from 'react-router-dom';
import { Hero } from '../api/heroes';

const sampleHero: Hero = {
  id: 0,
  name: 'Test hero',
  power: 'Test power',
  shortDescription: 'Test short description',
  description: 'Test description'
}

test('renders the component in single view', () => {
  render(<SuperheroCard hero={sampleHero} context="single" />, { wrapper: BrowserRouter });

  expect(screen.getByText('Test hero')).toBeInTheDocument();
  expect(screen.getByText('Test description')).toBeInTheDocument();
  expect(screen.queryByText('Test short description')).not.toBeInTheDocument();
  expect(screen.getByText('Delete')).toBeInTheDocument();
});

test('renders the component in list view', () => {
  render(<SuperheroCard hero={sampleHero} context="list" />, { wrapper: BrowserRouter });

  expect(screen.getByText('Test hero')).toBeInTheDocument();
  expect(screen.queryByText('Test description')).not.toBeInTheDocument();
  expect(screen.getByText('Test short description')).toBeInTheDocument();
  expect(screen.getByText('View')).toBeInTheDocument();
});