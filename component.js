import View from './view.js'


export default class Component {

    constructor(parent, id) {
        this.id = id
        this.parent = parent
        this.childs = []
        if (parent) {
            parent.childs.push(this)
        }
    }

    receiveMessage(message) {
        console.log(this.id + ': ' + message)
        this.childs.forEach(item => {
            item.receiveMessage(message);
        })
    }


    create() {
//        this.parent.root.innerHTML = '<h1 style="color:yellow;">Hello</h1>'
        this.createChilds();
    }

    createChilds() {
        this.childs.forEach(child => {
            child.create()
        })
    }


    update(data) {
        console.log("component update: " + this.id)
        this.updateChilds(data)
    }

    updateChilds(data) {
        this.childs.forEach(child => {
            child.update(data)
        })
    }

}
