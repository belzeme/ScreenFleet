/**
 * @namespace ScreenFleet
 */

/**
 * @namespace ScreenFleet.models
 */

/**
 * IRouteMethod
 * @interface
 * @class IRouteMethod
 * @clasdesc The route method interface
 */
export interface IRouteMethod {
    /**
     * The group that can access this routes method
     * @abstract
     * @member {string} ScreenFleet.models.IRouteMethod#group
     */
    group: string;
    /**
     * The method name.
     * @abstract
     * @member {string} ScreenFleet.models.IRouteMethod#name
     */
    name: string;
};

/**
 * IAPIRoute
 * @interface
 * @class IAPIRoute
 * @clasdesc The APIRoute interface
 */
export interface IAPIRoute {
    /**
     * The Route name
     * @abstract
     * @member {string} ScreenFleet.models.IAPIRoute#name
     */
    name: string;
    /**
     * The methods available for this route.
     * @abstract
     * @member {Array<ScreeFleet.models.IRouteMethod>} ScreenFleet.models.IAPIRoute#methods
     */
    methods: IRouteMethod[];
    /**
     * The Route version
     * @abstract
     * @member {string} ScreenFleet.models.IAPIRoute#version
     */
    version: string;
}

/**
 * IIndexResponse
 * @interface
 * @class IIndexReponse
 * @clasdesc The IndexResponse interface.
 */
export interface IIndexReponse {
    /**
     * The route methods
     * @abstract
     * @member {Array<ScreeFleet.models.IRouteMethod>} ScreenFleet.models.IIndexResponse#methods
     */
    methods: IRouteMethod[];
    /**
     * The route name
     * @abstract
     * @member {string} ScreenFleet.models.IIndexResponse#name
     */
    name: string;
    /**
     * The routes linked to this one
     * @abstract
     * @member {Array<ScreeFleet.models.IRouteMethod>} ScreenFleet.models.IIndexResponse#routes
     */
    routes: IAPIRoute[];
    /**
     * The route version
     * @abstract
     * @member {string} ScreenFleet.models.IIndexResponse#version
     */
    version: string;
}

/**
 * IAdministratorPostData
 * @interface
 * @class IAdministratorPostData
 * @clasdesc The IAdministratorPostData
 */
export interface IAdministratorPostData {
    /**
     * The administrator name
     * @abstract
     * @member {string} ScreenFleet.models.IAdminiStratorPostData#name
     */
    name: string;
    /**
     * The administrator secret password
     * @abstract
     * @member {string} ScreenFleet.models.IAdministratorPostData#secret
     */
    secret: string;
}

/**
 * IAdministratorData
 * @interface
 * @class IAdministratorData
 * @clasdesc The IAdministratorData
 */
export interface IAdministratorData {
    /**
     * The Administrator ID
     * @abstract
     * @member {number} ScreenFleet.models.IAdministratorData#id
     */
    id: number;
    /**
     * The Administrator hash
     * @abstract
     * @member {number|undefined} ScreenFleet.models.IAdministratorData#hash
     */
    hash?: number;
    /**
     * The Administrator name
     * @abstract
     * @member {string} ScreenFleet.models.IAdministratorData#name
     */
    name: string;
}

/**
 * IAdministratorList
 * @interface
 * @class IAdministratorList
 * @clasdesc The administrator list
 */
export type IAdministratorList = IAdministratorData[];
