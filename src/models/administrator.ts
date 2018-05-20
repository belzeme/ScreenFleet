import { Document } from 'mongoose';
import { IAdministrator } from '../interfaces/administrator';

/**
 * @namespace ScreenFleet
 */

/**
 * @namespace ScreenFleet.models
 */

/**
 * 
 * @interface IAdministratorModel
 * @class ScreenFleet.models.IAdministratorModel
 * @clasdesc The mongoose Model
 * @extends ScreenFleet.models.IAdministrator
 * @extends mongoose.Document
 */
export interface IAdministratorModel extends IAdministrator, Document {

}
