import Model from './model.js'
import View from './view.js'
import Component from './component.js'


export default class Controller {

    constructor(model, view) {
        this.model = model
        this.view = view
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
        this.view.receiveMessage(message)
    }
}
