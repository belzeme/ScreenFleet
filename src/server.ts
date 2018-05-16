import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as fs from 'fs';
import * as morgan from 'morgan';
import * as path from 'path';
import { IndexCtrl } from './controllers';
import { AdministratorCtrl } from './controllers/administrator';
import { WhoAmICtrl } from './controllers/whoami';
// Loggers
import { logger } from './logger';
import { IModel } from './models/model';

import errorHandler = require('errorhandler');
import methodOverride = require('method-override');
import mongoose = require('mongoose');

const CONF_NAME = {
    server: 'server-config.json'
}


export interface IConfiguration {
    port: number;
    version: string;
    mongodbConnection: string;
}

export class Server {
    private app: express.Application;
    private configuration: IConfiguration | null;
    private model: IModel;
    private dbConnection: mongoose.Connection | null;

    constructor() {
        this.app = express();
        this.configuration = null;
        this.model = { administrator: null, tv: null };
        this.dbConnection = null;

        this.setMiddlewares();
    }

    public readConfigurationFile(fileName: string): Promise<Server> {
        const confPath = path.resolve(__dirname, 'config', fileName);
        return new Promise((resolve, reject) => {
            fs.readFile(confPath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    this.configuration = JSON.parse(data);
                    resolve(this);
                }
            });
        });
    }

    public listen() {
        const conf = this.configuration;

        if (conf) {
            this.app.listen(conf.port, () => logger.info(`Listening on ${conf.port}`));
        } else {
            throw new Error("App::listen::Configuration missing")
        }
    }

    public bootstrap() {
        if (!this.configuration) {
            throw new Error('Server::bootstrap::configuration is not loaded');
        }

        // Connect to mongoose
        this.dbConnection = mongoose.createConnection(this.configuration.mongodbConnection);
        logger.info(`Connection on database at ${this.configuration.mongodbConnection}`);
        // this.model.administrator = this.dbConnection.model<IAdministratorModel>('Administrator', administratorSchema);
        // this.model.tv = this.dbConnection.model<ITVModel>('TV', tvSchema);
        this.setControllers();
        this.listen();
    }

    private setMiddlewares() {
        // Logger
        this.app.use(morgan('dev', {
            skip: (req, res) => res.statusCode < 400,
            stream: process.stderr
        }));
        this.app.use(morgan('dev', {
            skip: (req, res) => res.statusCode >= 400,
            stream: process.stdout
        }));

        // BodyParsers
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        mongoose.Promise = global.Promise;

        // Error mgmt
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            err.status = 404;
            next(err);
        });
        this.app.use(errorHandler());
    }

    private setControllers() {
        if (!this.dbConnection) {
            throw new Error('server::ServerControllers::DBConnection is inexistant');
        }
        const indexCtrl = new IndexCtrl();
        const administratorCtrl = new AdministratorCtrl(this.dbConnection);
        const whoAmICtrl = new WhoAmICtrl(this.dbConnection);

        this.app.use(express.static(path.join(__dirname, 'public')));
        logger.info('server::ServerControllers::public route setted');
        this.app.use(indexCtrl.Router);
        logger.info('server::ServerControllers::index route setted');
        this.app.use(`/${administratorCtrl.Route.Name}`, administratorCtrl.Router);
        logger.info('server::ServerControllers::administrator route setted');
        this.app.use(`/${whoAmICtrl.Route.Name}`, whoAmICtrl.Router);
        logger.info('server::ServerControllers::whoAmI route setted');
    }

}

// Part of the script that launches the application.
const server = new Server();
server.readConfigurationFile(CONF_NAME.server)
    .then(() => {
        try {
            server.bootstrap();
            logger.info('Server is up and running');
        } catch (err) {
            logger.error(err);
        }
    })
    .catch(reason => logger.error(reason));
