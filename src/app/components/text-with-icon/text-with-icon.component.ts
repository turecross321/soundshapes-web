import {Component, Input} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faPoo} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-text-with-icon',
    templateUrl: './text-with-icon.component.html',
    styleUrls: []
})
export class TextWithIconComponent {
    @Input() faIcon: IconDefinition = faPoo;
    @Input() text: string = "Not set";
}
