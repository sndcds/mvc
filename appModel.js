import Model from './model.js'


export default class AppModel extends Model {

    constructor() {
        super()
        this.data = null
        this.districtNames = null
        this.districtObject = null
        this.districtId = null
    }

    bindDataChanged(callback) {
        // this.onDataChanged = callback
    }

    setDataObject(data) {
        this.data = data
        this.districtNames = data.map((item) => item.district_name)
        this.setStorage('data', data)
    }

    setDistrictId(districtId) {
        this.districtId = districtId
        this.setStorage('districtId', districtId)
    }

    setDistrictObject(districtId) {
        const condition = (district) => district.district_id == districtId
        const items = this.data.filter(condition)

        if (items.length > 0) {
            this.districtObject = items[0]
            this.setStorage('districtObject', items[0])
        }
    }
}
