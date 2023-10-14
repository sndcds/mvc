export default class Router {
    constructor(app, routes) {
        this.app = app
        this.routes = routes

        app.router = this
    }

    /**
     * Start routing
     *
     * @param {string} routeName - Name of route to start with.
     */
    start(routeName) {
        // Listen for the popstate event and route accordingly.
        window.addEventListener('popstate', this.handlePopState.bind(this))

        // Route on initial page load.
        this.loadRouteByName(routeName)
    }

    /**
     * Handle pop state events.
     * Pop state events are fired from the browser, ie. when user goes back and forth in the browser hostory.
     */
    handlePopState() {
        this.loadRouteByName(event.state.name, false)
    }

    /**
     * Get a route by its name.
     *
     * @param {string} routeName - Name of route to find.
     * @return {object} The route or null.
     */
    getRouteByName(routeName) {
        return this.routes.find((route) => route.name === routeName)
    }

    /**
     * Load a route by its name.
     *
     * @param {string} routeName - Name of route to load.
     * @param {boolean} pushFlag - If true, new state will be pushed to window.history
     */
    loadRouteByName(routeName, pushFlag = true) {
        this.loadRoute(this.getRouteByName(routeName), pushFlag)
    }

    /**
     * Load a route.
     *
     * @param {object} route - The route to load.
     * @param {boolean} pushFlag - If true, new state will be pushed to window.history
     */
    loadRoute(route, pushFlag = true) {
        if (route !== null) {
            const container = document.querySelector(route.inject) // Todo, helper nutzen und root von außen!

            while (container.firstChild) {
                container.removeChild(container.firstChild)
            }

            if (typeof route.handler === 'function') {
                route.handler(this.app)

                if (pushFlag === true) {
                    const state = {
                        name: route.name,
                        title: route.title,
                        inject: route.inject,
                        path: route.path
                    }

                    window.history.pushState(state, route.title, route.path)
                }
            }
            else {
                console.error('Router loadRoute: route.handler is not a function:', route.handler)
            }
        }
    }
}