import { FETCH_CUSTOMERS, ADD_CUSTOMER } from '../actions/types'

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_CUSTOMERS:
            return action.payload
        case ADD_CUSTOMER:
            return [...state, action.payload]
        default:
            return state
    }
}