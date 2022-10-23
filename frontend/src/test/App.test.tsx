import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

test('renders the App bar', () => {
  render(<App />, { wrapper: BrowserRouter })

  expect(screen.getByText('Zelt Superheroes')).toBeInTheDocument();
})

test('does not render the logout button', () => {
  render(<App />, { wrapper: BrowserRouter })

  expect(screen.queryByText('Logout')).not.toBeInTheDocument();
})