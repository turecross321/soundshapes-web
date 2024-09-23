import {Component} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {
  faBars,
  faCircleUser,
  faCompactDisc,
  faHouse,
  faMusic,
  faSignIn,
  faUsers,
  faX
} from "@fortawesome/free-solid-svg-icons";
import {NgClass, NgForOf, NgIf, NgSwitch} from "@angular/common";
import {LinkComponent} from "../link/link.component";
import {VerticalDividerComponent} from "../vertical-divider/vertical-divider.component";
import {HorizontalDividerComponent} from "../horizontal-divider/horizontal-divider.component";
import {ClickOutsideDirective} from "../../directives/click-outside.directive";
import {HeaderMeComponent} from "../header-me/header-me.component";
import {slideFromLeft, slideFromTop} from "../../animations";
import {ApiMeService} from "../../services/api-me.service";
import {ButtonComponent} from "../button/button.component";
import {ColorType} from "../../types/components/color.type";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf,
    LinkComponent,
    VerticalDividerComponent,
    NgSwitch,
    HorizontalDividerComponent,
    NgIf,
    NgClass,
    ClickOutsideDirective,
    HeaderMeComponent,
    ButtonComponent
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
  protected readonly faX = faX;
  protected readonly faCircleUser = faCircleUser;
  protected readonly ColorType = ColorType;

  constructor(public me: ApiMeService) {
  }

  setHamburgerMenu(value: boolean) {
    this.showHamburgerMenu = value;
  }

  setMe(value: boolean) {
    this.showMe = value;
  }
}
