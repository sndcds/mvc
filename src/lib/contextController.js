export default class ContextController {
    constructor(app) {
        this.app = app
        this.model = null
        this.view = null

        app.context = this    // App must know the context controller.
    }

    onDataChanged(data) {
    }

    prepareView() {

    }

    buildView(selector) {
        this.view.buildDOM(selector)
    }

    /**
     * Send a message to a specific component.
     *
     * @param {string} id - The id of the component, which should receive the message.
     * @param {any} message - The component is responsible for the interpretation of the message.
     */
    sendMessageToComponent(id, message) {
        const component = this.view.getComponentById(id)

        if (typeof component === 'object') {
            component.handleMessage(message)
        }
    }
}