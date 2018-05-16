import { Document } from 'mongoose';
import { IAdministrator } from '../interfaces/administrator';

export interface IAdministratorModel extends IAdministrator, Document {

}
