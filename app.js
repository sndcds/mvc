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


    onDataChanged = (data) => {
        this.model.setDataObject(data)
        this.model.setDistrictObject(this.model.districtId)
        // this.view.renderDataLoading(this.model.data)
    }

    onDistrictChanged = (id) => {
        this.model.setDistrictId(id + 1)
        this.model.setDistrictObject(id + 1)
    }
}
