export default class Order {

    constructor(date=null, content={}, placedBy=null) {
        this.date = date
        this.content = content
        this.placedBy = placedBy
    }

    addDate = (date) => {
        this.date = date
    }

    addPerson = (person) => {
        this.placedBy = person
    }

    updateContent = (key, value) => {
        this.content = {...this.content, key: value}
    }

    deleteContent = (key) => {
        delete this.content[key]
    }

}