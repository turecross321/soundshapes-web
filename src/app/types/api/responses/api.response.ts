import {IApiResponse} from "./iapi.response";
import {ApiError} from "./api.error";

export interface ApiResponse<TResponse extends IApiResponse> {
  statusCode: number;
  success: boolean;
  data: TResponse;
  error: ApiError;
}
