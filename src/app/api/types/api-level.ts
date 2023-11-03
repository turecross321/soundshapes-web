import {ApiUser} from "./api-user";
import {ApiPlatformType} from "./api-platform-type";
import {ApiLevelAnalysis} from "./api-level-analysis";
import {ApiLevelVisibility} from "./api-level-visibility";
import {ApiAlbum} from "./api-album";

export interface ApiLevel {
    // brief
    id: string;
    name: string;
    author: ApiUser;
    creationDate: string;
    modificationDate: string;
    totalPlays: number;
    uniquePlays: number;
    likes: number;
    queues: number;
    difficulty: number;
    visibility: ApiLevelVisibility;

    // full
    analysis: ApiLevelAnalysis | undefined;
    language: number | undefined;
    uploadPlatform: ApiPlatformType | undefined;
    uniqueCompletions: number | undefined;
    totalCompletions: number | undefined;
    totalDeaths: number | undefined;
    totalPlaytime: number | undefined;
    albums: ApiAlbum[] | undefined;
    dailyLevelDate: string | undefined;
}