import { fireEvent, render, screen } from '@testing-library/react';
import LoginPage from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw'
import { setupServer } from 'msw/node';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeEach(() => {
  server.use(
    rest.get('/check_login_status', (req, res, ctx) => {
      return res(ctx.json(false));
    })
  )
})

test('renders the login tab', () => {
  render(<LoginPage />, { wrapper: BrowserRouter });

  expect(screen.getAllByText('Login').length).toEqual(2);
});

test('renders the register tab', () => {
  render(<LoginPage />, { wrapper: BrowserRouter });
  fireEvent.click(screen.getByText('Register'))
  expect(screen.getAllByText('Register').length).toEqual(2);
})

test('validates required fields', () => {
    render(<LoginPage />, { wrapper: BrowserRouter });
    fireEvent.change(screen.getAllByLabelText('Username *')[0], { target: { value: 'Test' } });
  
    fireEvent.click(screen.getAllByText('Login')[1])
  
    expect(screen.getByText('Please fill in the required fields.')).toBeInTheDocument();
  })

test('validates matching passwords on registration', () => {
  render(<LoginPage />, { wrapper: BrowserRouter });

  fireEvent.click(screen.getByText('Register'))
  
  fireEvent.change(screen.getAllByLabelText('Username *')[0], { target: { value: 'Test' } });
  fireEvent.change(screen.getAllByLabelText('Password *')[0], { target: { value: 'Test' } });
  fireEvent.change(screen.getByLabelText('Confirm Password *'), { target: { value: 'Testing' } });
  
  fireEvent.click(screen.getAllByText('Register')[1])

  expect(screen.getByText('Please make sure that the passwords match.')).toBeInTheDocument();
})
