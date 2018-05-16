import { Router } from 'express';
import { logger } from '../logger';
import { AdministratorRoute } from './administrator';
import { BaseRoute } from './route';

export class IndexRoute extends BaseRoute {
    public constructor() {
        super('api', '1.0.0');
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
        const adminRoute = new AdministratorRoute();

        this.routes.push(adminRoute.getAPIRoute());

        this.routes.push({
            methods: [{ group: 'au', name: 'GET' }],
            name: 'list',
            version: this.version
        });
        this.routes.push({
            methods: [{ group: 'au', name: 'GET' }],
            name: 'view',
            version: this.version
        });
        this.routes.push({
            methods: [{ group: 'au', name: 'GET' }],
            name: 'authentication',
            version: this.version
        })
    }

    private setRoute() {
        this.router.get('/', (req, res) => this.emit('onGETRequest', req, res));
    }
}
