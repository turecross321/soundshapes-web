import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DropdownOption} from "../../types/dropdown-option";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: []
})
export class DropdownComponent {
    @Input() value: string = "";
    @Input() options: DropdownOption[] = [];
    @Output() onChoose: EventEmitter<string> = new EventEmitter<string>();
    faChevronDown: IconDefinition = faChevronDown;

    choose(event: Event) {
        // @ts-ignore
        let value: string[] = String(event.target.value).split(" ");
        // remove the stupid ass 'i: ' prefix that it adds
        value.shift();

        this.onChoose.emit(value.join());
    }
}
