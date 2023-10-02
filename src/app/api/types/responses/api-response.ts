import {ApiListInformation} from "./api-list-information";
import {ApiError} from "./api-error";

export interface ApiResponse<TData> {
  ListInformation: ApiListInformation | undefined;
  Data: TData | undefined;
  Success: boolean;
  Error: ApiError | null;
  StatusCode: number;
}
