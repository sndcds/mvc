import Component from './component.js'


export default class TestComponent extends Component {

    constructor(parent, id, dataSrc) {
        super(parent, id, dataSrc)
    }

    receiveMessage(message) {
        console.log("receiveMessage id:" + this.id + ", e:" + this.e)
        if (this.e) {
            if (this.childs.length < 1)
                this.e.innerHTML = '<p>' + message + '<p>';
            this.e.style.backgroundColor = '#88a';
        }

        this.childs.forEach(item => {
            item.receiveMessage(message);
        })
    }
}
