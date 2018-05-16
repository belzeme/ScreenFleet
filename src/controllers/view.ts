import { Request, Response } from 'express';
import { ViewRoute } from '../routes/view';
import { BaseController } from './controller';

export class ViewCtrl extends BaseController {
    public constructor() {
        super('1.0.0', null, new ViewRoute());
        this.route.on('onGETRequest', (req, res) => this.getIndex(req, res));
    }

    public getIndex(req: Request, res: Response) {
        const route = this.route as ViewRoute;
        res.send(route.formatIndexResponse());
    }
}
