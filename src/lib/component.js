import View from './view.js'


export default class Component {
    constructor(parent, id, setupData) {
        this.e = null           // The DOM element.
        this.id = id            // Identifier, a string.  TODO: rename to uid
        this.group = null       // A group identifier, a string.
        this.tag = null         // A tag, for custom use.
        this.parent = parent    // The parent component, can be null if this is a root component.
        this.childs = []        // Array with the cilds of this component.
        this.classList = null   // Comma separated list of DOM element class names.

        if (parent) {
            parent.childs.push(this)
        }
    }

    /**
     *  Build the DOM element(s).
     *  This method has to be overriden by derived classes.
     */
    build() {
        this.buildChilds()
    }

    /**
     * Build all descendants.
     */
    buildChilds() {
        this.childs.forEach((child) => {
            child.build()
        })
    }

    /**
     * Get property names.
     *
     * @param {array} customPropertyNames - An array with the names of a derived class
     * @return {array} An array with property names or undefined, if no properties exist.
     */
    propertyNames(customPropertyNames) {
        const propertyNames = ['id', 'group', 'tag', 'classList']

        if (customPropertyNames !== undefined) {
            return propertyNames.concat(customPropertyNames)
        }
        else {
            return propertyNames
        }
    }

    setProperties(data) {
        let changed = false

        if (data !== undefined) {
            const propertyNames = this.propertyNames()
            if (propertyNames !== undefined) {
                for (const prop of this.propertyNames()) {
                    if (data[prop] !== undefined) {
                        this[prop] = data[prop]
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
     * Update component when properties are changed.
     */
    propertiesChanged() {
        // This method will be called, when properties changed.
        // The component can reflect the changes in its visual representation.
    }


    componentById(id) {
        if (id === this.id) {
            return this
        }

        let component

        this.childs.every((child) => {
            component = child.componentById(id)

            if (typeof component === 'object' && component.id === id) {
                return false
            }

            return true
        })

        return component
    }

    /**
     * Count all descendant components.
     *
     * Descendants are children, grandchildren, and so on.
     *
     * @returns {number} Number of descendants.
     */
    countDescendants() {
        let n = 0
        for (const child of this.childs) {
            n += child.countDescendants() + 1
        }
        return n
    }

    // Receives a message and forces descendants to receive it.
    setMessage(message) {
    }

    /**
     * Create a DOM element with an optional CSS class.
     *
     * @param {string} tag - The HTML tag to be created.
     * @returns {object} The DOM element.
     */
    domCreateElement(tag) {
        return document.createElement(tag)
    }

    /**
     * Add a DOM element with an optional CSS class.
     *
     * @param {string} tag - The HTML tag to be created.
     * @returns {object} The DOM element.
     */
    addDomElement(tag) {
        this.e = this.domCreateElement(tag)
        this.domAddClasses(this.e, this.classList)
        this.parent.e.appendChild(this.e)

        return this.e
    }

    // Remove an element from the DOM.
    domRemoveElement(element) { // TODO: Can this be declared as static?
        element.parentNode.removeChild(element)
    }

    // Retrieve an element from the DOM.
    domGetElement(selector) {   // TODO: Can this be declared as static?
        return document.querySelector(selector)
    }

    /**
     * Helper method for adding classes to an DOM element.
     *
     * @param {string} classList - One ore more class names separated with spaces.
     */
    domAddClasses(e, classList) {
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