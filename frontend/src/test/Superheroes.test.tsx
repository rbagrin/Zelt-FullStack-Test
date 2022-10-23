import { fireEvent, render, screen } from '@testing-library/react';
import SuperheroesPage from '../pages/Superheroes';
import { BrowserRouter } from 'react-router-dom';

test('renders the page', () => {
  render(<SuperheroesPage />, { wrapper: BrowserRouter });
})