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
        this.onNewMessage.emit({type: ToastMessageType.error, title: title, description: description});
    }

    info(title: string, description: string) {
        this.onNewMessage.emit({type: ToastMessageType.info, title: title, description: description});
    }

    success(title: string, message: string) {
        this.onNewMessage.emit({type: ToastMessageType.success, title: title, description: message});
    }
}
