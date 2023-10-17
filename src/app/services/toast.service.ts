import {EventEmitter, Injectable, Output} from '@angular/core';
import {ToastMessageType} from "../types/toast-message-type";
import {ToastMessage} from "../types/toast-message";

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    @Output() onNewMessage = new EventEmitter<ToastMessage>();

    constructor() {
    }

    error(title: string, description: string) {
        this.onNewMessage.emit({Type: ToastMessageType.Error, Title: title, Description: description});
    }

    info(title: string, description: string) {
        this.onNewMessage.emit({Type: ToastMessageType.Info, Title: title, Description: description});
    }

    success(title: string, message: string) {
        this.onNewMessage.emit({Type: ToastMessageType.Success, Title: title, Description: message});
    }
}
