import {Component, Input} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.html',
    styleUrls: []
})
export class TagComponent {
    @Input() value: string = "not set";
    @Input() label: string | null = null;
    @Input() faIcon: IconDefinition | null = null;
}
