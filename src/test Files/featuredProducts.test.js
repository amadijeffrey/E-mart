import '@testing-library/jest-dom'
import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { screen, fireEvent, cleanup } from '@testing-library/react'
import ProductHowItWorks from '../onepirate/modules/views/ProductHowItWorks';
import { renderWithProviders } from './test-utils';
import { BrowserRouter } from 'react-router-dom'




const handlers = [
    rest.get('https://ecommerce-api-black.vercel.app/api/products/featured', (req, res, ctx) => {
        return res(ctx.json({
            'featuredProducts': [
                {
                    "sizes": [],
                    "similarProducts": [],
                    "_id": "624aff2dd074f4e99d4c7ae9",
                    "name": "Apple IPhone 12 Pro Max - 128GB, 6GB RAM, 6.7-Inch,(12MP+12MP+12MP) - Pacific Blue",
                    "category": "IOS phones",
                    "description": "Get infinitely spectacular possibilities with the iPhone 12 Pro Max. It features the powerful A14 Bionic chip, 5G to download and stream high-quality video, a bright 6.7\" Super Retina XDR display, and Ceramic Shield for better drop performance. Other features include a LiDAR scanner, a triple-camera system with cinema-grade Dolby Vision, MagSafe accessories for wireless charging, and much more.",
                    "images": [
                        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/91/277099/1.jpg?6117https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/91/277099/1.jpg?6117",
                        "https://images.unsplash.com/photo-1608547492806-7e6c70ffdea4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aXBob25lJTIwMTIlMjBwcm8lMjBtYXh8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
                        "https://images.unsplash.com/photo-1608547492989-e91bab9ce286?ixlib=rb1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTR8azh1SWZFdDhPUXN8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                    ],
                    "__v": 0,
                    "price": 650000,
                    "rating": 3.8
                },
                {
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
            ]

        }))
    })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('get featured products under category and display data', async () => {

    renderWithProviders(
        <BrowserRouter>
            <ProductHowItWorks />
        </BrowserRouter>)
    
    expect(await screen.findByRole("button", { name: /Apple iphone 12/i })).toBeInTheDocument()
    expect(await screen.findByText("N650,000")).toBeInTheDocument()
    expect(await screen.findByText("Apple IPhone 11 Pro Max 6.5-Inch (4GB RAM, 256GB ROM ),iOS 13, (12MP+12MP+12MP)+12MP 4G LTE Smartphone - Space Grey")).toBeInTheDocument()

})