import React from 'react';
import { getByTestId, render, screen } from '@testing-library/react';
import Login from './Login';

test('check login button text', () => {
    render(<Login />);
    expect(screen.getByRole("Button", { name: "LOGIN" })).toBeDisabled();
});

test('check username and password texts', () => {
    render(<Login />);
    expect(screen.getByRole("TextField", { name: "Username" })).toBeDisabled();
    expect(screen.getByRole("TextField", { name: "Password" })).toBeDisabled();
});
