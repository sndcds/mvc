import Component from './component.js'


export default class TestComponent extends Component {

    constructor(parent, id, setupData) {
        super(parent, id, setupData)
    }

    setMessage(message) {
        if (this.e) {
            if (this.childs.length < 1)
                this.e.innerHTML = '<p>' + this.id + '<p>';
            // this.e.style.backgroundColor = '#88a';
        }

        this.childs.forEach(item => {
            item.setMessage(message)
        })
    }

    build() {
        this.e = this.domCreateElement("p")
        this.e.innerText = 'Hello'
        this.e.style.backgroundColor = "#999"
        this.parent.e.appendChild(this.e)
        this.buildChilds()
    }
}
