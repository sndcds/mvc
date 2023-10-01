import Component from './component.js'


export default class GridComponent extends Component {
    constructor(parent, id, setupData) {
        super(parent, id, setupData)
        this.setProperties(setupData)
    }

    build() {
        this.e = this.domCreateElement('div')
        this.parent.e.appendChild(this.e)
        this.e.style.display = 'grid'
        this.e.style.gridTemplateColumns = 'repeat(12, 1fr)'
        this.e.style.gridGap = '0px'
        this.e.style.borderRadius = '20px'
        this.e.className = 'grid'

        this.buildChilds()
    }

    setProperties(data) {
    }
}