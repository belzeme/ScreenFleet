import { BaseRoute } from './route';
/**
 * @namespace ScreenFleet
 */

/**
 * @namespace ScreenFleet.routes
 */

export class ListTVRoute extends BaseRoute {
    /**
     * ListTVRoute
     * @extends ScreenFleet.routes.BaseRoute
     * @class ScreenFleet.routes.ListTvRoute#
     * @classdesc The /list/tvs route
     */
    public constructor() {
        super('list/tvs', '1.0.0');
        this.setMethods();
        this.setRoutes();
    }

    /**
     * setMethods
     * @method ScreenFleet.routes.ListTvRoute#setMethods
     * @private
     */
    private setMethods() {
        this.methods.push({ group: 'au', name: 'GET' });
    }

    /**
     * setRoutes
     * @method ScreenFleet.routes.ListTvRoute#setRoutes
     * @private
     */
    private setRoutes() {
        this.router.get('/', (req, res) => this.emit('onGETRequest', req, res));
    }
}
