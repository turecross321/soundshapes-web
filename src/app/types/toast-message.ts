import {ToastMessageType} from "./toast-message-type";

export interface ToastMessage {
    Type: ToastMessageType;
    Title: string;
    Description: string;
}