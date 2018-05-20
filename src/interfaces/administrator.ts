/**
 * @namespace ScreenFleet
 */

/**
 * @namespace ScreenFleet.interfaces
 */

/**
 * IAdministrator
 * @interface
 * @class IAdministrator
 * @clasdesc The Administrator model interface
 */
export interface IAdministrator {
    /**
     * The Administrator name
     * @abstract
     * @member {string} ScreenFleet.interfaces.IAdministrator#name
     */
    name: string;
    /**
     * The Administrator hash
     * @abstract
     * @member {string} ScreenFleet.interfaces.IAdministrator#hash
     */
    hash: string;
}
