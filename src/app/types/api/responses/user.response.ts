import {UserRole} from "../enums/user.role";
import {IApiResponse} from "./iapi.response";

export interface UserResponse extends IApiResponse {
  id: string;
  name: string;
  role: UserRole;
  creationDate: string;
  verifiedEmail: boolean;
  finishedRegistration: boolean;
  registrationExpiryDate: string | null;
}
