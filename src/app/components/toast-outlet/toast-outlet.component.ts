import {Component} from '@angular/core';
import {ToastService} from "../../services/toast.service";
import {ToastMessage} from "../../types/components/toast.message";
import {NgForOf} from "@angular/common";
import {toast} from "../../animations";
import {ToastNotificationComponent} from "../toast-notification/toast-notification.component";

@Component({
  selector: 'app-toast-outlet',
  standalone: true,
  imports: [
    ToastNotificationComponent,
    NgForOf
  ],
  templateUrl: './toast-outlet.component.html',
  animations: [toast]
})
export class ToastOutletComponent {
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

  private removeMessage() {
    this.messages.shift();
  }
}
