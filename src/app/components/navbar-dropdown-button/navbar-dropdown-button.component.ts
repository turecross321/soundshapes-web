import {Component, Input} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faPoo, faSpinner} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-navbar-dropdown-button',
  templateUrl: './navbar-dropdown-button.component.html',
  styleUrls: ['navbar-dropdown-button.component.css']
})
export class NavbarDropdownButtonComponent {
  @Input() faIcon: IconDefinition = faPoo;
  @Input() label: string = "Not Set";
  @Input() highlighted: boolean = false;
  @Input() loading: boolean = false;

  faSpinner: IconDefinition = faSpinner;
}
