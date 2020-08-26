export default class Product {

    constructor(name, price) {
        this.name = name
        this.price = price
    }

    updateName = (name) => {
        this.name = name
    }

    updateprice = (price) => {
        this.price = price
    }
}