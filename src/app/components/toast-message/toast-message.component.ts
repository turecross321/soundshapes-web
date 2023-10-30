import {Component, Input} from '@angular/core';
import {ToastMessage} from "../../types/toast-message";
import {ToastMessageType} from "../../types/toast-message-type";
import {faCheckCircle, faInfoCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-toast-message',
    templateUrl: './toast-message.component.html',
    styleUrls: []
})
export class ToastMessageComponent {
    @Input() message: ToastMessage = null!;

    faIcon() {
        switch (this.message.type) {
            case ToastMessageType.success:
                return faCheckCircle;
            case ToastMessageType.error:
                return faTimesCircle
            case ToastMessageType.info:
                return faInfoCircle;
        }
    }
}
