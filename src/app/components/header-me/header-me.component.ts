import {Component} from '@angular/core';
import {NavLinkComponent} from "../nav-link/nav-link.component";
import {faSignIn} from "@fortawesome/free-solid-svg-icons";
import {NavButtonComponent} from "../nav-button/nav-button.component";

@Component({
  selector: 'app-header-me',
  standalone: true,
  imports: [
    NavLinkComponent,
    NavButtonComponent
  ],
  templateUrl: './header-me.component.html',
})
export class HeaderMeComponent {

  protected readonly faSignIn = faSignIn;
}
