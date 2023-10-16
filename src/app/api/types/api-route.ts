import {PermissionsType} from "./api-permissions-type";
import {ApiParameter} from "./api-parameter";
import {ApiDocumentationError} from "./api-documentation-error";

export interface ApiRoute {
    Method: string;
    RouteUri: string;
    Summary: string;
    AuthenticationRequired: boolean;
    MinimumPermissionsType: PermissionsType;
    Parameters: ApiParameter[];
    PotentialErrors: ApiDocumentationError[];
}
