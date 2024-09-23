import {Component} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faRotateRight, faWarning} from "@fortawesome/free-solid-svg-icons";
import {ApiMeService} from "../../services/api-me.service";
import {ButtonComponent} from "../button/button.component";
import {ColorType} from "../../types/components/color.type";
import {BannerWarningType} from "../../types/components/banner-warning-type";
import {differenceInMilliseconds, formatDuration, intervalToDuration} from "date-fns";
import {ApiClientService} from "../../services/api-client.service";
import {catchError} from "rxjs";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-banner-warning',
  standalone: true,
  imports: [
    FaIconComponent,
    ButtonComponent
  ],
  templateUrl: './banner-warning.component.html',
})
export class BannerWarningComponent {

  warning: BannerWarningType | null = null;
  resendingEmail: boolean = false;
  protected readonly faWarning = faWarning;
  protected readonly ColorType = ColorType;
  protected readonly BannerWarningType = BannerWarningType;
  protected readonly faRotateRight = faRotateRight;

  constructor(private me: ApiMeService, private apiClient: ApiClientService, private toast: ToastService) {

  }

  activeWarning(): boolean {
    if (!this.me.loggedIn()) {
      return false;
    }

    const user = this.me.getUser();
    if (!user) {
      return false;
    }

    if (!user.finishedRegistration) {
      this.warning = BannerWarningType.Registration;
      return true;
    }

    if (!user.verifiedEmail) {
      this.warning = BannerWarningType.EmailVerification;
      return true;
    }

    return false;
  }

  accountExpiryRemaining(): string {
    const user = this.me.getUser();
    const difference = differenceInMilliseconds(new Date(user!.registrationExpiryDate!), new Date());
    const duration = intervalToDuration({start: 0, end: difference});
    return formatDuration(duration);
  }

  resendEmail() {
    this.resendingEmail = true;
    this.apiClient.resendEmail()
      .pipe(catchError((e) => {
        this.resendingEmail = false;

        throw e;
      }))
      .subscribe(() => {
        this.resendingEmail = false;
        this.toast.success("Success", "Verification email sent successfully. Please check your inbox.");
      });
  }
}
