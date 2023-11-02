import {Component, Input} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faPoo} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.html',
    styleUrls: []
})
export class TagComponent {
    @Input() label: string = "not set";
    @Input() faIcon: IconDefinition = faPoo;
}
