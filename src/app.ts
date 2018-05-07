import * as express from 'express';
import * as morgan from 'morgan';
import { StubRouter } from '../routes/stub-router'
import { logger } from './logger';

export interface IConfiguration {
    port: number;
    version: string;
}

export class App {
    private app: express.Application;
    private configuration: IConfiguration;

    constructor(conf: IConfiguration) {
        this.app = express();

        this.setLogger();
        this.configuration = conf;
        this.mountRoutes();
        this.listen();
    }

    private setLogger() {
        this.app.use(morgan('dev', {
            skip: (req, res) => res.statusCode < 400,
            stream: process.stderr
        }));

        this.app.use(morgan('dev', {
            skip: (req, res) => res.statusCode >= 400,
            stream: process.stdout
        }));
    }

    private mountRoutes() {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({
                message: 'Hello Wolrd!'
            })
        });
        this.app.use('/', router);

        const stubRouter = new StubRouter();
        stubRouter.Routers.forEach(item => this.app.use(item.name, item.router));
        logger.info('Stub Routes setted');

    }

    private listen() {
        const conf = this.configuration;

        this.app.listen(conf.port, () => { logger.info(`Listening on ${conf.port}`) });
    }
}
