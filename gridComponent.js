import Component from './component.js'


export default class GridComponent extends Component {
    constructor(parent, id, setupData) {
        super(parent, id, setupData)
    }

    build() {
        this.e = this.domCreateElement('div')
        this.parent.e.appendChild(this.e)
        this.e.style.display = 'grid'
        this.e.style.gridTemplateColumns = 'repeat(8, 1fr)';
        this.e.style.gridGap = '12px';
        this.e.style.borderRadius = '20px'
        this.e.className = 'grid'

        this.buildChilds()
    }

    setProperties(data) {
    }
}
