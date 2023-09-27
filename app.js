import Controller from './controller.js'


export default class App extends Controller {

    constructor(model, view) {
        super(model, view)
    }


    init(url, id) {

        this.data = this.model.getStorage('data')
        this.districtId = this.model.getStorage('districtId')

        console.log("...model: " + this.model)

        if (this.districtId === null) {
            this.model.setDistrictId(id)
        }
        else {
            this.model.setDistrictId(this.districtId)
        }

        if (this.data === null) {
            this.fetchData(url)
        }
        else {
            // this.onDataChanged(this.data)    // TODO
        }
    }
}
