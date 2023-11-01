import Component from './component.js'

/**
 * Class representing a specific view.
 * @extends Component
 */
export class View extends Component {
    constructor() {
        super()

        this.parent = null
    }

    /**
     * Build Document from all components, starting from the view.
     *
     * @param {string} selector - DOM selector to the element, where to mount the app.
     */
    buildDOM(selector) {
        this.e = this.getDomElement(selector)

        if (this.e !== null) {
            this.buildChilds()
        }
    }
}