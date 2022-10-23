import { fireEvent, render, screen } from '@testing-library/react';
import SuperheroPage from '../pages/Superhero';
import { BrowserRouter } from 'react-router-dom';

test('renders the page', () => {
  render(<SuperheroPage />, { wrapper: BrowserRouter });

  expect(screen.getByText('< Back to your collection')).toBeInTheDocument();
})