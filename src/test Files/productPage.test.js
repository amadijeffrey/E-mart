import '@testing-library/jest-dom'
import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { screen, fireEvent, cleanup } from '@testing-library/react'
import { renderWithProviders } from './test-utils';
import { MemoryRouter } from 'react-router-dom'
import App from '../App'


const handlers = [
    rest.get('https://ecommerce-api-black.vercel.app/api/products/62d02f06a6e1b0354dab5bfa', (req, res, ctx) => {
        return res(
            ctx.json({
                'foundProduct': {
                    "_id": "62d02f06a6e1b0354dab5bfa",
                    "name": "Apple IPhone 11 Pro Max 6.5-Inch (4GB RAM, 256GB ROM ),iOS 13, (12MP+12MP+12MP)+12MP 4G LTE Smartphone - Space Grey",
                    "category": "IOS phones",
                    "description": "Get infinitely spectacular possibilities with the iPhone 11 Pro Max. It features the powerful A13 Bionic chip, 5G to download and stream high-quality video, a bright 6.7' Super Retina XDR display, and Ceramic Shield for better drop performance. Other features include a LiDAR scanner, a triple-camera system with cinema-grade Dolby Vision, MagSafe accessories for wireless charging, and much more.",
                    "images": [
                        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/18/7744801/1.jpg?6487",
                        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/18/7744801/2.jpg?6487"
                    ],
                    "price": 440000,
                    "sizes": [],
                    "similarProducts": [],
                    "rating": 4.5,
                    "__v": 0
                },
            }))
    })
]

const server = setupServer(...handlers)


beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe("Product page ad its functionalities", () => {
    test('get product and display data', async () => {

        renderWithProviders(
            <MemoryRouter initialEntries={['/62d02f06a6e1b0354dab5bfa']}>
                <App />
            </MemoryRouter>)
        
        expect(screen.getByText("loading...")).toBeInTheDocument()
        const addToCartButton = await screen.findByRole("button", { name: "Add to Cart" })
        expect(await screen.findAllByText("N440,000")).not.toHaveLength(0)
    
        expect(addToCartButton).toBeInTheDocument()
        fireEvent.click(addToCartButton)
    })

    test('show number of items in cart when product is added to cart', async () => {

        renderWithProviders(
            <MemoryRouter initialEntries={['/62d02f06a6e1b0354dab5bfa']}>
                <App />
            </MemoryRouter>)
        
        const addToCartButton = await screen.findByRole("button", { name: "Add to Cart" })

        fireEvent.click(addToCartButton)
        expect(screen.getByTestId('noOfItems')).toHaveTextContent('1')
    })

    test('show increment button and quantity of item selected after adding to cart', async () => {

        renderWithProviders(
            <MemoryRouter initialEntries={['/62d02f06a6e1b0354dab5bfa']}>
                <App />
            </MemoryRouter>)
        
        const addToCartButton = await screen.findByRole("button", { name: "Add to Cart" })

        fireEvent.click(addToCartButton)
        expect(await screen.findByTestId('increaseButton')).toBeInTheDocument()
        expect(screen.getByTestId('quantity')).toHaveTextContent('1 item(s)')
    })

    test('show decrement and increment button when quantity of item is more than 1', async () => {

        renderWithProviders(
            <MemoryRouter initialEntries={['/62d02f06a6e1b0354dab5bfa']}>
                <App />
            </MemoryRouter>)
        
        const addToCartButton = await screen.findByRole("button", { name: "Add to Cart" })

        fireEvent.click(addToCartButton)
        const incrementButton = await screen.findByTestId('increaseButton')
        expect(incrementButton).toBeInTheDocument()

        fireEvent.click(incrementButton)
        expect(await screen.findByTestId('decreaseButton')).toBeInTheDocument()
        expect(screen.getByTestId('quantity')).toHaveTextContent('2 item(s)')

    })
})
