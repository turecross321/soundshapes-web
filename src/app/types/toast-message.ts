import {ToastMessageType} from "./toast-message-type";

export interface ToastMessage {
    type: ToastMessageType;
    title: string;
    description: string;
}