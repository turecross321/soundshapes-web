import {Component} from '@angular/core';
import {VerticalDividerComponent} from "../vertical-divider/vertical-divider.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faBook, faHandshake} from "@fortawesome/free-solid-svg-icons";
import {NavLinkComponent} from "../nav-link/nav-link.component";
import {NavButtonComponent} from "../nav-button/nav-button.component";
import {PopupService} from "../../services/popup.service";
import {EulaPopupComponent} from "../eula-popup/eula-popup.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    VerticalDividerComponent,
    FaIconComponent,
    NavLinkComponent,
    NavButtonComponent
  ],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  protected readonly faBook = faBook;
  protected readonly faHandshake = faHandshake;

  constructor(private popup: PopupService) {
  }

  openEula() {
    this.popup.openPopup(EulaPopupComponent);
  }
}
