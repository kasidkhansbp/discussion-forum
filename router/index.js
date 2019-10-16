import express from 'express';
const apiRouter = express.Router();
const sessionRouter = express.Router();
const configureRoutes = (app) => {
    app.use('/session', sessionRouter);
    app.use('/api', apiRouter);    
}

const addRouteToSessionRouter = (route, method, ...handlers) => {
    sessionRouter.route(route)[method.toLowerCase()](...handlers);
}

/**
 * This will add authentication to all the api calls and redirect user to login if authentication fails
 * @param {*} route route to add to the api 
 * @param {*} method http method
 * @param  {...any} handlers handlers
 */
const addRouteToApiRouter = (route, method, ...handlers) => {
    apiRouter.route(route)[method.toLowerCase()](...handlers);
    // router.route().get()
}

export {
    addRouteToSessionRouter,
    addRouteToApiRouter
}

export default configureRoutes;