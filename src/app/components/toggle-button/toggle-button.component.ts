import {Component, Input} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-toggle-button',
    templateUrl: './toggle-button.component.html',
    styleUrls: []
})
export class ToggleButtonComponent {
    @Input() isToggled: boolean = false;
    @Input() faIcon: IconDefinition = faTimes;
}
