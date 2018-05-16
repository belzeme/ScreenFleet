import { Request, Response } from 'express';
import { logger } from '../logger';
import { ITVModel } from '../models/tv';
import { ViewTVRoute } from '../routes/view-tv';
import { tvSchema } from '../schemas/tv';
import { BaseController } from './controller';

import mongoose = require('mongoose');
mongoose.Promise = global.Promise;


export class ViewTVCtrl extends BaseController {
    private dao: mongoose.Model<ITVModel>;

    public constructor(dbConnection: mongoose.Connection) {
        super('1.0.0', dbConnection, new ViewTVRoute());

        if (!this.dbConnection) {
            throw new Error('ViewTVCtrl::constructor::DB connection is missing');
        }
        this.dao = this.dbConnection.model<ITVModel>('TV', tvSchema);

        this.route.on('onGETRequest', (req, res) => this.getIndex(req, res));
        this.route.on('onPOSTRequest', (req, res) => this.getTV(req, res));
    }

    private findTV(id: string): Promise<ITVModel | null> {
        return new Promise((resolve, reject) => {
            this.dao.findOne()
                .where('_id')
                .equals(`${id}`)
                .then(res => resolve(res))
                .catch(reason => reject(reason));
        });
    }

    private getIndex(request: Request, response: Response) {
        const route = this.route as ViewTVRoute;
        response.send(route.formatIndexResponse());
    }

    private getTV(request: Request, response: Response) {
        const body = request.body;

        logger.debug(`route::view/tv::received <- ${JSON.stringify(body)}`);
        if (!body.id) {
            response.send({ "id": "string" });
            return;
        }

        this.findTV(body.id).then(res => {
            if (res) {
                response.send(JSON.stringify(res));
                return;
            } else {
                response.status(400);
                response.send(`${body.id} is not a registered device`);
            }
        });
    }

}
