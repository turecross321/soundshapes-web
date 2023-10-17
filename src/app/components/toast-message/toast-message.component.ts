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
        switch (this.message.Type) {
            case ToastMessageType.Success:
                return faCheckCircle;
            case ToastMessageType.Error:
                return faTimesCircle
            case ToastMessageType.Info:
                return faInfoCircle;
        }
    }
}
