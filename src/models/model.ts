import { Model } from 'mongoose';
import { IAdministratorModel } from './administrator';
import { ITVModel } from './tv';

/**
 * @namespace ScreenFleet
 */

/**
 * @namespace ScreenFleet.models
 */

/**
 * IModel
 * @interface
 * @class ScreenFleet.model.IModel
 * @clasdesc The Model group used by mongoose to interact with the mongo db
 */
export interface IModel {
    /**
     * The adminstrators model
     * @abstract
     * @member {ScreenFleet.models.IAdministratorModel|null} ScreenFleet.models.IModel#administrator
     */
    administrator: Model<IAdministratorModel> | null;

    /**
     * The tv model
     * @abstract
     * @member {ScreenFleet.models.ITVModel|null} ScreenFleet.models.IModel#tv
     */
    tv: Model<ITVModel> | null;
}
