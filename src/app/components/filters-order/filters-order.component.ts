import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DropdownOption} from "../../types/dropdown-option";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {PageModifiers} from "../../types/page-modifiers";

@Component({
    selector: 'app-filters-order',
    templateUrl: './filters-order.component.html'
})
export class FiltersOrderComponent {
    @Input() orderTypes!: DropdownOption[];
    @Input() modifiers!: PageModifiers;
    @Output() toggleDescending: EventEmitter<void> = new EventEmitter<void>();
    @Output() changeOrderType: EventEmitter<string> = new EventEmitter<string>();
    protected readonly faArrowDown = faArrowDown;
}
