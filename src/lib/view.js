import Component from './component.js'


export default class View extends Component {
    constructor() {
        super()
        this.parent = null
        this.e = document.getElementById('root')
    }

    build(elementId) {
        this.buildChilds()
    }
}