import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {EulaPopupComponent} from "./components/eula-popup/eula-popup.component";
import {PopupService} from "./services/popup.service";
import {NgIf} from "@angular/common";
import {fade} from "./animations";
import {ClickOutsideDirective} from "./directives/click-outside.directive";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, EulaPopupComponent, NgIf, ClickOutsideDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [fade]
})
export class AppComponent {
  title = 'Sound Shapes';

  constructor(public popupService: PopupService) {
  }

}
