export default class ContextController {
    constructor(app) {
        this.app = app

        app.context = this    // App must know the context controller.

        this.buildView()
        this.checkData()
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

    buildView() {
    }

    renderView() {
    }
}