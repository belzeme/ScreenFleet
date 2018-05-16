import { Request, Response } from 'express';
import { ITVModel } from '../models/tv';
import { WhoAmIRoute } from '../routes/whoami';
import { tvSchema } from '../schemas/tv';
import { BaseController } from './controller';

import mongoose = require('mongoose');
mongoose.Promise = global.Promise;

import { logger } from '../logger';

export class WhoAmICtrl extends BaseController {
    private dao: mongoose.Model<ITVModel>;

    public constructor(dbConnection: mongoose.Connection) {
        super('1.0.0', dbConnection, new WhoAmIRoute());
        if (!this.dbConnection) {
            throw new Error('WhoAmIController::constructor::DB connection is missing');
        }

        this.dao = this.dbConnection.model<ITVModel>('TV', tvSchema);
        this.route.on('onGETRequest', (req, res) => this.getIndex(req, res));
        this.route.on('onPOSTRequest', (req, res) => this.getIDbyTVIP(req, res));
    }

    private findTVByIP(ip: string): Promise<ITVModel | null> {
        return new Promise((resolve, reject) => {
            this.dao.findOne()
                .where('ip')
                .equals(`${ip}`)
                .then(res => resolve(res))
                .catch(reason => reject(reason));
        });
    }

    private getIndex(request: Request, response: Response) {
        const route = this.route as WhoAmIRoute;
        response.send(route.formatIndexResponse());
    }

    private getIDbyTVIP(request: Request, response: Response) {
        const body = request.body;

        logger.debug(`route::whoami::received::${JSON.stringify(body)}`);
        if (!body.ip) {
            response.send({ "ip": "string" });
            return;
        }

        this.findTVByIP(body.ip)
            .then(tv => {
                if (tv) {
                    response.send({ id: tv._id });
                } else {
                    response.status(400);
                    response.send(`${body.ip} is not a registered device`);
                }
            })
            .catch(reason => response.send(reason));
    }
}
