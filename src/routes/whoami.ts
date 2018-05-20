
import { BaseRoute } from './route';


/**
 * @namespace ScreenFleet
 */

/**
 * @namespace ScreenFleet.routes
 */


export class WhoAmIRoute extends BaseRoute {
    /**
     * WhoAmIRoute
     * @class ScreenFleet.routes.WhoAmIRoute
     * @classdesc The /whoami route
     */
    public constructor() {
        super('whoami', '1.0.0');
        this.setMethods();
        this.setRoutes();
    }

    /**
     * Set the route methods
     * @private
     * @method ScreenFleet.routes.WhoAmIRoute#setMethods
     */
    private setMethods() {
        this.methods.push({ group: 'u', name: 'GET' });
    }

    /**
     * Set the route links
     * @private
     * @method ScreenFleet.routes.WhoAmIRoute#setRoutes
     */
    private setRoutes() {
        this.router.get('/', (req, res) => this.emit('onGETRequest', req, res));
        this.router.post('/', (req, res) => this.emit('onPOSTRequest', req, res));
    }
}
