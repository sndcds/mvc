export default class Model {

    constructor() {
    }


    // Helper

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
