import { render, screen } from '@testing-library/react';
import SuperheroPage from '../pages/Superhero';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw'
import { setupServer } from 'msw/node';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    id: '0',
  }),
  useNavigate: () => mockedUseNavigate
}));

const server = setupServer();

describe('happy path', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    server.use(rest.get('/heroes/0', (req, res, ctx) => {
      return res(ctx.json({
        id: 0,
        name: 'Test hero 1',
        power: 'Test power 1',
        shortDescription: 'Test short description 1',
        description: 'Test long description 1'
      }))
    }));
  });
  
  test('renders a single hero', async () => {
    render(<SuperheroPage />, { wrapper: BrowserRouter });
  
    expect(await screen.findByText('Test hero 1')).toBeInTheDocument();
    expect(await screen.findByText('Test power 1')).toBeInTheDocument();
    expect(await screen.findByText('Delete')).toBeInTheDocument();
  })

  test('renders the CTA', () => {
    render(<SuperheroPage />, { wrapper: BrowserRouter });

    expect(screen.getByText('< Back to your collection')).toBeInTheDocument();
  })
})
