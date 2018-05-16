
import { BaseRoute } from './route';

export class WhoAmIRoute extends BaseRoute {
    public constructor() {
        super('whoami', '1.0.0');
        this.setMethods();
        this.setRoutes();
    }

    private setMethods() {
        this.methods.push({ group: 'u', name: 'GET' });
    }

    private setRoutes() {
        this.router.get('/', (req, res) => this.emit('onGETRequest', req, res));
        this.router.post('/', (req, res) => this.emit('onPOSTRequest', req, res));
    }
}
