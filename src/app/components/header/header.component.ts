import {Component} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {
  faBars,
  faCompactDisc,
  faCross,
  faHouse,
  faMusic,
  faSignIn,
  faUsers,
  faX
} from "@fortawesome/free-solid-svg-icons";
import {NgClass, NgForOf, NgIf, NgSwitch} from "@angular/common";
import {NavLinkComponent} from "../nav-link/nav-link.component";
import {VerticalDividerComponent} from "../vertical-divider/vertical-divider.component";
import {NavButtonComponent} from "../nav-button/nav-button.component";
import {HorizontalDividerComponent} from "../horizontal-divider/horizontal-divider.component";
import {ClickOutsideDirective} from "../../directives/click-outside.directive";
import {HeaderMeComponent} from "../header-me/header-me.component";
import {slideFromLeft, slideFromTop} from "../../animations";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf,
    NavLinkComponent,
    VerticalDividerComponent,
    NavButtonComponent,
    NgSwitch,
    HorizontalDividerComponent,
    NgIf,
    NgClass,
    ClickOutsideDirective,
    HeaderMeComponent
  ],
  templateUrl: './header.component.html',
  animations: [slideFromLeft, slideFromTop],
})
export class HeaderComponent {
  showHamburgerMenu: boolean = false;
  showMe: boolean = false;
  protected readonly faHouse = faHouse;
  protected readonly faMusic = faMusic;
  protected readonly faUsers = faUsers;
  protected readonly faCompactDisc = faCompactDisc;
  protected readonly faSignIn = faSignIn;
  protected readonly faBars = faBars;
  protected readonly faCross = faCross;
  protected readonly faX = faX;

  setHamburgerMenu(value: boolean) {
    this.showHamburgerMenu = value;
  }

  setMe(value: boolean) {
    this.showMe = value;
  }
}
