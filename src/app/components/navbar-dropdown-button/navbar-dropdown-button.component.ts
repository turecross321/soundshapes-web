import {Component, Input} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faPoo} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-navbar-dropdown-button',
    templateUrl: './navbar-dropdown-button.component.html',
    styleUrls: []
})
export class NavbarDropdownButtonComponent {
    @Input() faIcon: IconDefinition = faPoo;
    @Input() label: string = "Not Set";
    @Input() loading: boolean = false;
}
