import Component from './component.js'


export default class View extends Component {
  constructor() {
    super()
    this.parent = null
    this.root = this.getElement('#root')
    this.message = this.createElement('small')
    this.districtName = this.getElement('#districtName')
    this.districtList = this.createElement('ul')
    this.selectElement = this.getElement('#districtSelect')

    // this.root.append(this.message)
  }


  create() {
//      this.root.innerHTML = '<h1 style="color:yellow;">Hello</h1>'
      this.createChilds()
  }


  update(data) {
      console.log("update: " + this.id)
      this.updateChilds()
  }


  createDomElement(tag, className) {
      const element = this.createElement(tag)
      if (className)
        element.classList.add(className)
      return element
  }



  // Create an element with an optional CSS class
  createElement(tag, className) {
    const element = document.createElement(tag)
    if (className) element.classList.add(className)

    return element
  }

  // Remove an element from the DOM
  removeElement(element) {
    element.parentNode.removeChild(element)
  }

  // Retrieve an element from the DOM
  getElement(selector) {
    const element = document.querySelector(selector)

    return element
  }

  formatNumberWithDot(x) {
    if (typeof x === 'undefined') return
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  hasAttribute(obj, attributeName) {
    return typeof obj === 'object' && obj !== null && attributeName in obj
  }


  renderDataLoading(data) {
    // Show default message
    if (data.length === 0) {
      this.message.textContent = 'Nothing to show load the data dude!'
    } else {
      // this.removeElement(this.message)
    }
  }

  renderDistrictSelect(items, districtId) {
    items.forEach(item => {
      const optionElement = this.createElement('option')
      optionElement.value = item.district_id
      optionElement.textContent = item.district_name

      if (optionElement.value == districtId) {
        optionElement.selected = true
      }

      this.selectElement.appendChild(optionElement)
    })
  }

  renderDistrictMeta(districtObject) {
    if (this.hasAttribute(districtObject, 'district_name')) {
      this.districtName.textContent = districtObject.district_name
    }
  }

  renderAgeSection(districtObject) {
    const items = [
      {'selector': '#residents', 'coloumn': ['district_detail', '2021', 'residents']},
      {'selector': '#ageToUnder18', 'coloumn': ['district_detail', '2021', 'age_groups', 'age_to_under_18']},
      {'selector': '#age18ToUnder30', 'coloumn': ['district_detail', '2021', 'age_groups', 'age_18_to_under_30']},
      {'selector': '#age30ToUnder45', 'coloumn': ['district_detail', '2021', 'age_groups', 'age_30_to_under_45']},
      {'selector': '#age45ToUnder65', 'coloumn': ['district_detail', '2021', 'age_groups', 'age_45_to_under_65']},
      {'selector': '#age65ToUnder80', 'coloumn': ['district_detail', '2021', 'age_groups', 'age_65_to_under_80']},
      {'selector': '#age80AndAbove', 'coloumn': ['district_detail', '2021', 'age_groups', 'age_80_and_above']},
      {'selector': '#age0ToUnder7', 'coloumn': ['district_detail', '2021', 'age_groups', 'age_0_to_under_7']},
      {'selector': '#age60AndAbove', 'coloumn': ['district_detail', '2021', 'age_groups', 'age_60_and_above']}
    ]

    items.forEach(item => {
      const element = this.getElement(item.selector)
      let dataObject = districtObject

      for (const key of item.coloumn) {

        if (this.hasAttribute(dataObject, key)) {
          dataObject = dataObject[key]
        } else {
          dataObject = undefined
          break
        }
      }

      element.textContent = this.formatNumberWithDot(dataObject)
    })
  }

  bindDistrictChanged(handler) {
    this.selectElement.addEventListener('change', event => {
      const selectedOption = this.selectElement.value

      handler(selectedOption - 1)
    })
  }
}
