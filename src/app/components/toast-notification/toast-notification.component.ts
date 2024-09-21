import {Component, Input} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ToastMessage} from "../../types/components/toast.message";
import {faCheckCircle, faInfoCircle, faTimesCircle, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import {ToastMessageType} from "../../types/components/toast.message.type";

@Component({
  selector: 'app-toast-notification',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './toast-notification.component.html',
})
export class ToastNotificationComponent {
  @Input() message: ToastMessage = null!;

  icon() {
    switch (this.message.type) {
      case ToastMessageType.success:
        return faCheckCircle;
      case ToastMessageType.info:
        return faInfoCircle;
      case ToastMessageType.warn:
        return faTriangleExclamation
      case ToastMessageType.error:
        return faTimesCircle
    }
  }
}
