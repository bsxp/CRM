import { v4 as uuidv4 } from 'uuid'

const BizEnum = Object.freeze({"corp": "corp", "sole": "sole"})

export default class Customer {

    constructor(primaryName, description, location, email, phone, contacts, bizType, id) {
        this.primaryName = primaryName
        this.description = description
        this.location = location
        this.email = email
        this.phone = phone
        this.contacts = [...contacts]
        this.type = BizEnum[bizType] || null
        this.identifier = id || uuidv4()
    }
}