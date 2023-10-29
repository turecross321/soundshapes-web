import {PermissionsType} from "./api-permissions-type";
import {ApiParameter} from "./api-parameter";
import {ApiDocumentationError} from "./api-documentation-error";

export interface ApiRoute {
    method: string;
    routeUri: string;
    summary: string;
    authenticationRequired: boolean;
    minimumPermissionsType: PermissionsType | null;
    parameters: ApiParameter[];
    potentialErrors: ApiDocumentationError[];
}
