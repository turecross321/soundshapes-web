import {PermissionsType} from "./api-permissions-type";

export interface ApiUser {
    Id: string;
    Username: string;
    PermissionsType: PermissionsType;
    Followers: number;
    Following: number;
    PublishedLevels: number;

    CreationDate: number | undefined;
    LastGameLogin: number | undefined;
    LastEventDate: number | undefined;
    LikedLevels: number | undefined;
    QueuedLevels: number | undefined;
    PlayedLevels: number | undefined;
    TotalEvents: number | undefined;
    TotalDeaths: number | undefined;
    TotalPlayTime: number | undefined;
}
