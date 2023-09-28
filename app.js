import View from './view.js'
import Controller from './controller.js'
import Component from './component.js'


export default class App extends Controller {
    constructor(model, view) {
        super(model, view)
    }

    initApp(url, id) {
        this.data = this.model.getStorage('data')
        this.districtId = this.model.getStorage('districtId')

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
            this.onDataChanged(this.data)
        }
    }

    onDataChanged = (data) => {
        this.model.setDataObject(data)
        this.model.setDistrictObject(this.model.districtId)

        const temp = {'data': this.model.data, 'districtId': this.model.districtId}
        this.setProperties('districtSelect', temp)
    }

    onDistrictChanged = (id) => {
        this.model.setDistrictId(id + 1)
        this.model.setDistrictObject(id + 1)
    }
}
