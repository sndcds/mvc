import { Component } from '../index.js'


export default class Grid extends Component {
    constructor(parent, id, setupData) {
        super(parent, id, setupData)
        this.setProperties(setupData)
    }

    defaultClass() {
        return 'sc-grid'
    }

    build() {
        this.e = this.addDomElement('div')
        this.e.style.display = 'grid'
        this.buildChilds()
    }
}