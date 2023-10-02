import {Component} from '@angular/core';
import {
  faArrowRightFromBracket,
  faBars,
  faCircleUser,
  faCompactDisc,
  faGear,
  faHouse,
  faKey,
  faMusic,
  faRightToBracket,
  faUser,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {NavigationEnd, Router} from "@angular/router";
import {ApiClientService} from "../../api/api-client.service";
import {ApiSession} from "../../api/types/api-session";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent {
  faHouse: IconDefinition = faHouse;
  faBars: IconDefinition = faBars;
  faMusic: IconDefinition = faMusic;
  faCompactDisc: IconDefinition = faCompactDisc;
  faUsers: IconDefinition = faUsers;
  faRightToBracket: IconDefinition = faRightToBracket;
  faCircleUser: IconDefinition = faCircleUser;

  currentPage: PageType = PageType.other;
  showAccountPopUp: boolean = false;
  showHamburgerPopUp: boolean = false;
  protected readonly PageType = PageType;
  protected readonly faArrowRightFromBracket = faArrowRightFromBracket;
  protected readonly faKey = faKey;
  protected readonly faUser = faUser;
  protected readonly faGear = faGear;

  constructor(router: Router, private ApiClient: ApiClientService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        switch (event.url) {
          case "/":
            this.currentPage = PageType.home;
            break;
          case "/levels":
            this.currentPage = PageType.levels;
            break;
          case "/albums":
            this.currentPage = PageType.albums;
            break;
          case "/users":
            this.currentPage = PageType.users;
            break;
          default:
            this.currentPage = PageType.other;
            break;
        }

        // Close mobile hamburger pop up when route is changed
        if (this.showHamburgerPopUp)
          this.showHamburgerPopUp = false;
      }
    });
  }

  loggedIn(): boolean {
    return this.ApiClient.loggedIn();
  }

  session(): ApiSession | undefined {
    return this.ApiClient.session;
  }

  toggleAccountPopUp() {
    if (this.showAccountPopUp || this.showHamburgerPopUp) {
      this.showAccountPopUp = false;
      this.showHamburgerPopUp = false;
    } else {
      this.showAccountPopUp = true;
    }
  }

  toggleHamburgerPopUp() {
    if (this.showAccountPopUp || this.showHamburgerPopUp) {
      this.showAccountPopUp = false;
      this.showHamburgerPopUp = false;
    } else {
      this.showHamburgerPopUp = true;
    }
  }
}

enum PageType {
  home = 0,
  levels = 1,
  albums = 2,
  users = 3,
  other = 4,
}
