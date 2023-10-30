import {ApiUser} from "./api-user";

export interface ApiPunishment {
    id: string,
    recipient: ApiUser,
    reason: string,
    revoked: boolean,
    author: ApiUser,
    creationDate: Date,
    modificationDate: Date,
    expiryDate: Date,
    revokeDate: Date | null;
}
