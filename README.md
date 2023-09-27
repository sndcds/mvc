# mvc
First try to write our own MVC in JavaScript.

### Basic functionality

- Create one or more views related to <div> elements in your HTML using their id attributes.
- Create components in a tree hierarchy.
- Send messages to views and components.

### Features

- Components are aware of their parent and child components.
- Components can define custom logic to handle messages.

### Example

```
// Create the model.
const model = new Model()

// Create a view, in this case without a specific <div> connected.
const view = new View()

// Create some components.
const c1 = new Component(view, 'container1')
const c2 = new Component(view, 'container2')
new Component(c1, 'text')
new Component(c1, 'button')

// Create more components in a loop.
for (let i = 1; i <= 8; i++) {
    new MyComponent(c2, 'component-' + i)
}

// Create the controller.
const app = new Controller(model, view)

// Activate the view.
view.create()

// Tell view, that all components must be updated.
view.needsUpdateAll()

// Send a message to all component.
app.sendMessage("Hello Component")
```


