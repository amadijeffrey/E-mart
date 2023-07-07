import {productApi} from '../config'

export const FETCH_PRODUCT = 'fetch_product'

const fetchProduct = id => {
    const url = `${productApi}/${id}`

    return async(dispatch) => {
        const res = await fetch(url)
        const result = await res.json()
            dispatch({
                type: FETCH_PRODUCT,
                payload: result.foundProduct
            })
    }
}

export default fetchProduct