import { Request, Response } from 'express';
import { logger } from '../logger';
import { ITVModel } from '../models/tv';
import { ViewTVRoute } from '../routes/view-tv';
import { tvSchema } from '../schemas/tv';
import { BaseController } from './controller';

import mongoose = require('mongoose');
import { ITV } from '../interfaces';
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
        this.route.on('onNewTVRequest', (req, res) => this.newTV(req, res));
        this.route.on('onPUTRequest', (req, res) => this.putTV(req, res));
        this.route.on('onPATCHRequest', (req, res) => this.patchTV(req, res));
        this.route.on('onDELETERequest', (req, res) => this.deleteTV(req, res));
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

    private findTVByName(name: string): Promise<ITVModel | null> {
        return new Promise((resolve, reject) => {
            this.dao.findOne()
                .where('name')
                .equals(`${name}`)
                .then(res => resolve(res))
                .catch(reason => reject(reason));
        });
    }

    private validateTVData(data: any): boolean {
        return (data.name && data.ip && data.assets);
    }

    private newTV(request: Request, response: Response) {
        const body = request.body;

        logger.debug(`route::view/tv/new::received <- ${JSON.stringify(body)}`);
        // Check if the received data is valid
        if (!this.validateTVData(body)) {
            const res = {
                'hint': `A valid TV object is { 'name':'string', 'ip':'string', 'html'?: 'string', 'assets':'string[]'}`,
                'message': `${JSON.stringify(body)} is not a valid TV object.`
            };
            response.status(400);
            response.send(res);
            return;
        }
        // Check if a tv already exists
        this.findTVByName(body.name).then(res => {
            if (!res) {
                // The TV does not exist we can create it
                const tvData = body as ITV;
                new this.dao(tvData).save()
                    .then(value => {
                        response.send(JSON.stringify(value));
                    })
                    .catch(reason => {
                        response.status(500);
                        response.send(reason);
                    });
            } else {
                // The tv exists we return a error
                const resText = { 'message': `A tv name ${body.name} already exists.` };
                response.status(400);
                response.send(resText);
            }
        })
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

    private putTV(request: Request, response: Response) {
        const body = request.body;

        logger.debug(`route::view/tv::received <- ${JSON.stringify(body)}`);
        // We check if the tv id is given and the data are valid.
        if (!this.validateTVData(body) || !body.id) {
            const res = {
                hint: `A valid PutTV object is { 'name':'string', 'ip':'string', 'html'?: 'string', 'assets':'string[]', 'id':'ObjectID'}`,
                message: 'The given data are not valid',
            }
            response.status(400);
            response.send(res);
        }
        // We find the object by id and update it.
        this.dao.findByIdAndUpdate(body.id, {
            assets: body.assets,
            html: body.html,
            ip: body.ip,
            name: body.name
        })
            .then(res => {
                if (res) {
                    response.send(res);
                } else {
                    response.status(500);
                    response.send(JSON.stringify({ message: 'Object not found' }));
                }
            })
            .catch(reason => {
                response.status(400);
                response.send(reason);
            });
    };

    private patchTV(request: Request, response: Response) {
        const body = request.body;

        logger.debug(`route::view/ts::received <- ${JSON.stringify(body)}`);
        // We check if the tv id is given and the data are valid
        if (!body.id) {
            const res = {
                hint: `A valid PutTV object is { 'key':'string', 'string':'any', 'id':'ObjectID'}`,
                message: 'The given data are not valid',
            }
            response.status(400);
            response.send(res);
        }
        // We find the object by id and update it
        this.dao.findByIdAndUpdate(body.id, body)
            .then(res => {
                if (res) {
                    response.send(res);
                } else {
                    response.status(500);
                    response.send(JSON.stringify({ message: 'Object not found' }));
                }
            })
            .catch(reason => {
                response.status(400);
                response.send(reason);
            });
    }

    private deleteTV(request: Request, response: Response) {
        const body = request.body;

        logger.debug(JSON.stringify(body));
        if (!body.id) {
            const res = {
                hint: `A valid DeleteTV object is { ''id':'ObjectID'}`,
                message: 'The given ObjectID is not valid'
            }
            response.status(400);
            response.send(res);
        }
        // We find and delete the object by id
        this.dao.findByIdAndRemove(body.id)
            .then(res => {
                if (res) {
                    response.send(res);
                } else {
                    response.status(400);
                    response.send(JSON.stringify({ message: `${body.id} object not found` }));
                }
            })
            .catch(reason => {
                response.send(500);
                response.send(reason);
            });
    }
}
