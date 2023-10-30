import {Component} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {NavigationEnd, Router} from "@angular/router";
import {ApiClientService} from "../../api/api-client.service";
import {ApiUser} from "../../api/types/api-user";
import {
    faBars,
    faCircleUser,
    faCompactDisc,
    faHouse,
    faMusic,
    faRightToBracket,
    faUsers
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: []
})
export class NavbarComponent {
    faBars: IconDefinition = faBars;
    faRightToBracket: IconDefinition = faRightToBracket;
    faCircleUser: IconDefinition = faCircleUser;

    currentPage: PageType = PageType.other;
    showAccountPopUp: boolean = false;
    showHamburgerMenu: boolean = false;
    buttons: NavbarButton[] = [
        {
            path: "/",
            label: "Home",
            icon: faHouse
        },
        {
            path: "/levels",
            label: "Levels",
            icon: faMusic
        },
        {
            path: "/albums",
            label: "Albums",
            icon: faCompactDisc
        },
        {
            path: "/users",
            label: "Users",
            icon: faUsers
        }
    ]
    protected readonly PageType = PageType;

    constructor(router: Router, private ApiClient: ApiClientService) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                switch (true) {
                    case event.url == "/":
                        this.currentPage = PageType.home;
                        break;
                    case event.url.startsWith("/levels"):
                        this.currentPage = PageType.levels;
                        break;
                    case event.url.startsWith("/albums"):
                        this.currentPage = PageType.albums;
                        break;
                    case event.url.startsWith("/users"):
                        this.currentPage = PageType.users;
                        break;
                    default:
                        this.currentPage = PageType.other;
                        break;
                }
            }
        });
    }

    loggedIn(): boolean | undefined {
        return this.ApiClient.loggedIn();
    }

    user(): ApiUser | undefined {
        return this.ApiClient.user;
    }

    toggleAccountPopUp() {
        this.setAccountPopUpVisibility(!this.showAccountPopUp);
    }

    setAccountPopUpVisibility(visibility: boolean) {
        this.showAccountPopUp = visibility;
    }

    toggleHamburgerMenu() {
        this.setHamburgerMenuVisibility(!this.showHamburgerMenu);
    }

    setHamburgerMenuVisibility(visibility: boolean) {
        this.showHamburgerMenu = visibility;
    }
}

enum PageType {
    home = 0,
    levels = 1,
    albums = 2,
    users = 3,
    other = 4
}

interface NavbarButton {
    path: string,
    label: string,
    icon: IconDefinition
}
