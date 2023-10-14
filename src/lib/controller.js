import Model from './model.js'
import View from './view.js'
import Component from './component.js'


export default class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
        this.context = null
        this.locale = 'en-US'
        this.minFractionDigits = 0
        this.maxFractionDigits = 2
        this.router = null
    }

    /**
     * Configurate the behavior of the controller.
     * Derivated controllers can define their own properties by overriding the method propertyNames.
     *
     * @param {object} data - Configuration data as object with key/value pairs.
     */
    configurate(data) {
        if (typeof data === 'object') {
            for (const propertyName of this.getPropertyNames()) {
                if (data[propertyName] !== undefined) {
                    this[propertyName] = data[propertyName]
                }
            }
        }
    }

    /**
     * Get property names.
     *
     * @param {array} customPropertyNames - An array with the names of a derived class.
     * @return {array} An array with property names or undefined, if no properties exist.
     */
    getPropertyNames(customPropertyNames) {
        const propertyNames = ['locale', 'minFractionDigits', 'maxFractionDigits']

        if (customPropertyNames !== undefined) {
            return propertyNames.concat(customPropertyNames)
        }
        else {
            return propertyNames
        }
    }

    /**
     * Set properties for a single component.
     *
     * @param {int} id - The id of the component to change.
     * @param {object} data - The properties to change.
     */
    setProperties(id, data) {
        const component = this.view.getComponentById(id)

        if (typeof component === 'object') {
            component.setProperties(data)
        }
    }

    /**
     * Set new controller context.
     *
     * @param {class} context - The new context to be activated.
     */
    setContext(context) {
        this.context = context
    }

    /**
     * Build the DOM elements.
     *
     * @param {string} selector - DOM selector to the element, where to mount the app.
     */
    buildView(selector) {
        this.view.buildDOM(selector)
    }

    /**
     * Get a component by id.
     *
     * @param {string} id - Id of component to get.
     */
    getComponentById(id) {
        return this.view.getComponentById(id)
    }

    /**
     * Send a message to the current view.
     *
     * @param {any} message - The component is responsible for the interpretation of the message.
     */
    sendMessageToView(message) {
        this.view.handleMessage(message)
    }

    /**
     * Send a message to a specific component.
     *
     * @param {string} id - The id of the component, which should receive the message.
     * @param {any} message - The component is responsible for the interpretation of the message.
     */
    sendMessageToComponent(id, message) {
        const component = this.view.getComponentById(id)

        if (typeof component === 'object') {
            component.handleMessage(message)
        }
    }

    /**
     * Fetch json data from URL.
     *
     * @param {string} url - URL to the data source.
     */
    fetchJsonData(url) {
        // Make an API request using fetch or XMLHttpRequest
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // Update the model with the fetched data
                // Muss aufgerufen werden, wenn Daten geladen und temporär in einem Object gespeichert werden
                if (this.context !== null) {
                    this.context.onDataChanged(data)
                }
                else {
                    this.onDataChanged(data)
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }

    /**
     * Formats a value for display
     *
     * @param {number} value - The value to format.
     * @param {string} locale - An optional locale, i.e. 'us/EN' or 'de/DE'.
     * @param {int} minFractionDigits - An optional value for the minium amount of digits.
     * @param {int} maxFractionDigits - An optional value for the maxium amount of digits.
     */
    formatNumber(value, locale, minFractionDigits, maxFractionDigits) {
        if (typeof value === 'undefined' || value === null) {
            return undefined
        }
        else {
            let usedLocale = this.locale

            if (typeof locale === 'string') {
                usedLocale = locale
            }

            if (minFractionDigits === undefined) {
                minFractionDigits = this.minFractionDigits
            }

            if (maxFractionDigits === undefined) {
                maxFractionDigits = this.maxFractionDigits
            }

            return value.toLocaleString(usedLocale, {
                style: 'decimal',
                minimumFractionDigits: minFractionDigits,
                maximumFractionDigits: maxFractionDigits
            })
        }
    }

    /**
     * Converts a float to a string with a maximum of fractional digits.
     *
     * @param {number} value - The value to convert.
     * @param {int} maxFractionDigits - An optional value for the maxium amount of decimal digits.
     * @return {string} A string representing the number with specified decimal digits.
     */
    static numberToString(value, maxFractionDigits) {
        if (value === undefined || value === null) {
            return ''
        }

        if (maxFractionDigits === undefined) {
            maxFractionDigits = 2
        }

        return parseFloat(value.toFixed(maxFractionDigits))
    }
}