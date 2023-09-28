import Model from './model.js'
import View from './view.js'
import Component from './component.js'


export default class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
    }

    buildView(elementId) {
        this.view.build(elementId)
    }

    componentById(id) {
        return this.view.componentById(id)
    }

    sendMessage(message) {
        this.view.setMessage(message)
    }

    sendMessageToComponent(componentId, message) {
        let component = this.view.componentById(componentId)

        if (typeof component === 'object') {
            component.setMessage(message)
        }
    }

    setProperties(componentId, data) {
        let component = this.view.componentById(componentId)

        if (typeof component === 'object') {
            component.setProperties(data)
        }
    }

    fetchData = (url) => {
        // Make an API request using fetch or XMLHttpRequest
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            // Update the model with the fetched data
            this.onDataChanged(data)
          })
          .catch((error) => {
            console.error('Error fetching data:', error)
          })
     }

     onDataChanged = (data) => {
     }

}
