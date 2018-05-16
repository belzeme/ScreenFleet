import { Model } from 'mongoose';
import { IAdministratorModel } from './administrator';
import { ITVModel } from './tv';

export interface IModel {
    administrator: Model<IAdministratorModel> | null;
    tv: Model<ITVModel> | null;
}
