import React from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

// As a basic setup, import your same slice reducers
import rootReducer from '../reducers'

const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: '70px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }

export function renderWithProviders(
    ui,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = configureStore({ reducer: rootReducer, preloadedState }),
        ...renderOptions
    } = {}
    ) {
    function Wrapper({ children }) {
        return <Provider store={store}>     
         <AlertProvider template={AlertTemplate} {...options}>
        {children}
        </AlertProvider>

        </Provider>
    }

    // Return an object with the store and all of RTL's query functions
    return {store, ...render(ui, { wrapper: Wrapper, ...renderOptions })}
}