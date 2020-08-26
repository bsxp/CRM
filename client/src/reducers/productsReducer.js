import { FETCH_PRODUCTS, ADD_PRODUCT } from '../actions/types'

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return action.payload
        case ADD_PRODUCT:
            return [...state, action.payload]
        default:
            return state
    }
}