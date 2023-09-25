import Model from './model.js'
import View from './view.js'
import Component from './component.js'


export default class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    // Explicit this binding
    this.model.bindDataChanged(this.onDataChanged)
    this.view.bindDistrictChanged(this.onDistrictChanged)

    // Display initial data
    this.onDataChanged(this.model.data)
  }

  onDataChanged = (data) => {
    this.model.setDataObject(data)
    this.model.setDistrictObject(this.model.districtId)
    this.view.renderDataLoading(this.model.data)
    this.view.renderDistrictSelect(this.model.data, this.model.districtId)
    this.view.renderDistrictMeta(this.model.districtObject)
    this.view.renderAgeSection(this.model.districtObject)
  }

  onDistrictChanged = (id) => {
    this.model.setDistrictObject(id + 1)
    this.view.renderDistrictMeta(this.model.districtObject)
    this.view.renderAgeSection(this.model.districtObject)
    console.log(this.view.constructor.name)
    this.view.update()  // this.model.data
  }

  fetchApiData = (url) => {
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

  sendMessage(message) {
      view.receiveMessage(message)
  }
}


// Initialize the MVC components
const model = new Model()
const view = new View()
const chartA = new Component(view, 'chartA')
const chartB = new Component(view, 'chartB')
const button1 = new Component(chartB, 'button1')
const app = new Controller(model, view)

app.sendMessage("Hello Component")
view.create()
view.update()

// Fetch data from the API when the application starts
const apiUrl = '/details.json'
app.fetchApiData(apiUrl)
