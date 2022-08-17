import React from 'react';
import { getByTestId, render, screen } from '@testing-library/react';
import Superheroes from './Superheroes';

test('check ADD SUPERHERO button text', () => {
    render(<Superheroes />);
    expect(screen.getByRole("Button", { name: "ADD SUPERHERO" })).toBeDisabled();
});

test('check colunm names texts', () => {
    render(<Superheroes />);
    expect(screen.getByRole("TableCell", { name: "Hero Name" })).toBeDisabled();
    expect(screen.getByRole("TableCell", { name: "Short Description" })).toBeDisabled();
    expect(screen.getByRole("TableCell", { name: "Power" })).toBeDisabled();
});
