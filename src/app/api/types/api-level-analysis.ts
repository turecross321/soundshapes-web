import {ApiLevelScaleType} from "./api-level-scale-type";

export interface ApiLevelAnalysis {
    fileSize: number;
    bpm: number;
    transposeValue: number;
    scale: ApiLevelScaleType;
    totalScreens: number;
    totalEntities: number;
    hasCar: boolean;
    hasExplodingCar: boolean;
    hasUfo: boolean;
    hasFirefly: boolean;
}