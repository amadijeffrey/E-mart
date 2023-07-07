import '@testing-library/jest-dom'
import React from 'react'
import { screen, fireEvent } from '@testing-library/react'
import SignIn from '../onepirate/SignIn';
import { renderWithProviders } from './test-utils';
import { BrowserRouter } from 'react-router-dom'



test('render the signIn form', () => {
    renderWithProviders(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>)

    expect(screen.getByRole("button", { name: /Sign In/i })).toBeInTheDocument()
})