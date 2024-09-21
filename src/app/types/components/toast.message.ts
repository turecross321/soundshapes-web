import {ToastMessageType} from "./toast.message.type";

export interface ToastMessage {
  title: string;
  description: string;
  type: ToastMessageType
}
