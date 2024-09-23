import {Component} from '@angular/core';
import {VerticalDividerComponent} from "../vertical-divider/vertical-divider.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faBook, faHandshake} from "@fortawesome/free-solid-svg-icons";
import {LinkComponent} from "../link/link.component";
import {PopupService} from "../../services/popup.service";
import {EulaPopupComponent} from "../eula-popup/eula-popup.component";
import {ButtonComponent} from "../button/button.component";
import {ColorType} from "../../types/components/color.type";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    VerticalDividerComponent,
    FaIconComponent,
    LinkComponent,
    ButtonComponent
  ],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  protected readonly faBook = faBook;
  protected readonly faHandshake = faHandshake;
  protected readonly ColorType = ColorType;

  constructor(private popup: PopupService) {
  }

  openEula() {
    this.popup.openPopup(EulaPopupComponent);
  }
}
