export default class Model {

    constructor() {
        this.data = JSON.parse(localStorage.getItem('data')) || []
        this.districtNames = null
        this.districtObject = null
        this.districtId = 5
    }

    bindDataChanged(callback) {
        // this.onDataChanged = callback
    }

    _commit(data) {
        localStorage.setItem('data', JSON.stringify(data))
    }

    setDataObject(data) {
        this.data = data
        this._commit(data)
    }

    setDistrictObject(districtId) {
        const condition = (district) => district.district_id == districtId
        const items = this.data.filter(condition)

        if (items.length > 0) {
            this.districtObject = items[0]
        }
    }
}
