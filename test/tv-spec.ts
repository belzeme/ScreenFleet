import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { ITV } from '../src/interfaces';
import { ITVModel } from '../src/models/tv';
import { tvSchema } from '../src/schemas/tv';

import mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const MONGODB_CONNECTION: string = 'mongodb://localhost:27017/ScreenFleet';
const connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);
const TV: mongoose.Model<ITVModel> = connection.model<ITVModel>("TV", tvSchema);

chai.use(chaiAsPromised);
const expect = chai.expect;

connection.on('error', console.error.bind(console, 'mongodb error'));

describe('TV', () => {
    describe('create()', () => {
        it('should create a new TV', () => {
            const tv: ITV = {
                name: 'Local TV',
                ip: '127.0.0.1'
            };

            // create user and return promise
            let obj = new TV(tv);
            obj.save()
                .then(value => {
                    expect(value.name).to.equal(tv.name);
                    expect(value.ip).to.equal(tv.ip);
                    return;
                })
                .catch(reason => console.log(reason));
        });
    });
});
