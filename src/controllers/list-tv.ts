import { Request, Response } from 'express';
import { ITVModel } from '../models/tv';
import { ListTVRoute } from '../routes/list-tv';
import { tvSchema } from '../schemas/tv';
import { BaseController } from './controller';

import mongoose = require('mongoose');
mongoose.Promise = global.Promise;

export class ListTVCtrl extends BaseController {
    private dao: mongoose.Model<ITVModel>;

    public constructor(dbConnection: mongoose.Connection) {
        super('1.0.0', dbConnection, new ListTVRoute());

        if (!this.dbConnection) {
            throw new Error('ListTVCtrl::constructor::DB Connection is missing');
        }
        this.dao = this.dbConnection.model<ITVModel>('TV', tvSchema);

        this.route.on('onGETRequest', (req, res) => this.getTvs(req, res));
    }

    private getTvs(requset: Request, response: Response) {
        this.dao.find().then(res => response.send(res)).catch(reason => response.send(reason));
    }
}
