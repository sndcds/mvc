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
/*
    build() {
        // No DOM elements to create here!
        // The view class must be related to a div element in html of page.
        this.buildChilds()
    }
*/
}
