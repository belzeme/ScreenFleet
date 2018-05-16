import { Request, Response } from 'express';
import { IAdministrator } from '../interfaces';
import { IAdministratorModel } from '../models/administrator';
import { IAdministratorList, IAdministratorPostData } from '../models/screenfleet-models';
import { AdministratorRoute } from "../routes/administrator";
import { administratorSchema } from '../schemas/administrator';
import { BaseController } from './controller';

import mongoose = require('mongoose');

mongoose.Promise = global.Promise;

export class AdministratorCtrl extends BaseController {
    private dao: mongoose.Model<IAdministratorModel>;
    public constructor(dbConnection: mongoose.Connection) {
        super('1.0.0', dbConnection, new AdministratorRoute());
        if (!this.dbConnection) {
            throw new Error('AdministratorCtrl::constructor::DB connection is missing');
        }

        this.dao = this.dbConnection.model<IAdministratorModel>('Administrator', administratorSchema);
        this.route.on('onGETRequest', (req, res) => this.getIndex(req, res));
        this.route.on('onListRequest', (req, res) => this.listAdministrators(req, res));
        this.route.on('onPOSTRequest', (req, res) => this.postAdministrator(req, res));
    }

    public getIndex(req: Request, res: Response) {
        const route = this.route as AdministratorRoute;
        res.send(route.formatIndexResponse());
    }

    public listAdministrators(requset: Request, response: Response) {
        const adminList: IAdministratorList = [];
        this.dao
            .find()
            .then(res => {
                res.forEach(item => adminList.push({ name: item.name, id: item._id }))
                response.send(adminList);
            })
            .catch(reason => response.send(reason));
    }

    private findAdministratorByName(name: string): Promise<IAdministratorModel | null> {
        return new Promise((resolve, reject) => {
            this.dao.findOne()
                .where('name')
                .equals(`${name}`)
                .then(res => resolve(res))
                .catch(reason => reject(reason));
        });
    }

    private createAdministrator(data: IAdministratorPostData) {
        const administrator: IAdministrator = {
            hash: 'lol',
            name: 'o'// TODO: hash
        }
    }

    private postAdministrator(request: Request, response: Response) {
        const body = request.body;

        if (!body.name || !body.secret) {
            response.status(400);
            response.send({ "name": "string", "secret": "string" });
            return;
        }

        this.findAdministratorByName(body.name)
            .then(admin => {
                if (admin) {
                    response.status(400);
                    response.send(`${admin.name} already exists`);
                } else {
                    // TODO: create administrator
                }
            });
    }
}
