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
    }

    configurate(data) {
        const propertyNames = ['locale', 'minFractionDigits', 'maxFractionDigits']

        if (data !== undefined) {
            for (const prop of propertyNames) {
                if (data[prop] !== undefined) {
                    this[prop] = data[prop]
                }
            }
        }
    }

    /**
     * Set new controller context
     *
     * @param (class) context The new context to be activated.
     */
    setContext(context) {
        this.context = context
    }

    /**
     * Build the DOM elements
     *
     * @param (string) elementId Id of DOM element, which is the root.
     */
    buildView(elementId) {
        this.view.build(elementId)
    }

    /**
     * Get a component by id.
     *
     * @param (string) id Id of component to get.
     */
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

    /**
     * Set properties for a single component.
     *
     * @param (int) compnentId The id of the component to change.
     * @param (object) data The properties to change.
     */
    setProperties(componentId, data) {
        const component = this.view.componentById(componentId)

        if (typeof component === 'object') {
            component.setProperties(data)
        }
    }

    /**
     * Fetch data from URL.
     *
     * @param (string) url URL to the data source.
     */
    fetchData(url) {
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
     * @param (number) value The value to format.
     * @param (string) locale An optional locale, i.e. 'us/EN' or 'de/DE'.
     * @param (int) minFractionDigits An optional value for the minium amount of digits.
     * @param (int) maxFractionDigits An optional value for the maxium amount of digits.
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
     * @param (number) value The value to convert.
     * @param (int) maxFractionDigits An optional value for the maxium amount of digits.
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