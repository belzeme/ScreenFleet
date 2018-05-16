import { ListTVRoute } from './list-tv';
import { BaseRoute } from './route';

export class ListRoute extends BaseRoute {
    public constructor() {
        super('list', '1.0.0');
        this.setMethods();
        this.setRoutes();
        this.setLinks();
    }

    private setMethods() {
        this.methods.push({ group: 'au', name: 'GET' });
    }

    private setRoutes() {
        this.router.get('/', (req, res) => this.emit('onGETRequest', req, res));
    }

    private setLinks() {
        const listTVRoute = new ListTVRoute();

        this.routes.push(listTVRoute.getAPIRoute());
    }
}
