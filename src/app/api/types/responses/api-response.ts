import {ApiListInformation} from "./api-list-information";
import {ApiError} from "./api-error";

export interface ApiResponse<TData> {
    listInformation: ApiListInformation | undefined;
    data: TData | undefined;
    success: boolean;
    error: ApiError | null;
    statusCode: number;
}
