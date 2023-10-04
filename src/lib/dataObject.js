export default class DataObject {
    constructor(data) {
        this.data = data
    }

    hasAttribute(obj, attributeName) {
        return typeof obj === 'object' && obj !== null && attributeName in obj
    }

    valueByPath(path) {
        let value = this.data

        for (const key of path) {
            if (this.hasAttribute(value, key)) {
                value = value[key]
            }
            else {
                value = undefined
                break
            }
        }

        return value
    }

    filter(condition) {
        return this.data.filter(condition)
    }
}