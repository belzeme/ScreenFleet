import * as fs from 'fs';
import * as path from 'path';

import { App, IConfiguration } from './app';
import { logger } from './logger';

const CONF_NAME = {
    server: 'server-config.json'
}


const readConfigurationFile = (fileName: string): Promise<IConfiguration> => {
    const confPath = path.resolve(__dirname, '../config', fileName);
    return new Promise((resolve, reject) => {
        fs.readFile(confPath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });

}


readConfigurationFile(CONF_NAME.server).then((conf) => {
    const app = new App(conf);
}).catch((err) => { logger.error(err); });

