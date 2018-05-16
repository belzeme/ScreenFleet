import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { IAdministrator } from '../src/interfaces/administrator';
import { IAdministratorModel } from '../src/models/administrator';
import { administratorSchema } from '../src/schemas/administrator';

import mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const MONGODB_CONNECTION: string = 'mongodb://localhost:27017/ScreenFleet';
const connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);
const Administrator: mongoose.Model<IAdministratorModel> = connection.model<IAdministratorModel>("Administrator", administratorSchema);

chai.use(chaiAsPromised);
const expect = chai.expect;

connection.on('error', console.error.bind(console, 'mongodb error'));

describe('Administrator', () => {
    describe('create()', () => {
        it('should create a new Administrator', () => {
            const administrator: IAdministrator = {
                hash: 'fat Mike',
                name: 'John Doe'
            };

            // create user and return promise
            let obj = new Administrator(administrator);
            obj.save()
                .then(value => {
                    expect(value.name).to.equal(administrator.name);
                    expect(value.hash).to.equal(administrator.hash);
                    return;
                })
                .catch(reason => console.log(reason));
        });
    });
});
