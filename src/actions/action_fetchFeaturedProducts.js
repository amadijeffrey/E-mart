import {productApi} from '../config'

export const  FETCH_FEATURED_PRODUCTS = 'fetch_featured_products'

const fetchFeaturedProducts = () => {
    const url = `${productApi}/featured`

    return async(dispatch) => {
      const res = await fetch(url)
      const result = await res.json()
          dispatch({
              type: FETCH_FEATURED_PRODUCTS,
              payload: result.featuredProducts
          })
  }
}

export default fetchFeaturedProducts