import { fireEvent, render, screen } from '@testing-library/react';
import SuperheroesPage from '../pages/Superheroes';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw'
import { setupServer } from 'msw/node';

const server = setupServer();

const successfulResponse = rest.get('/heroes', (req, res, ctx) => {
  return res(ctx.json([
    {
      id: 0,
      name: 'Test hero 1',
      power: 'Test power 1',
      shortDescription: 'Test short description 1',
      description: 'Test long description 1'
    },
    {
      id: 1,
      name: 'Test hero 2',
      power: 'Test power 2',
      shortDescription: 'Test short description 2',
      description: 'Test long description 2'
    },
  ]))
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders a list of heroes', async () => {
  server.use(successfulResponse);
  render(<SuperheroesPage />, { wrapper: BrowserRouter });
    
  expect(await screen.findByText('Test hero 1')).toBeInTheDocument();
  expect(await screen.findByText('Test power 2')).toBeInTheDocument();
  expect(await (await screen.findAllByText('View')).length).toEqual(2);
})

test('renders the hero creation dialog', () => {
  server.use(successfulResponse);
  render(<SuperheroesPage />, { wrapper: BrowserRouter });

  fireEvent.click(screen.getByLabelText('Create hero'));

  expect(screen.getByText('Add a superhero to your collection')).toBeInTheDocument();
})
