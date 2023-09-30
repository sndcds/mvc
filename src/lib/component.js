import View from './view.js'


export default class Component {
    constructor(parent, id, setupData) {
        this.e = null           // The DOM element.
        this.id = id            // Identifier, a string.
        this.group = undefined  // A group identifier, a string.
        this.tag = undefined    // A tag, for custom use.
        this.parent = parent    // The parent component, can be null if this is a root component.
        this.childs = []        // Array with the cilds of this component.

        if (parent) {
            parent.childs.push(this)
        }

        this.classPrefix = undefined

        if (setupData !== undefined) {
            if (setupData.classPrefix !== undefined) {
                this.classPrefix = setupData.classPrefix
            }
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
     *  Get property names.
     *
     *  @return An array with property names or undefined, if no properties exist.
     */
    propertyNames(customPropertyNames) {
        const propertyNames = ['id', 'group', 'tag']

        if (customPropertyNames !== undefined) {
            return propertyNames.concat(customPropertyNames)
        }
        else {
            return propertyNames
        }
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

    // Receives a message and forces descendants to receive it.
    setMessage(message) {
    }

    setProperties(data) {
        if (data !== undefined) {
            const propertyNames = this.propertyNames()
            if (propertyNames !== undefined) {
                for (const prop of this.propertyNames()) {
                    if (data[prop] !== undefined) {
                        this[prop] = data[prop]
                    }
                }
            }
        }
    }

    // Create an element with an optional CSS class.
    domCreateElement(tag, className) {  // TODO: Can this be declared as static?
        const element = document.createElement(tag)
        if (className) {
            element.classList.add(className)
        }
        return element
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
     * Returns a prfixed CSS class name.
     *
     * @param {String} className The class name.
     * @return {String} The prefixed class name.
     */
    prefixedClassName(className) {
        if (this.classPrefix !== undefined) {
            return `${this.classPrefix}_${className}`
        }
        else {
            return className
        }
    }
}