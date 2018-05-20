/**
 * @namespace ScreenFleet
 */

/**
 * @namespace ScreenFleet.interfaces
 */

/**
 * ITV
 * @interface
 * @class ITV
 * @clasdesc The TV model interface
 */
export interface ITV {
    /**
     * The TV name
     * @abstract
     * @member {string} ScreenFleet.interfaces.ITV#name
     */
    name: string;
    /**
     * The TV IP
     * @abstract
     * @member {string} ScreenFleet.interfaces.ITV#ip
     */
    ip: string;
    /**
     * The TV content to display
     * @abstract
     * @member {string} ScreenFleet.interfaces.ITV#html
     */
    html?: string;
    /**
     * The TV links to the ressources to display
     * @abstract
     * @member {Array<{name:string, link: string}>} ScreenFleet.interfaces.ITV#assets
     */
    assets: Array<{ name: string, link: string }>;
}
