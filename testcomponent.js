import Component from './component.js'


export default class TestComponent extends Component {

    constructor(parent, id, dataSrc) {
        super(parent, id, dataSrc)
    }

    consumeMessage(message) {
        if (this.e) {
            if (this.childs.length < 1)
                this.e.innerHTML = '<p>' + this.id + '<p>';
            // this.e.style.backgroundColor = '#88a';
        }

        this.childs.forEach(item => {
            item.consumeMessage(message)
        })
    }

    create() {
        if (this.parent) {
            this.e = this.domCreateElement("p")
            // console.log("create id:" + this.id + ", e:" + this.e)
            this.e.style.backgroundColor = "#ff0"
            this.parent.e.appendChild(this.e)
//            this.e.className = "testclass";
//            if (this.id == "chartA")
//                this.e.className = "testclass2";
        }
        this.buildChilds()
    }
}
