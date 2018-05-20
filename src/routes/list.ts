import { ListTVRoute } from './list-tv';
import { BaseRoute } from './route';


/**
 * @namespace ScreenFleet
 */

/**
 * @namespace ScreenFleet.routes
 */

export class ListRoute extends BaseRoute {
    /**
     * ListRoute
     * @class ScreenFleet.routes.ListRoute
     * @classdesc The /list route
     * @extends ScreenFleet.routes.BaseRoute
     */
    public constructor() {
        super('list', '1.0.0');
        this.setMethods();
        this.setRoutes();
        this.setLinks();
    }

    /**
     * SetMethods
     * @method ScreenFleet.routes.ListRoute#setMethods
     * @private
     */
    private setMethods() {
        this.methods.push({ group: 'au', name: 'GET' });
    }

    /**
     * setRoutes
     * @method ScreenFleet.routes.ListRoute#setRoutes
     * @private
     */
    private setRoutes() {
        this.router.get('/', (req, res) => this.emit('onGETRequest', req, res));
    }

    /**
     * setLinks
     * @method ScreenFleet.routes.ListRoute#setLinks
     * @private
     */
    private setLinks() {
        const listTVRoute = new ListTVRoute();
        this.routes.push(listTVRoute.getAPIRoute());
    }
}
