import {Component} from '@angular/core';
import {GenericPageComponent} from "../../components/generic-page/generic-page.component";
import {InputComponent} from "../../components/input/input.component";
import {InputContentType} from "../../types/components/input-content.type";
import {faCheckCircle, faHashtag} from "@fortawesome/free-solid-svg-icons";
import {TinyGapContainerComponent} from "../../components/tiny-gap-container/tiny-gap-container.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ButtonComponent} from "../../components/button/button.component";
import {ButtonType} from "../../types/components/button.type";
import {Router} from "@angular/router";
import {ApiClientService} from "../../services/api-client.service";
import {ToastService} from "../../services/toast.service";
import {UserResponse} from "../../types/api/responses/user.response";
import {ApiMeService} from "../../services/api-me.service";
import {catchError, EMPTY} from "rxjs";

@Component({
  selector: 'app-verify-email-page',
  standalone: true,
  imports: [
    GenericPageComponent,
    InputComponent,
    TinyGapContainerComponent,
    ReactiveFormsModule,
    ButtonComponent
  ],
  templateUrl: './verify-email-page.component.html',
})
export class VerifyEmailPageComponent {
  verifyEmailForm = new FormGroup({
    code: new FormControl(''),
  });
  loading: boolean = false;
  protected readonly InputContentType = InputContentType;
  protected readonly faHashtag = faHashtag;
  protected readonly ButtonType = ButtonType;
  protected readonly faCheckCircle = faCheckCircle;

  constructor(private apiClient: ApiClientService, private router: Router, private me: ApiMeService, private toast: ToastService) {
  }

  submit() {
    this.loading = true;
    this.apiClient.verifyEmail({code: this.verifyEmailForm.value.code ?? ""})
      .pipe(
        catchError(() => {
          this.loading = false;

          return EMPTY;
        })
      )
      .subscribe((response: UserResponse) => {
        this.toast.success("Successfully verified email", "Your email has successfully been verified.");
        this.me.setUser(response);
        this.router.navigateByUrl("");
        this.loading = false;
      });
  }
}
