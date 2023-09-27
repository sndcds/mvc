import AppModel from './appModel.js'
import View from './view.js'
import Component from './component.js'
import TestComponent from './testcomponent.js'
import App from './app.js'



// Initialize
const model = new AppModel()
const view = new View()
const chartA = new Component(view, 'chartA', 'age_0_to_under_8')
const chartB = new Component(view, 'chartB')
new Component(chartA, 'button1')
new Component(chartB, 'button2')
new Component(chartB, 'button3')
new Component(chartB, 'button4')
const chartC = new Component(view, 'chartC')
for (let i = 0; i < 15; i++) {
    new TestComponent(chartC, 'component-' + i)
}

const app = new App(model, view)
app.init('./details.json', 13)

view.create()   // app.create()
// view.needsUpdateAll()   // app.needsUpdateAll()
app.sendMessage("Hello Component")
/*
// Fetch data from the API when the application starts.
const apiUrl = './details.json'
app.fetchApiData(apiUrl)
*/