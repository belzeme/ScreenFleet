import { BaseRoute } from './route';

export class TVRoute extends BaseRoute {
    public constructor() {
        super('tv', '1.0.0');
        this.setMethods();
        this.setRoutes();
    }

    private setMethods() {
        this.methods.push();
    }

    private setRoutes() { };
}
