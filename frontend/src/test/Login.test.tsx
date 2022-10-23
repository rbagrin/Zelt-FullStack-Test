import { fireEvent, render, screen } from '@testing-library/react';
import LoginPage from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';

test('renders the login dialog', () => {
  render(<LoginPage />, { wrapper: BrowserRouter });

  expect(screen.getAllByText('Login').length).toEqual(2);
});

test('validates required fields', () => {
  const { container } = render(<LoginPage />, { wrapper: BrowserRouter });
  fireEvent.change(container.querySelector('#login-username'), { target: { value: 'Test' } });

  fireEvent.click(screen.getAllByText('Login')[1])

  expect(screen.getByText('Please fill in the required fields.')).toBeInTheDocument();
})

test('validates matching passwords on registration', () => {
  const { container } = render(<LoginPage />, { wrapper: BrowserRouter });
  fireEvent.click(screen.getByText('Register'))

  fireEvent.change(container.querySelector('#register-username'), { target: { value: 'Test' } });
  fireEvent.change(container.querySelector('#register-password'), { target: { value: 'Test' } });
  fireEvent.change(container.querySelector('#register-confirm-password'), { target: { value: 'Testing' } });
  
  fireEvent.click(screen.getAllByText('Register')[1])

  expect(screen.getByText('Please make sure that the passwords match.')).toBeInTheDocument();
})