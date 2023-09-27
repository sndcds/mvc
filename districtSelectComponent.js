import Component from './component.js'


export default class DistrictSelectComponent extends Component {

    constructor(parent, id, dataSrc) {
        super(parent, id, dataSrc)
    }


    create() {
        this.e = this.domCreateElement("select");
        this.parent.e.appendChild(this.e);
        this.createChilds();
    }


    bindDistrictChanged(eventType, handler) {
        this.e.addEventListener(eventType, event => {
            const selectedOption = this.e.value
            handler(selectedOption - 1)
        })
    }
}
