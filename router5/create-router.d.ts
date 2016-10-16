// import RouteNode  from 'route-node';

// const defaultOptions = {
//     trailingSlash: 0,
//     useTrailingSlash: undefined,
//     autoCleanUp: true,
//     strictQueryParams: true,
//     allowNotFound: false,
//     strongMatching: true
// };

export interface Router {
    /**
     * Build a state object
     * @param  {String} name         The state name
     * @param  {Object} params       The state params
     * @param  {String} path         The state path
     * @param  {Object} [metaParams] Description of the state params
     * @param  {String} [source]     The source of the routing state
     * @return {Object}              The state object
     */
    makeState(name, params, path, metaParams, source);

    /**
     * Build a not found state for a given path
     * @param  {String} path The unmatched path
     * @return {Object}      The not found state object
     */
    makeNotFoundState(path);

    /**
     * Get the current router state
     * @return {Object} The current state
     */
    getState();

    /**
     * Set the current router state
     * @param {Object} state The state object
     */
    setState(state);

    /**
     * Get router options
     * @return {Object} The router options
     */
    getOptions();

    /**
     * Set an option
     * @param  {String} option The option name
     * @param  {*}      value  The option value
     * @return {Object}       The router instance
     */
    setOption(option, value);

    /**
     * Set a router dependency
     * @param  {String} dependencyName The dependency name
     * @param  {*}      dependency     The dependency
     * @return {Object}                The router instance
     */
    setDependency(dependencyName, dependency);

    /**
     * Add dependencies
     * @param { Object} deps A object of dependencies (key-value pairs)
     * @return {Object}      The router instance
     */
    setDependencies(deps);

    /**
     * Get dependencies
     * @return {Object} The dependencies
     */
    getDependencies();

    /**
     * Add routes
     * @param  {Array} routes A list of routes to add
     * @return {Object}       The router instance
     */
    add(routes);

    /**
     * Add a single route (node)
     * @param {String} name                   The route name (full name)
     * @param {String} path                   The route path (from parent)
     * @param {Function} [canActivateHandler] The canActivate handler for this node
     */
    addNode(name, path, canActivateHandler);

    /**
     * Use plugins
     * @param  {...Function} plugins An argument list of plugins
     * @return {Object}              The router instance
     */
    usePlugin(...plugins);
    
    /**
     * Check if a plugin has already been registered.
     * @param  {String}  pluginName The plugin name
     * @return {Boolean}            Whether the plugin has been registered
     */
    hasPlugin(pluginName);

    /**
     * Register middleware functions.
     * @param  {...Function} middlewares The middleware functions
     * @return {Object}                  The router instance
     */
    useMiddleware(...middlewares);

    /**
     * Remove all middleware functions
     * @return {Object} The router instance
     */
    clearMiddleware();
    
    /**
     * Clone the current router configuration. The new returned router will be non-started,
     * with a null state
     * @param  {[type]} deps [description]
     * @return {[type]}      [description]
     */
    clone(deps?);


    /**
     * Cancel the current transition if there is one
     * @return {Object} The router instance
     */
    cancel();

    /**
     * Navigate to a route
     * @param  {String}   routeName      The route name
     * @param  {Object}   [routeParams]  The route params
     * @param  {Object}   [options]      The navigation options (`replace`, `reload`)
     * @param  {Function} [done]         A done node style callback (err, state)
     * @return {Function}                A cancel function
     */
    navigate(...args);


    /**
     * Navigate to the default route (if defined)
     * @param  {Object}   [opts] The navigation options
     * @param  {Function} [done] A done node style callback (err, state)
     * @return {Function}        A cancel function
     */
    navigateToDefault(...args);

    /**
     * Register a canDeactivate handler or specify a if a route can be deactivated
     * @param  {String} name                           The route name
     * @param  {Function|Boolean} canDeactivateHandler The canDeactivate handler or boolean
     * @return {Object}                                The router instance
     */
    canDeactivate(name, canDeactivateHandler);

    /**
     * Remove a canDeactivate handler for a route
     * @param  {String} name The route name
     * @return {Object}      The router instance
     */
    clearCanDeactivate(name);

    /**
     * Register a canActivate handler or specify a if a route can be deactivated
     * @param  {String} name                         The route name
     * @param  {Function|Boolean} canActivateHandler The canActivate handler or boolean
     * @return {Object}                              The router instance
     */
    canActivate(name, canActivateHandler);

    /**
     * Check if the router is started
     * @return {Boolean} Whether the router is started or not
     */
    isStarted();


    /**
     * Start the router
     * @param  {String|Object} startPathOrState The start path or state. This is optional when using the browser plugin.
     * @param  {Function}      done             A done node style callback (err, state)
     * @return {Object}                         The router instance
     */
    start(...args);


    /**
     * Stop the router
     * @return {Object} The router instance
     */
    stop();


    /**
     * Check if a route is currently active
     * @param  {String}  name                     The route name
     * @param  {Object}  params                   The route params
     * @param  {Boolean} [strictEquality=false]   Whether to check if the given route is the active route, or part of the active route
     * @param  {Boolean} [ignoreQueryParams=true] Whether to ignore query parameters
     * @return {Boolean}                          Whether the given route is active
     */
    isActive(name, params?, strictEquality?, ignoreQueryParams?);

    /**
     * Compare two route state objects
     * @param  {Object}  state1            The route state
     * @param  {Object}  state2            The other route state
     * @param  {Boolean} ignoreQueryParams Whether to ignore query parameters or not
     * @return {Boolean}                   Whether the two route state are equal or not
     */
    areStatesEqual(state1, state2, ignoreQueryParams?);

    /**
     * Check if two states are related
     * @param  {State} parentState  The parent state
     * @param  {State} childState   The child state
     * @return {Boolean}            Whether the two states are descendants or not
     */
    areStatesDescendants(parentState, childState);

    /**
     * Build a path
     * @param  {String} route  The route name
     * @param  {Object} params The route params
     * @return {String}        The path
     */
    buildPath(route, params);


    /**
     * Match a path
     * @param  {String} path     The path to match
     * @param  {String} [source] The source (optional, used internally)
     * @return {Object}          The matched state (null if unmatched)
     */
    matchPath(path, source);


    /**
     * Set the root node patch, use carefully. It can be used to set app-wide allowed query parameters.
     * @param {String} rootPath The root node path
     */
    setRootPath(rootPath);
}

/**
 * Create a router
 * @param  {Array}  [routes]          The routes
 * @param  {Object} [options={}]      The router options
 * @param  {Object} [dependencies={}] The router dependencies
 * @return {Object}                   The router instance
 */
declare function createRouter(routes, opts?, deps?): Router;

export default createRouter;
