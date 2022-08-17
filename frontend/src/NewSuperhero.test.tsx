import React from 'react';
import { getByTestId, render, screen } from '@testing-library/react';
import NewSuperhero from './NewSuperhero';

test('check ADD SUPERHERO button text', () => {
    render(<NewSuperhero />);
    expect(screen.getByRole("Button", { name: "ADD SUPERHERO" })).toBeDisabled();
});

test('check field texts', () => {
    render(<NewSuperhero />);
    expect(screen.getByRole("TextField", { name: "Name" })).toBeDisabled();
    expect(screen.getByRole("TextField", { name: "Short Description" })).toBeDisabled();
    expect(screen.getByRole("TextField", { name: "Description" })).toBeDisabled();
    expect(screen.getByRole("TextField", { name: "Power" })).toBeDisabled();
});
