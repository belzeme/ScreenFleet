import { BaseRoute } from './route';

export class ViewRoute extends BaseRoute {
    public constructor() {
        super('view', '1.0.0');
        this.setMethods();
        this.setLinks();
        this.setRoutes();
    }

    private setMethods() {
        this.methods.push({ group: 'au', name: 'GET' });
    }

    private setLinks() {
        return;
    }

    private setRoutes() {
        this.router.get('/', (req, res) => this.emit('onGETRequest', req, res));
    }
}
