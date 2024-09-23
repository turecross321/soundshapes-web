import {UserRole} from "../enums/user.role";

export interface UserResponse {
  id: string;
  name: string;
  role: UserRole;
  creationDate: string;
  verifiedEmail: boolean;
  finishedRegistration: boolean;
  registrationExpiryDate: string | null;
}
