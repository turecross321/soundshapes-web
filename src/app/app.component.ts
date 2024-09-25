import {Component} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {EulaPopupComponent} from "./components/eula-popup/eula-popup.component";
import {NgIf} from "@angular/common";
import {ClickOutsideDirective} from "./directives/click-outside.directive";
import {ToastOutletComponent} from "./components/toast-outlet/toast-outlet.component";
import {PopupOutletComponent} from "./components/popup-outlet/popup-outlet.component";
import {FooterComponent} from "./components/footer/footer.component";
import {BannerWarningComponent} from "./components/banner-warning/banner-warning.component";
import {routeTransition} from "./animations";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, EulaPopupComponent, NgIf, ClickOutsideDirective, ToastOutletComponent, PopupOutletComponent, FooterComponent, BannerWarningComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    routeTransition
  ],
})
export class AppComponent {
  title = 'Sound Shapes';

  constructor(public route: ActivatedRoute) {
  }

}
