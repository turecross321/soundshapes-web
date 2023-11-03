import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: []
})
export class CheckboxComponent {
    @Input() value: boolean = false;
    @Output() onChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    onClick() {
        this.value = !this.value;
        this.onChange.emit(this.value);
    }
}
