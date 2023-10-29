import {PermissionsType} from "./api-permissions-type";

export interface ApiUser {
    id: string;
    username: string;
    permissionsType: PermissionsType;
    followersCount: number;
    followingCount: number;
    publishedLevelsCount: number;

    creationDate: Date | undefined;
    lastGameLogin: Date | undefined;
    lastEventDate: Date | undefined;
    likedLevelsCount: number | undefined;
    queuedLevelsCount: number | undefined;
    playedLevelsCount: number | undefined;
    eventsCount: number | undefined;
    totalDeaths: number | undefined;
    totalPlayTime: number | undefined;
}
