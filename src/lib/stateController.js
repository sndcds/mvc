export default class StateController {
    constructor(app) {
        this.app = app

        app.state = this    // App must know the state controller.

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