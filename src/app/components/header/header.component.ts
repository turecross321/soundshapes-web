import {Component} from '@angular/core';
import {HeaderMeComponent} from "../header-me/header-me.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faHouse, faMusic} from "@fortawesome/free-solid-svg-icons";
import {NgForOf} from "@angular/common";
import {NavLinkComponent} from "../nav-link/nav-link.component";
import {VerticalDividerComponent} from "../vertical-divider/vertical-divider.component";
import {ColorType} from "../../types/color.type";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    HeaderMeComponent,
    FaIconComponent,
    NgForOf,
    NavLinkComponent,
    VerticalDividerComponent
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  protected readonly faHouse = faHouse;
  protected readonly faMusic = faMusic;
  protected readonly ColorType = ColorType;
}
