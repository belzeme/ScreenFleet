import { AdministratorRoute } from './administrator';
import { ListRoute } from './list';
import { BaseRoute } from './route';
import { ViewRoute } from './view';
import { WhoAmIRoute } from './whoami';

export class IndexRoute extends BaseRoute {
    public constructor() {
        super('', '1.0.0');
        this.setMethods();
        this.setLinks();
        this.setRoute();
    }

    private setMethods() {
        this.methods.push({
            group: 'au',
            name: 'GET'
        })
    }

    private setLinks() {
        this.routes.push(new AdministratorRoute().getAPIRoute());
        this.routes.push(new WhoAmIRoute().getAPIRoute());
        this.routes.push(new ListRoute().getAPIRoute());
        this.routes.push(new ViewRoute().getAPIRoute());
    }

    private setRoute() {
        this.router.get('/', (req, res) => this.emit('onGETRequest', req, res));
    }
}
