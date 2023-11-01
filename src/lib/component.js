import View from './view.js'

/**
 * Class representing a abstract view.
 */
export class Component {
    /**
     * Create an abstract view component.
     * @param {object} parent - The parent component object.
     * @param {string} id - The id should be a unique string idetifier.
     * @param {object} setupData - Deprecated paramenter will be removed in future.
     */
    constructor(parent, id, setupData) {
        this.e = null               // The DOM element representing this component on the HTML page.
        this.id = id                // An identifier, a string which gives access to the component.
        this.group = null           // A group identifier, a string which can be used to find elements by group.
        this.tag = null             // A tag, for custom use.
        this.parent = parent        // The parent component, can be null if this is a root component.
        this.childs = []            // Array with the childs of this component.
        this.classList = null       // Comma separated list of DOM element class names.
        this.events = null          // Events, that should be handled by this component.
        this.eventMode = 'default'  // The mode, in which event handlers should be created.
        this.routeName = null       // Name for routing.

        // Add component to parent.
        if (parent) {
            parent.childs.push(this)
        }
    }

    /**
     * Build the DOM element(s) of a customized component.
     * This method has to be overriden by derived classes.
     */
    build() {
    }

    /**
     * Update component after changes to it.
     * This method has to be overriden by derived classes.
     *
     * This method will be called, when properties has been changed.
     * The component has to reflect the changes in its visual representation.
     */
    propertiesChanged() {
    }

    /**
     * Build the DOM element(s).
     */
    buildDOM() {
        // Call the component dependent build function.
        this.build()

        // Add event handlers, only in 'default' mode.
        if (this.eventMode === 'default' && this.events !== null) {
            this.events.forEach((event) => {
                if (typeof event.handler === 'function') {
                    this.e.addEventListener(event.type, () => event.handler(this))
                }
                else if (typeof event.handler === 'object') {
                    this.e.addEventListener(event.type, () => event.handler.handleEvent(this))
                }
            })
        }

        // Build child components.
        this.buildChilds()
    }

    /**
     * Build all descendant components.
     */
    buildChilds() {
        this.childs.forEach((child) => {
            child.buildDOM()
        })
    }

    /**
     * Get property names.
     *
     * @param {array} customPropertyNames - An array with the names of a derived class.
     * @return {array} An array with property names or undefined, if no properties exist.
     */
    getPropertyNames(customPropertyNames) {
        const propertyNames = ['id', 'group', 'tag', 'classList', 'events', 'eventMode', 'routeName']

        if (customPropertyNames !== undefined) {
            return propertyNames.concat(customPropertyNames)
        }
        else {
            return propertyNames
        }
    }

    /**
     * Set component properties by data.
     *
     * @param {array} data - An array with data in the form of name/value pairs.
     */
    setProperties(data) {
        let changed = false

        if (data !== undefined) {
            const propertyNames = this.getPropertyNames()

            if (propertyNames !== undefined) {
                for (const propertyName of this.getPropertyNames()) {
                    if (data[propertyName] !== undefined) {
                        this[propertyName] = data[propertyName]
                        changed = true
                    }
                }
            }
        }

        if (changed === true) {
            this.propertiesChanged()
        }
    }

    /**
     * Get component by id.
     *
     * @param {string} id - The id of the component to find.
     * @return {Component} The found component or null, if no component has the given id.
     */
    getComponentById(id) {
        if (id === this.id) {
            return this
        }

        for (const child of this.childs) {
            const result = child.getComponentById(id)

            if (result !== null) {
                return result
            }
        }

        return null
    }

    /**
     * Count all descendant components.
     * Descendants are children, grandchildren, and so on.
     *
     * @return {number} Number of descendants.
     */
    countDescendants() {
        let n = 0

        for (const child of this.childs) {
            n += child.countDescendants() + 1
        }

        return n
    }

    /**
     * Handles a message send to the component.
     *
     * @param {string} message - The message to be handled.
     */
    handleMessage(message) {
    }

    /**
     * Create a DOM element with an optional CSS class.
     *
     * @param {string} tag - The HTML tag to be created.
     * @return {object} The DOM element.
     */
    createDomElement(tag) {
        return document.createElement(tag)
    }

    /**
     * Add a DOM element with an optional CSS class.
     *
     * @param {string} tag - The HTML tag to be created.
     * @return {object} The DOM element.
     */
    addDomElement(tag) {
        this.e = this.createDomElement(tag)
        this.addElementClasslist(this.e, this.classList)
        this.parent.e.appendChild(this.e)

        return this.e
    }

    /**
     * Retrieve an element from the DOM.
     *
     * @param {string} selector - DOM selector to the element.
     * @return {HTMLElement} The DOM element or null.
     */
    getDomElement(selector) {
        return document.querySelector(selector)
    }

    /**
     * Helper method for adding classes to an DOM element.
     *
     * @param {string} classList - One ore more class names separated with spaces.
     */
    addElementClasslist(e, classList) {
        if (classList !== undefined && classList !== null) {
            const classNames = classList.split(' ')

            classNames.forEach((className) => {
                className = className.trim()

                // TODO: Use try catch
                if (className !== '') {
                    if (!e.classList.contains(className)) {
                        e.classList.add(className)
                    }
                }
            })
        }
    }
}