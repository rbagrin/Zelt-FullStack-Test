import React from 'react';
import { getByTestId, render, screen } from '@testing-library/react';
import Superhero from './Superhero';

test('check Delete Superhero button text', () => {
    render(<Superhero />);
    expect(screen.getByRole("Button", { name: "Delete Superhero" })).toBeDisabled();
});

test('check "Hero not found!" text', () => {
    render(<Superhero />);
    expect(screen.getByRole("Typography", { name: "Hero not found!" })).toBeDisabled();
});
