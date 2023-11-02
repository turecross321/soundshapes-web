import {Component, Input} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faPoo} from '@fortawesome/free-solid-svg-icons';
import {ElementStyle} from "../../types/element-style";

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: []
})
export class ButtonComponent {
    @Input() label: string | null = "Not set";
    @Input() faIcon: IconDefinition | null = faPoo;
    @Input() disabled: boolean = false;
    @Input() style: ElementStyle = ElementStyle.secondary;
    @Input() loading: boolean = false;
    @Input() upsideDownIcon: boolean = false;
    protected readonly ElementStyle = ElementStyle;

    isDisabled() {
        return this.disabled || this.loading;
    }
}
