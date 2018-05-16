export interface IRouteMethod {
    group: string;
    name: string;
};

export interface IAPIRoute {
    name: string;
    methods: IRouteMethod[];
    version: string;
}

export interface IIndexReponse {
    methods: IRouteMethod[];
    name: string;
    routes: IAPIRoute[];
    version: string;
}

export interface IAdministratorPostData {
    name: string;
    secret: string;
}

export interface IAdministratorData {
    id: number;
    hash?: number;
    name: string;
}

export type IAdministratorList = IAdministratorData[];
