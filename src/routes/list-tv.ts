import { BaseRoute } from './route';

export class ListTVRoute extends BaseRoute {
    public constructor() {
        super('list/tvs', '1.0.0');
        this.setMethods();
        this.setRoutes();
    }

    private setMethods() {
        this.methods.push({ group: 'au', name: 'GET' });
    }

    private setRoutes() {
        this.router.get('/', (req, res) => this.emit('onGETRequest', req, res));
    }
}
