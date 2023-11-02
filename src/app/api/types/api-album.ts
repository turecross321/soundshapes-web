import {ApiUser} from "./api-user";

export interface ApiAlbum {
    id: string;
    author: ApiUser;
    name: string;
    linerNotes: string;
    totalLevels: number;
    creationDate: string;
    modificationDate: string
}