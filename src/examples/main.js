import MVC from '../index.js'
import APP from './index.js'


function getRandomColor() {
    const red = Math.floor(Math.random() * 256)
    const green = Math.floor(Math.random() * 256)
    const blue = Math.floor(Math.random() * 256)
    return `rgb(${red}, ${green}, ${blue})`
}

// Example usage

const model = new APP.AppModel()
const view = new MVC.View()

const container1 = new MVC.GridComponent(view, 'container1')
new APP.PopComponent(container1, 'pop1')
new MVC.Component(container1, 'button1')
new MVC.Component(container1, 'button2')
const subContainer = new MVC.GridComponent(container1, 'subContainer')
new MVC.Component(subContainer, 'button4')
new APP.TestComponent(subContainer, 'test1')
new APP.TestComponent(subContainer, 'test2')
new APP.TestComponent(subContainer, 'test3')

const subView = new MVC.Component(view, 'subView')
new APP.DistrictSelectComponent(subView, 'districtSelect')
new MVC.Component(subView, 'button1')

const container2 = new MVC.GridComponent(view, 'chartC')

for (let i = 1; i <= 3; i++) {
    new APP.PopComponent(container2, `pop-${i}`, {'classPrefix': 'xyz', 'label': 'Anzahl', 'value': 123, 'percentage': 87.3, 'barOffset': 13.2, 'barColor1': '#d1e4fd', 'barColor2': '#0069f6'})
}

for (let i = 4; i <= 12; i++) {
    const labels = ['SUN', 'DEC', 'Apple', 'NeXT', 'HP', 'Compaq', 'Lenovo', 'sgi', 'Atari', 'Commodore', 'IBM']
    const randomIndex = Math.floor(Math.random() * labels.length)
    const label = labels[randomIndex]

    const barSize = Math.floor(Math.random() * 80)
    const barOffset = Math.floor(Math.random() * (100 - barSize))
    const setupData = {
        label,
        value: Math.floor(Math.random() * 1000),
        percentage: barSize,
        barOffset,
        barSize,
        barColor1: getRandomColor(),
        barColor2: getRandomColor()
    }

    new APP.PopComponent(container2, `pop-${i}`, setupData)
}

const app = new APP.App(model, view)

app.buildView('root')
app.initApp('./details.json', 13)