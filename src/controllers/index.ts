import { Request, Response } from 'express';
import { IndexRoute } from "../routes/index";
import { BaseController } from './controller';

import mongoose = require('mongoose');


mongoose.Promise = global.Promise;

export class IndexCtrl extends BaseController {
    public constructor() {
        super('1.0.0', null, new IndexRoute());
        this.route.on('onGETRequest', (req, res) => this.getIndex(req, res));
    }

    public getIndex(req: Request, res: Response) {
        const route = this.route as IndexRoute;
        res.send(route.formatIndexResponse());
    }
}
