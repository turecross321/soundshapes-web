import {Component, Injectable} from '@angular/core';
import {ToastService} from "../../services/toast.service";
import {ToastMessage} from "../../types/toast-message";

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: []
})
@Injectable()
export class ToastComponent {
    messages: ToastMessage[] = [];

    constructor(private toastService: ToastService) {
        this.toastService.onNewMessage.subscribe((message) => {
            this.message(message);
        });
    }

    activeMessages() {
        return this.messages;
    }

    private async message(message: ToastMessage) {
        this.messages.push(message);
        // wait 5 seconds
        await new Promise(f => setTimeout(f, 3000));
        this.removeMessage();
    }

    private async removeMessage() {
        this.messages.shift();
    }
}
