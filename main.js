import App from './app.js'
import AppModel from './appModel.js'
import Controller from './controller.js'
import Model from './model.js'
import View from './view.js'
import Component from './component.js'
import TestComponent from './testcomponent.js'



// Example usage

const model = new AppModel()
const view = new View()
const chartA = new Component(view, 'chartA', 'age_0_to_under_8')
const chartB = new Component(view, 'chartB')
new Component(chartA, 'button1')
const button = new Component(chartB, 'button2')
new Component(chartB, 'button3')
new Component(chartB, 'button4')
const chartC = new Component(view, 'chartC')
for (let i = 0; i < 1000; i++) {
    new TestComponent(chartC, 'component-' + i)
}

const app = new App(model, view)
app.init('./details.json', 13)

app.buildView('root')
// view.needsUpdateAll()   // app.needsUpdateAll()
app.sendMessage("Hello Component")
app.sendMessageToComponent('button3', "News")
app.updateProperties('component-4', '{"color": "#048", "width": 100, "flag": true }')
app.updateProperties('component-6', '{"color": "#965", "width": 100, "flag": true }')
app.updateProperties('component-987', '{"color": "#a93", "width": 100, "flag": true }')

const c = view.componentById('component-3')
console.log(c.id)

/*
// Fetch data from the API when the application starts.
const apiUrl = './details.json'
app.fetchApiData(apiUrl)
*/