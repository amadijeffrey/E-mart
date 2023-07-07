import '@testing-library/jest-dom'
import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { screen, fireEvent, cleanup } from '@testing-library/react'
import { renderWithProviders } from './test-utils';
import { BrowserRouter } from 'react-router-dom'
import Cart from '../components/cart'

describe("cart component", () => {
    test('display the cart page with data in it', () => {
        renderWithProviders(<BrowserRouter><Cart /></BrowserRouter>, {
            preloadedState: {
                cart: {
                    '62d02f06a6e1b0354dab5bfa': {
                        "_id": "62d02f06a6e1b0354dab5bfa",
                        "name": "Apple IPhone 11 Pro Max 6.5-Inch (4GB RAM, 256GB ROM ),iOS 13, (12MP+12MP+12MP)+12MP 4G LTE Smartphone - Space Grey",
                        "qty": 2,
                        "size": null,
                        "price": 440000,
                    },
                    '62d0514fa6e1b0354dab5c16': {
                        "_id": "62d0514fa6e1b0354dab5c16",
                        "name": "LG Microwave Oven MS 2044 - Black",
                        "qty": 1,
                        "price": 53500,
                        "size": null,
                    }
                }
            }
        })

        expect(screen.getAllByRole("button", { name: "Remove" })).toHaveLength(2) //two cart items hence 2 'remove' buttons
        expect(screen.getByRole("button", {name: "CHECKOUT"})).toBeInTheDocument()
        expect(screen.getByTestId('subtotal')).toHaveTextContent('N933,500')
    })

    test('test removing an item from cart. Initial state is 2 items', () => {
        renderWithProviders(<BrowserRouter><Cart /></BrowserRouter>, {
            preloadedState: {
                cart: {
                    '62d02f06a6e1b0354dab5bfa': {
                        "_id": "62d02f06a6e1b0354dab5bfa",
                        "name": "Apple IPhone 11 Pro Max 6.5-Inch (4GB RAM, 256GB ROM ),iOS 13, (12MP+12MP+12MP)+12MP 4G LTE Smartphone - Space Grey",
                        "qty": 2,
                        "size": null,
                        "price": 440000,
                    },
                    '62d0514fa6e1b0354dab5c16': {
                        "_id": "62d0514fa6e1b0354dab5c16",
                        "name": "LG Microwave Oven MS 2044 - Black",
                        "qty": 1,
                        "price": 53500,
                        "size": null,
                    }
                }
            }
        })

       const firstRemoveButton = screen.getAllByText("Remove")[0]
        fireEvent.click(firstRemoveButton)

        renderWithProviders(<BrowserRouter><Cart /></BrowserRouter>, {
            preloadedState: {
                cart: {
                    '62d0514fa6e1b0354dab5c16': {
                        "_id": "62d0514fa6e1b0354dab5c16",
                        "name": "LG Microwave Oven MS 2044 - Black",
                        "qty": 1,
                        "price": 53500,
                        "size": null,
                    }
                }
            }
        })

        const badgeWithUpdatedState = screen.getAllByTestId('noOfItems')[1]
        const updatedSubtotal = screen.getAllByTestId('subtotal')[1]
        expect(badgeWithUpdatedState).toHaveTextContent('1')
        expect(updatedSubtotal).toHaveTextContent("N53,500")

    })
})
