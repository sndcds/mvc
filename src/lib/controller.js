import Model from './model.js'
import View from './view.js'
import Component from './component.js'


export default class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
        this.decimalSeparator = '.'
    }

    configurate(data) {
        const propertyNames = ['decimalSeparator']

        if (data !== undefined) {
            for (const prop of this.propertyNames()) {
                if (data[prop] !== undefined) {
                    this[prop] = data[prop];
                }
            }
        }
    }

    buildView(elementId) {
        this.view.build(elementId)
    }

    componentById(id) {
        return this.view.componentById(id)
    }

    sendMessage(message) {
        this.view.setMessage(message)
    }

    sendMessageToComponent(componentId, message) {
        const component = this.view.componentById(componentId)

        if (typeof component === 'object') {
            component.setMessage(message)
        }
    }

    setProperties(componentId, data) {
        const component = this.view.componentById(componentId)

        if (typeof component === 'object') {
            component.setProperties(data)
        }
    }

    fetchData(url) {
        // Make an API request using fetch or XMLHttpRequest
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // Update the model with the fetched data
                this.onDataChanged(data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }

    onDataChanged(data) {
    }

    formatNumberWithDot(x) {
        if (typeof x === 'undefined') {
            return undefined
        }

        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    hasAttribute(obj, attributeName) {
        return typeof obj === 'object' && obj !== null && attributeName in obj
    }

    getNestedValue(data, path) {
        let value = data

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
}