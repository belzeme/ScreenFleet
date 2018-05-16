
import { Request, Response } from 'express';
import { ListRoute } from '../routes/list';
import { BaseController } from './controller';

export class ListCtrl extends BaseController {
    public constructor() {
        super('1.0.0', null, new ListRoute());
        this.route.on('onGETRequest', (req, res) => this.getIndex(req, res));
    }

    public getIndex(req: Request, res: Response) {
        const route = this.route as ListRoute;
        res.send(route.formatIndexResponse());
    }
}
