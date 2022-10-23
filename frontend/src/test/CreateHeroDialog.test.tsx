import { fireEvent, render, screen } from '@testing-library/react';
import CreateHeroDialog from '../components/CreateHeroDialog';
import { BrowserRouter } from 'react-router-dom';

test('renders the dialog', () => {
  render(<CreateHeroDialog open={true} setOpen={() => true} />, { wrapper: BrowserRouter });

  expect(screen.getByText('Add a superhero to your collection')).toBeInTheDocument();
  expect(screen.getByText('Name')).toBeInTheDocument();
  expect(screen.getByText('Power')).toBeInTheDocument();
  expect(screen.getByText('Short description')).toBeInTheDocument();
  expect(screen.getByText('Long description')).toBeInTheDocument();
});

test('validates required fields', () => {
  render(<CreateHeroDialog open={true} setOpen={() => true} />, { wrapper: BrowserRouter });

  fireEvent.click(screen.getByText('Create'));

  expect(screen.getByText('Please fill in the required fields.')).toBeInTheDocument();
})