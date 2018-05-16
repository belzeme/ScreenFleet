import { NextFunction, Request, Response, Router } from 'express';
import { logger } from '../logger';
import { IAPIRoute } from '../models/screenfleet-models';
import { BaseRoute } from './route';

export class AdministratorRoute extends BaseRoute {
    public static create(router: Router) {
        logger.info('AdministratorRoute::create::creating adminstrator route.');
        const route = new AdministratorRoute();

        router.get('/', (req, res) => res.send(route.formatIndexResponse()));
    }

    public constructor() {
        super('administrator', '1.0.0');
        this.setMethods();
        this.setRoutes();
    }

    private setMethods() {
        this.methods.push({ group: 'a', name: 'GET' });
        this.methods.push({ group: 'a', name: 'POST' });
        this.methods.push({ group: 'a', name: 'PATCH' });
        this.methods.push({ group: 'a', name: 'DELETE' });
    }

    private setRoutes() {
        this.router.get('/', (req, res) => this.emit('onGETRequest', req, res));
        this.router.get('/list', (req, res) => this.emit('onListRequest', req, res));
        this.router.post('/', (req, res) => this.emit('onPOSTRequest', req, res));
        this.router.patch('/', (req, res) => this.emit('onPATCHRequest', req, res));
        this.router.delete('/', (req, res) => this.emit('onDELETERequest', req, res));
    }
}
