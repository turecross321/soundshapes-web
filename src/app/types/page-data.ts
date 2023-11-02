import {PageModifiers} from "./page-modifiers";

export interface PageData {
    from: number;
    count: number;
    modifiers?: PageModifiers
}