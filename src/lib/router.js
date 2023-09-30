export default class Router {
    constructor(routes, controllers) {
        this.routes = routes
        this.controllers = controllers
    }

    start() {
        // Listen for the popstate event and route accordingly.
        window.addEventListener('popstate', this.route.bind(this))

        // Route on initial page load.
        this.route()
    }

    route() {
        // Get the current URL path.
        const path = window.location.pathname

        // Get the controller function name based on the route.
        const ctrl = this.routes.find((item) => item.path === path)
        const controllerName = ctrl.controller

        // Execute the controller function.
        this.loadController(controllerName)
    }

    loadController(controllerName) {
        const controller = this.controllers[controllerName]

        if (typeof controller === 'function') {
            controller()
        }
        else {
            console.error('Controller is not a function:', controller)
        }
    }

    changePath(route) {
        // Change the URL path and trigger the route change.
        window.history.pushState({}, route.controller, route.path)
    }
}
