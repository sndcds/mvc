import Component from './component.js'

// Comp

export default class PopComponent extends Component {
    /**
     * Component for displaying a laben, value, bar an percetage.
     *
     * Can be used for displaying numeric information, i. e. of statistics and other number related contexts.
     *
     * @since      20.9.2023
     *
     * @param {Component}   parent      The parent component.
     * @param {String}      id          The id of the new Component.
     * @param {any}         date        An optionam data information.
     */
    constructor(parent, id, data) {
        super(parent, id, data)
        this.label = 'Label'
        this.value = 0
        this.percentage = 100
        this.barOffset = 20
        this.barSize = 100
        this.barColor1 = '#999'
        this.barColor2 = '#333'
    }

    /**
     *  Build the DOM Elements for HTML rendering og the component.
     *
     *  This method mus be overridden in derived classes.
     *
     *  Styling:
     *  One solotion is to assign classes to the emelemts.
     */
    build() {
        this.e = this.domCreateElement('div')
        this.parent.e.appendChild(this.e)
        this.e.className = 'pop'

        let a = this.e.appendChild(this.domCreateElement('div'))
        a.style.textAlign = 'center'
        a.innerText = 'Label'
        a.className = 'popLabel'

        a = this.e.appendChild(this.domCreateElement('div'))
        a.style.textAlign = 'center'
        a.innerText = '1.000'
        a.className = 'popValue'

        a = this.e.appendChild(this.domCreateElement('div'))
        a.style.textAlign = 'left'
        a.style.background = 'linear-gradient(90deg, #d1e4fd 5%, #d1e4fd 19.9%, #0069f6 20%, #0069f6 50%, #0069f6 20%, #d1e4fd 50.1%)'
        a.className = 'popBar'
        a = this.e.appendChild(this.domCreateElement('div'))
        a.style.textAlign = 'center'
        a.innerText = '%'
        a.className = 'popPercentage'

        this.buildChilds()
    }

    setProperties(data) {
    }
}
