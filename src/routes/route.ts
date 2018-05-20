import { EventEmitter } from 'events';
import { Router } from 'express';
import { IAPIRoute, IIndexReponse, IRouteMethod } from '../models/screenfleet-models';

/**
 * @namespace ScreenFleet
 */

/**
 * @namespace ScreenFleet.routes
 */

export class BaseRoute extends EventEmitter {
    /**
     * The route name
     * @member {string} ScreenFleet.routes.BaseRoute#name
     */
    protected name: string;
    /**
     * The route version
     * @member {string} ScreenFleet.routes.BaseRoute#version
     */
    protected version: string;
    /**
     * The route methods
     * @member {Array<ScreenFleet.models.IRouteMethod>} ScreenFleet.routes.BaseRoute#methods
     */
    protected methods: IRouteMethod[];
    /**
     * The routes link
     * @member {Array<ScreenFleet.models.IAPIRoute>} ScreenFleet.routes.BaseRoute#routes
     */
    protected routes: IAPIRoute[];

    /**
     * The route router instance
     * @member {express.Router} ScreenFleet.routes.BaseRoute#router
     */
    protected router: Router;

    /**
     * BaseRoute
     * @class ScreenFleet.routes.BaseRoute
     * @classdesc The BaseRoute parent of all routes
     * @param {string} ScreenFleet.routes.BaseRoute#name
     * @param {string} ScreenFleet.routes.BaseRoute#version
     */
    constructor(name: string, version: string) {
        super();
        this.name = name;
        this.version = version;
        this.methods = [];
        this.routes = [];
        this.router = Router();
    }

    /**
     * Name getter
     * @method ScreenFleet.routes.BaseRoute#Name
     * @returns {string} The route name.
     */
    public get Name(): string {
        return this.name;
    }

    /**
     * Router getter
     * @method ScreenFleet.routes.BaseRoute#Router
     * @returns {express.Router} The route router.
     */
    public get Router(): Router {
        return this.router;
    }

    /**
     * APIRoute getter
     * @method ScreenFleet.routes.BaseRoute#getAPIRoute
     * @returns {ScreenFleet.models.IAPIRoute} The route APIRoute description.
     */
    public getAPIRoute(): IAPIRoute {
        return {
            methods: this.methods,
            name: this.name,
            version: this.version
        }
    }

    /**
     * Format the route data to fit the IIndexResponse interface
     * @method ScreenFleet.routes.BaseRoute#formatIndexResponse
     * @returns {ScreenFleet.routes.IIndexResponse} A IIndexResponse instance containing the route data.
     */
    public formatIndexResponse(): IIndexReponse {
        return {
            methods: this.methods,
            name: this.name,
            routes: this.routes,
            version: this.version
        }
    }
}
