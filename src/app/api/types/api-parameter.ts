import {ParameterType} from "./api-parameter-type";

export interface ApiParameter {
    name: string;
    type: ParameterType;
    summary: string;
}