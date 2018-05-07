import * as express from 'express';

export interface IStubRouteItem {
    name: string,
    router: express.Router;
}

export class StubRouter {
    private routers: IStubRouteItem[];

    constructor() {
        this.routers = [];

        let apiRoute = express.Router();
        apiRoute.get('/', (req, res) => res.json('Hello from GET api'));

        apiRoute.post('/authentication', (req, res) => res.json('Hello from POST authentication'));

        apiRoute.get('/administrator', (req, res) => res.json('Hello from GET administrator'));
        apiRoute.post('/administrator', (req, res) => res.json('Hello from POST administrator'));
        apiRoute.put('/administrator', (req, res) => res.json('Hello from PUT administrator'));
        apiRoute.patch('/administrator', (req, res) => res.json('Hello from PATCH administrator'));
        apiRoute.delete('/administrator', (req, res) => res.json('Hello from DELETE administrator'));

        apiRoute.get('/whoami', (req, res) => res.json('Hello from GET whoami'));

        apiRoute.get('/view', (req, res) => res.json('Hello from GET view'));

        apiRoute.get('/list', (req, res) => res.json('Hello from GET list'));

        apiRoute.get('/assets', (req, res) => res.json('Hello from GET assets'));

        apiRoute.get('/tvs', (req, res) => res.json('Hello from GET tvs'));

        apiRoute.get('/list/assets', (req, res) => res.json('Hello from GET list/assets'));

        apiRoute.get('/list/tvs', (req, res) => res.json('Hello from GET list/tvs'));

        apiRoute.get('/view/tv', (req, res) => res.json('Hello from GET view/tv'));

        apiRoute.get('/view/asset', (req, res) => res.json('Hello from GET view/asset'));

        this.routers.push({ name: '/api', router: apiRoute });
    }

    public get Routers(): IStubRouteItem[] {
        return this.routers;
    }


}
