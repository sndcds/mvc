import { View, Controller, Component } from '../index.js'


export default class App extends Controller {
    /* eslint no-useless-constructor: 0 */
    constructor(model, view) {
        super(model, view)

        this.onDistrictChanged = this.onDistrictChanged.bind(this)  // TODO: Description!
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

    renderAgeSection() {
        const items = [
            {'id': 'ageView1', 'path': ['district_detail', '2021', 'age_groups', 'age_to_under_18']},
            {'id': 'ageView2', 'path': ['district_detail', '2021', 'age_groups', 'age_18_to_under_30']},
            {'id': 'ageView3', 'path': ['district_detail', '2021', 'age_groups', 'age_30_to_under_45']},
            {'id': 'ageView4', 'path': ['district_detail', '2021', 'age_groups', 'age_45_to_under_65']},
            {'id': 'ageView5', 'path': ['district_detail', '2021', 'age_groups', 'age_65_to_under_80']},
            {'id': 'ageView6', 'path': ['district_detail', '2021', 'age_groups', 'age_80_and_above']},
            {'id': 'ageView7', 'path': ['district_detail', '2021', 'age_groups', 'age_0_to_under_7']},
            {'id': 'ageView8', 'path': ['district_detail', '2021', 'age_groups', 'age_60_and_above']}
        ]

        items.forEach((item) => {
            const c = this.componentById(item.id)
            const d = this.getNestedValue(this.model.districtObject, item.path)
            c.setProperties({'value': this.formatNumberWithDot(d)})
        })
    }

    onDataChanged(data) {
        this.model.setDataObject(data)
        this.model.setDistrictObject(this.model.districtId)

        const d = {'data': this.model.data, 'districtId': this.model.districtId}
        this.setProperties('districtSelect', d)
        const c = this.componentById('districtSelect')
        c.bindDistrictChanged(this.onDistrictChanged)

        this.renderAgeSection()
    }

    onDistrictChanged(id) {
        this.model.setDistrictId(id + 1)
        this.model.setDistrictObject(id + 1)

        this.renderAgeSection()
    }
}