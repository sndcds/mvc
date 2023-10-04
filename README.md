# mvc

Experimental Generative MVC Library.


### Install

```js
pnpm install @sndcds/mvc
```


### Examples

[https://github.com/sndcds/mvc-example](https://github.com/sndcds/mvc-example)


### Basic functionality

- Create one or more views related to `<div>` elements in your HTML using their id attributes.
- Create components in a tree hierarchy.
- Send messages to views and components.

### Features

- Components are aware of their parent and child components.
- Components can define custom logic to handle messages.

### Example

```js
const model = new AppModel()
const view = new View()

const containerA = new Component(view, 'containerA')
const containerB = new Component(view, 'containerB')
const containerC = new Component(view, 'containerC')

new Component(containerA, 'button1')
new Component(containerB, 'button2')
new Component(containerB, 'button3')

for (let i = 0; i < 9; i++) {
    new TestComponent(containerC, `component-${i}`)
}

const app = new App(model, view)
app.init('./details.json', 1)

app.buildView('root')

app.sendMessage("Hello Component")
app.sendMessageToComponent('button3', "News")

app.setProperties('component-4', {"color": "#048", "width": 100, "flag": true })
app.setProperties('component-6', {"color": "#965", "width": 100, "flag": true })
app.setProperties('component-987', {"color": "#a93", "width": 100, "flag": true })

const c = app.componentById('component-3')
console.log(c.id)
```
