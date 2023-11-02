import {ApiUser} from "./api-user";

export interface ApiNewsEntry {
    id: string;
    creationDate: string;
    modificationDate: string;
    language: string;
    author: ApiUser;
    title: string;
    summary: string;
    fullText: string;
    url: string;
}