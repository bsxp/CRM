import { v4 as uuidv4 } from 'uuid'

export default class Person {
    
    constructor(firstName, lastName, location, phone, email, business, relatedOrders=null, uuid=uuidv4()) {
        this.firstName = firstName
        this.lastName = lastName
        this.location = location
        this.phone = phone
        this.email = email
        this.relatedOrders = relatedOrders
        this.business = business
        this.uuid = uuid
    }
}