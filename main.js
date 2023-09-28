import App from './app.js'
import AppModel from './appModel.js'
import Controller from './controller.js'
import Model from './model.js'
import View from './view.js'
import Component from './component.js'
import TestComponent from './testcomponent.js'
import DistrictSelectComponent from './districtSelectComponent.js'
import PopComponent from './popComponent.js'
import GridComponent from './gridComponent.js'



// Example usage

const model = new AppModel()
const view = new View()

const chartA = new GridComponent(view, 'chartA')
new PopComponent(chartA, 'button1')
new Component(chartA, 'button2')
new Component(chartA, 'button3')
const x = new GridComponent(chartA, 'buttonX')
new Component(x, 'button4')
new TestComponent(x, 'button4')
new TestComponent(x, 'button4')
new TestComponent(x, 'button4')

const chartB = new Component(view, 'chartB')
// new PopComponent(chartA, 'pop')
new DistrictSelectComponent(chartB, 'districtSelect')
new Component(chartB, 'button1')


const chartC = new GridComponent(view, 'chartC')

for (let i = 1; i <= 10; i++) {
    new PopComponent(chartC, 'pop-' + i, {"Label": "Hallo", "Value": 123, "Percentage": 87.3, "BarOffset": 13.2, "BarColor1": "#d1e4fd", "BarColor2": "#0069f6"})
}

const app = new App(model, view)

app.buildView('root')
app.initApp('./details.json', 13)

const c = app.componentById('districtSelect')

const htmlString = "<div id='foo'><a href='#'>Link</a><span></span></div>"

// c.renderView(model.templateData)
// app.sendMessage("Hello Component")
// app.sendMessageToComponent('button3', "News")
/*
app.setProperties('component-4', {"color": "#048", "width": 100, "flag": true })
app.setProperties('component-6', {"color": "#965", "width": 100, "flag": true })
app.setProperties('component-987', {"color": "#a93", "width": 100, "flag": true })
*/
// const c = app.componentById('component-3')
// console.log(c.id)