import {Component} from '@angular/core';
import {GenericPageComponent} from "../../components/generic-page/generic-page.component";
import {HorizontalDividerComponent} from "../../components/horizontal-divider/horizontal-divider.component";
import {PageComponent} from "../../components/page/page.component";
import {PageContentComponent} from "../../components/page-content/page-content.component";
import {PageHeaderComponent} from "../../components/page-header/page-header.component";
import {InputComponent} from "../../components/input/input.component";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {faEnvelope, faHashtag, faKey, faPlay, faUser, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {ButtonComponent} from "../../components/button/button.component";
import {InputContentType} from "../../types/components/input-content.type";
import {ButtonType} from "../../types/components/button.type";
import {ApiClientService} from "../../services/api-client.service";
import {CodeResponse} from "../../types/api/responses/code.response";
import {catchError, EMPTY} from "rxjs";
import {TinyGapContainerComponent} from "../../components/tiny-gap-container/tiny-gap-container.component";
import {slideToRight} from "../../animations";
import {EulaPopupComponent} from "../../components/eula-popup/eula-popup.component";
import {PopupService} from "../../services/popup.service";
import {sha512} from "js-sha512";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    GenericPageComponent,
    HorizontalDividerComponent,
    PageComponent,
    PageContentComponent,
    PageHeaderComponent,
    InputComponent,
    NgOptimizedImage,
    ButtonComponent,
    ReactiveFormsModule,
    NgClass,
    NgIf,
    TinyGapContainerComponent,
    EulaPopupComponent
  ],
  templateUrl: './register-page.component.html',
  animations: [slideToRight]
})
export class RegisterPageComponent {
  getCodeForm = new FormGroup({
    code: new FormControl(''),
  });

  registerForm = new FormGroup({
    username: new FormControl({value: '', disabled: true}),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  loading: boolean = false;
  code: CodeResponse | null = null;
  protected readonly InputContentType = InputContentType;
  protected readonly faHashtag = faHashtag;
  protected readonly faPlay = faPlay;
  protected readonly ButtonType = ButtonType;
  protected readonly faUser = faUser;
  protected readonly faEnvelope = faEnvelope;
  protected readonly faKey = faKey;
  protected readonly faUserPlus = faUserPlus;

  constructor(private apiClient: ApiClientService, private popupService: PopupService, private toast: ToastService) {
  }

  fetchToken() {
    this.loading = true;
    this.apiClient.getRegistrationCode(this.getCodeForm.value.code!)
      .pipe(
        catchError(() => {
          this.loading = false;

          return EMPTY;
        })
      )
      .subscribe((code) => {
        this.code = code;
        this.loading = false;
        this.registerForm.controls.username.setValue(code.user.name);
      });
  }

  register() {
    this.loading = true;

    if (this.registerForm.value.password != this.registerForm.value.confirmPassword) {
      this.loading = false;
      this.toast.error("Lock in", "Passwords don't match.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.registerForm.value.email ?? "")) {
      this.loading = false;
      this.toast.error("That ain't your email", "Invalid email address.");
      return;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(this.registerForm.value.password ?? "")) {
      this.loading = false;
      this.toast.error("Password doesn't meet requirements", "Password must be at least 8 characters long and include at least one letter and one number.");
      return;
    }
    
    this.apiClient.register({
      acceptEula: true,
      code: this.code?.code!,
      email: this.registerForm.value.email!,
      passwordSha512: sha512(this.registerForm.value.password!)
    })
      .pipe(
        catchError(() => {
          this.loading = false;

          return EMPTY;
        })
      )
      .subscribe((response) => {
        console.log("GG!");
      });
  }

  openEula() {
    this.popupService.openPopup(EulaPopupComponent);
  }
}
