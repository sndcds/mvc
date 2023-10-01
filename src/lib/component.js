import View from './view.js'


export default class Component {
    constructor(parent, id, setupData) {
        this.e = null           // The DOM element.
        this.id = id            // Identifier, a string.
        this.group = null       // A group identifier, a string.
        this.tag = null         // A tag, for custom use.
        this.parent = parent    // The parent component, can be null if this is a root component.
        this.childs = []        // Array with the cilds of this component.
        this.classPrefix = null // CSS class prefix

        if (parent) {
            parent.childs.push(this)
        }
    }

    // Build the DOM element(s).
    // This method has to be overriden by derived classes.
    build() {
        if (this.parent) {
            this.e = this.domCreateElement('div')
            this.parent.e.appendChild(this.e)
        }
        this.buildChilds()
    }

    // Build all descendants.
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
        const propertyNames = ['id', 'group', 'tag', 'classPrefix']

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
        console.log(n)
        console.log(typeof n)
        return n
    }

    // Receives a message and forces descendants to receive it.
    setMessage(message) {
    }

    /**
     * Create a DOM element with an optional CSS class.
     *
     * @param {string} tag - The HTML tag to be created.
     * @param {string, array} classNames - A single class name as string or an array with class names.
     * @returns {object} The DOM element.
     */
    domCreateElement(tag, classNames) {
        const element = document.createElement(tag)
        if (classNames === 'string') {
            element.classList.add(classNames)
        }
        else if (classNames instanceof Array) {
            classNames.forEach(function (className) {
                element.classList.add(className)
            })
        }
        return element
    }

    /**
     * Add a DOM element with an optional CSS class.
     *
     * @param {string} tag - The HTML tag to be created.
     * @param {string, array} classNames - A single class name as string or an array with class names.
     * @returns {object} The DOM element.
     */
    addDomElement(tag, classNames) {
        this.e = this.domCreateElement(tag, classNames)
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
     * Returns a prefixed CSS class name.
     *
     * @param {string} className - The class name.
     * @return {string} The prefixed class name.
     */
    prefixedClassName(className) {
        if (this.classPrefix !== null) {
            return `${this.classPrefix}${className}`
        }
        else {
            return className
        }
    }
}