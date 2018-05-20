import { AdministratorRoute } from './administrator';
import { ListRoute } from './list';
import { BaseRoute } from './route';
import { ViewRoute } from './view';
import { WhoAmIRoute } from './whoami';

/**
 * @namespace ScreenFleet
 */

/**
 * @namespace ScreenFleet.routes
 */


export class IndexRoute extends BaseRoute {
    /**
     * IndexRoute
     * @class ScreenFleet.routes
     * @classdesc The '/' route
     * @extends ScreenFleet.routes.BaseRoute
     */
    public constructor() {
        super('', '1.0.0');
        this.setMethods();
        this.setLinks();
        this.setRoute();
    }

    /**
     * Set the methods available from this route
     * @private
     * @method ScreenFleet.routes.IndexRoute#setMethods
     */
    private setMethods() {
        this.methods.push({
            group: 'au',
            name: 'GET'
        })
    }

    /**
     * Set the links available from this route.
     * @private
     * @method ScreenFleet.routes.IndexRoute#setLinks
     */
    private setLinks() {
        this.routes.push(new AdministratorRoute().getAPIRoute());
        this.routes.push(new WhoAmIRoute().getAPIRoute());
        this.routes.push(new ListRoute().getAPIRoute());
        this.routes.push(new ViewRoute().getAPIRoute());
    }

    /**
     * Set the routes events
     * @private
     * @method ScreenFleet.routes.IndexRoute#setRoute
     */
    private setRoute() {
        this.router.get('/', (req, res) => this.emit('onGETRequest', req, res));
    }
}
