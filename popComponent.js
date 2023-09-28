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
    constructor(parent, id, setupData) {
        super(parent, id, setupData)
        this.label = 'Label'
        this.value = 0
        this.percentage = 100
        this.barOffset = 20
        this.barSize = 30
        this.barColor1 = '#999'
        this.barColor2 = '#333'

        if (setupData !== undefined) {
            if (setupData.Label !== undefined)
                this.label = setupData.Label
            if (setupData.Value !== undefined)
                this.value = setupData.Value
            if (setupData.Percentage !== undefined)
                this.percentage = setupData.Percentage
            if (setupData.BarOffset !== undefined)
                this.barOffset = setupData.BarOffset
            if (setupData.BarSize !== undefined)
                this.barSize = setupData.BarSize
            if (setupData.BarColor1 !== undefined)
                this.barColor1 = setupData.BarColor1
            if (setupData.BarColor2 !== undefined)
                this.barColor2 = setupData.BarColor2
        }
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
        a.innerText = this.label
        a.className = 'popLabel'

        a = this.e.appendChild(this.domCreateElement('div'))
        a.style.textAlign = 'center'
        a.innerText = this.value
        a.className = 'popValue'


        const color1 = this.barColor1
        const color2 = this.barColor2
        const spot1 = this.barOffset + '%'
        const spot2 = (this.barOffset + 0.1) + '%'
        const spot3 = (this.barOffset + this.barSize - 0.1) + '%'
        const spot4 = (this.barOffset + this.barSize) + '%'
        const gradient = `linear-gradient(90deg, ${color1} 0%, ${color1} ${spot1}, ${color2} ${spot2}, ${color2} ${spot3}, ${color1} ${spot4})`; // "Hello World"
        // console.log(gradient)

        a = this.e.appendChild(this.domCreateElement('div'))
        a.style.textAlign = 'left'
        a.style.background = gradient
        a.className = 'popBar'
        a = this.e.appendChild(this.domCreateElement('div'))
        a.style.textAlign = 'center'
        a.innerText = this.percentage + " %"
        a.className = 'popPercentage'

        this.buildChilds()
    }

    setProperties(data) {
    }
}
