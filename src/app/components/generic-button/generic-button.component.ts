import {Component, Input} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faPoo} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-generic-button',
    templateUrl: './generic-button.component.html',
    styleUrls: ['generic-button.component.css']
})
export class GenericButtonComponent {
    @Input() label: string = "Not set";
    @Input() faIcon: IconDefinition | null = faPoo;
    @Input() disabled: boolean = false;
}
