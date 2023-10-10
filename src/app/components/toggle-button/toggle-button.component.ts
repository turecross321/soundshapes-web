import {Component, Input} from '@angular/core';
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

@Component({
    selector: 'app-toggle-button',
    templateUrl: './toggle-button.component.html',
    styleUrls: ['./toggle-button.component.css']
})
export class ToggleButtonComponent {
    @Input() isToggled: boolean = false;
    @Input() faIcon: IconDefinition = faTimes;
}
