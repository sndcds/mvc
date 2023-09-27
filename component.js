import View from './view.js'


export default class Component {

    constructor(parent, id, dataSrc) {
        this.e = null           // The DOM element.
        this.id = id            // Identifier, a string.
        this.parent = parent    // The parent component, can be null if this is a root component.
        this.childs = []        // Array with the cilds of this component.
        if (parent) {
            parent.childs.push(this)
        }
    }

    // Receives a message and forces descendants to receive it.
    receiveMessage(message) {
        if (this.e) {
            if (this.childs.length < 1)
                this.e.innerHTML = '<h1>' + message + ', ' + this.id + '</h1>';
            this.e.style.backgroundColor = '#f8a';
        }

        this.childs.forEach(item => {
            item.receiveMessage(message);
        })
    }

    // Creates the DOM element(s).
    // This method has to be overriden by derived classes.
    create() {
        if (this.parent) {
            this.e = this.domCreateElement("div");
            // console.log("create id:" + this.id + ", e:" + this.e)
            this.parent.e.appendChild(this.e);
//            this.e.className = "testclass";
//            if (this.id == "chartA")
//                this.e.className = "testclass2";
        }
        this.createChilds();
    }

    // Creates all descendants.
    createChilds() {
        this.childs.forEach(child => {
            child.create()
        })
    }


    getComponentById(id) {
        if (id === this.id) {
            return this
        }

        let component = undefined
        this.childs.every(child => {
            component = child.getComponentById(id)
            if (typeof component === 'object' && component.id === id) {
                return false
            }
            return true
        })
        return component
    }


    // Tell component and all descendants, that they need to update.
    needsUpdateAll(data) {
        this.e.innerHtml = 'hello';
        console.log("component update: " + this.id)
        this.needsUpdateAllChilds(data)
    }

    // Tell all descendants, that they need to update.
    needsUpdateAllChilds(data) {
        this.childs.forEach(child => {
            child.needsUpdateAll(data)
        })
    }






    bindEventHandler(eventType, handler) {
        // Prototyp, does nothing.
    }



    // Helper classes

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
}
