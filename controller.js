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


    fetchApiData = (url) => {
        // Make an API request using fetch or XMLHttpRequest.
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            // Update the model with the fetched data.
            // this.onDataChanged(data).
        })
        .catch((error) => {
            console.error('Error fetching data:', error)
        })
    }



    sendMessage(message) {
        this.view.consumeMessage(message)
    }

    sendMessageToComponent(componentId, message) {
        let component = this.view.componentById(componentId)
        if (typeof component === 'object') {
            component.consumeMessage(message)
        }

    }

    updateProperties(componentId, json) {
        const jsonObject = JSON.parse(json);
        let component = this.view.componentById(componentId)
        if (typeof component === 'object') {
            component.consumeJsonObject(jsonObject)
        }
    }
}
