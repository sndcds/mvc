import Component from './component.js'


export default class DistrictSelectComponent extends Component {
    /* eslint no-useless-constructor: 0 */
    constructor(parent, id, setupData) {
        super(parent, id, setupData)
    }

    build() {
        this.e = this.domCreateElement('div')
        this.parent.e.appendChild(this.e)
    }

    setProperties(data) {
        const selectElement = this.domCreateElement('select')

        data.data.forEach((item) => {
            const optionElement = this.domCreateElement('option')

            optionElement.value = item.district_id
            optionElement.textContent = item.district_name

            if (optionElement.value === data.districtId) {
                optionElement.selected = true
            }

            selectElement.appendChild(optionElement)
        })

        this.e.appendChild(selectElement)
    }

    bindDistrictChanged(eventType, handler) {
        // TODO: Is this to be used?
        this.e.addEventListener(eventType, (event) => {
            const selectedOption = this.e.value
            handler(selectedOption - 1)
        })
    }
}