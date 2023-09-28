export default class Model {
    /* eslint no-useless-constructor: 0 */
    constructor() {
    }

    getStorage(key) {
        return JSON.parse(localStorage.getItem(key))
    }

    setStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data))
    }

    clearStorage(key) {
        localStorage.removeItem(key)
    }
}