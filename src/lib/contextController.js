export default class ContextController {
    constructor(app) {
        this.app = app
        this.model = null
        this.view = null

        app.context = this    // App must know the context controller.
    }

    checkData() {
        /*
        if (app.model.data === null) {
            app.fetchData('./details.json')
        }
        */
    }

    onDataChanged(data) {
    }

    prepareView() {

    }

    buildView(selector) {
        this.view.buildDOM(selector)
    }
}