import { BaseRoute } from './route';

/**
 * @namespace ScreenFleet
 */

/**
 * @namespace ScreenFleet.routes
 */

export class ViewRoute extends BaseRoute {
    /**
     * View Route
     * @class ScreenFleet.routes.ViewRoute#
     * @classdesc The /view route.
     * @extends ScreenFleet.routes.BaseRoute
     */
    public constructor() {
        super('view', '1.0.0');
        this.setMethods();
        this.setLinks();
        this.setRoutes();
    }

    /**
     * setMethods
     * @method ScreenFleet.routes.ViewRoute#setMethods
     * @private
     */
    private setMethods() {
        this.methods.push({ group: 'au', name: 'GET' });
    }

    /**
     * setLinks
     * @method ScreenFleet.routes.ViewRoute#setLinks
     * @private
     */
    private setLinks() {
        return;
    }

    /**
     * setRoutes
     * @method ScreenFleet.routes.ViewRoute#setRoutes
     * @private
     */
    private setRoutes() {
        this.router.get('/', (req, res) => this.emit('onGETRequest', req, res));
    }
}
