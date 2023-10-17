import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-two-way-toggle',
    templateUrl: './two-way-toggle.component.html',
    styleUrls: []
})
export class TwoWayToggleComponent {
    @Input() toggled: boolean = false;
    @Output() onClick: EventEmitter<boolean> = new EventEmitter();
    faTimes: IconDefinition = faTimes;
    faCheck: IconDefinition = faCheck;

    clicked(newValue: boolean): void {
        this.onClick.emit(newValue);
    }
}
