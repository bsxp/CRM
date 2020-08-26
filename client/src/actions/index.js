import customers from '../apis/customers'
import people from '../apis/people'
import orders from '../apis/orders'
import products from '../apis/products'
import { FETCH_CUSTOMERS, ADD_CUSTOMER, FETCH_PRODUCTS, ADD_PRODUCT } from './types'
import { v4 as uuidv4 } from 'uuid'


// Create new customer
export const createCustomer = customer => async dispatch => {

    return await customers.post(null, {...customer, identifier: customer.identifier ? customer.identifier : uuidv4() })
    .then(res => {
        console.log("Successfully created new customer")
        dispatch({type: ADD_CUSTOMER, payload: res.data})
        return res
    })
    .catch(err => {
        console.log("Error creating new customer:", err)
        return err
    })
    //TODO: Add dispatch to add customer to state customer list
}

// Get existing customer 
export const fetchCustomer = (customer) => async dispatch => {
    const response = await customers.get(null, `/${customer}`)
    //TODO: Add dispatch to add customer to appropriate place... maybe? Might just return
}

export const fetchCustomers = () => async dispatch => {
    return await customers.get(null)
    .then(res => {
        dispatch({type: FETCH_CUSTOMERS, payload: res.data})
    })
    .catch(err => {
        console.log("Error fetching all customers", err)
    })

}


// Edit existing customer
export const editCustomer = (newData) => async dispatch => {
    const response = await customers.patch(`/${newData.uuid}`, newData)

    //TODO return
}


// Delete existing customer
export const deleteCustomer = (customer) => async dispatch => {
    const response = await customers.delete(`${customer}`)
}


// Create new person
export const createPerson = (formValues) => async dispatch => {
    const response = await people.post({...formValues})

    //TODO: Add dispatch to add person to state people list
}


// Get existing person 
export const fetchPerson = (person) => async dispatch => {
    const response = await people.get(`/${person}`)
}


// Edit existing person
export const editPerson = (newData) => async dispatch => {
    const response = await people.patch(`/${newData.person}`, newData)
}


// Delete existing person
export const deletePerson = (person) => async dispatch => {
    const response = await people.delete(`/${person}`)
}


// Create new order
// TODO: Dispatch
export const createOrder = (order) => async dispatch => {

    return await customers.post(`/${order.company}/orders`, { order })
    .then(async (res) => {
        if (res.status === 201) {
            return await orders.post({...order})
            .then(res => {
                return res
            })
            .catch(err => {
                console.log(`Error posting order to master order list`)
                return err
            })
        }
    })
    .catch(err => {
        console.log(`Error posting order to ${order.company} order list`)
        return err
    })

    //TODO: Add dispatch to add order to state order list
}


// Get existing order 
export const fetchOrder = (order) => async dipsatch => {
    const response = await orders.get(`/${order}`)
}


// Edit existing order
export const editOrder = (newData) => async dispatch => {
    const response = await orders.patch(`/${newData.order}`, newData)
}


// Delete existing order
export const deleteOrder = (order) => async dispatch => {
    const response = await orders.delete(`/${order}`)
}


// Create new product
export const createProduct = (product) => async dispatch => {
    return await products.post(null, {...product, identifier: uuidv4()})
    .then(res =>{
        console.log("Product successfully added")
        dispatch({type: ADD_PRODUCT, payload: res.data})
        return res
    })
    .catch(err => {
        console.log("Error adding product.")
        return err
    })

    //TODO: Add dispatch to add product to state product list
}


// Get existing product
export const fetchProduct = (product) => async dispatch => {
    const response = await products.get(`/${product}`)
}

// Get existing product
export const fetchProducts = (product) => async dispatch => {
    const response = await products.get(null)
    dispatch({type: FETCH_PRODUCTS, payload: response.data})
}


// Edit existing product
export const editProduct = (newData) => async dispatch => {
    const response = await products.patch(`/${newData.product}`, newData)
}


// Delete existing product
export const deleteProduct = (product) => async dispatch => {
    const response = await products.delete(`/${product}`)
}