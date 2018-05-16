import { EventEmitter } from 'events';
import { Router } from 'express';
import { IAPIRoute, IIndexReponse, IRouteMethod } from '../models/screenfleet-models';

export class BaseRoute extends EventEmitter {
    protected name: string;
    protected version: string;
    protected methods: IRouteMethod[];
    protected routes: IAPIRoute[];
    protected router: Router;

    constructor(name: string, version: string) {
        super();
        this.name = name;
        this.version = version;
        this.methods = [];
        this.routes = [];
        this.router = Router();
    }

    public get Name(): string {
        return this.name;
    }

    public get Router(): Router {
        return this.router;
    }

    public getAPIRoute(): IAPIRoute {
        return {
            methods: this.methods,
            name: this.name,
            version: this.version
        }
    }

    public formatIndexResponse(): IIndexReponse {
        return {
            methods: this.methods,
            name: this.name,
            routes: this.routes,
            version: this.version
        }
    }
}
