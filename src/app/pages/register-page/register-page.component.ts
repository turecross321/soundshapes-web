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
import {InputContentType} from "../../types/component-enums/input-content.type";
import {ButtonType} from "../../types/component-enums/button.type";
import {ApiClientService} from "../../services/api-client.service";
import {CodeResponse} from "../../types/api/responses/code.response";
import {catchError, EMPTY} from "rxjs";
import {TinyGapContainerComponent} from "../../components/tiny-gap-container/tiny-gap-container.component";
import {slideToRight} from "../../animations";
import {EulaPopupComponent} from "../../components/eula-popup/eula-popup.component";
import {PopupService} from "../../services/popup.service";

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
    email: new FormControl('')
  });

  loadingCode: boolean = false;
  code: CodeResponse | null = null;
  protected readonly InputContentType = InputContentType;
  protected readonly faHashtag = faHashtag;
  protected readonly faPlay = faPlay;
  protected readonly ButtonType = ButtonType;
  protected readonly faUser = faUser;
  protected readonly faEnvelope = faEnvelope;
  protected readonly faKey = faKey;
  protected readonly faUserPlus = faUserPlus;

  constructor(private apiClient: ApiClientService, private popupService: PopupService) {
  }

  fetchToken() {
    this.loadingCode = true;
    this.apiClient.getRegistrationCode(this.getCodeForm.value.code!)
      .pipe(
        catchError((error: any) => {
          this.loadingCode = false;

          return EMPTY;
        })
      )
      .subscribe((code) => {
        this.code = code;
        this.loadingCode = false;
        this.registerForm.controls.username.setValue(code.user.name);
      });
  }

  openEula() {
    this.popupService.openPopup();
  }
}
