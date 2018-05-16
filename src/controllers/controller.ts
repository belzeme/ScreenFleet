import mongoose = require('mongoose');

import { Router } from 'express';
import { BaseRoute } from '../routes/route';

mongoose.Promise = global.Promise;

export class BaseController {
    protected version: string;
    protected dbConnection: mongoose.Connection | null;
    protected route: BaseRoute;

    constructor(version: string, dbConnection: mongoose.Connection | null, route: BaseRoute) {
        this.version = version;
        this.dbConnection = dbConnection;
        this.route = route;
    }

    public get Router(): Router {
        return this.route.Router;
    }

    public get Route(): BaseRoute {
        return this.route;
    }
}
