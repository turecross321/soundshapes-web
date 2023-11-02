import {PermissionsType} from "./api-permissions-type";
import {ApiParameter} from "./api-parameter";
import {ApiDocumentationError} from "./api-documentation-error";
import {ApiOrderType} from "./api-order-type";

export interface ApiRoute {
    method: string;
    routeUri: string;
    summary: string;
    authenticationRequired: boolean;
    minimumPermissionsType: PermissionsType | null;
    parameters: ApiParameter[];
    potentialErrors: ApiDocumentationError[];
    orderTypes: ApiOrderType[] | null;
}
