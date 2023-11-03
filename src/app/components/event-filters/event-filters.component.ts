import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DropdownOption} from "../../types/dropdown-option";
import {PageModifiers} from "../../types/page-modifiers";

@Component({
    selector: 'app-event-filters',
    templateUrl: './event-filters.component.html'
})
export class EventFiltersComponent {
    orderTypes: DropdownOption[] = [
        {
            name: "Creation Date",
            value: "creationDate"
        },
    ];

    @Input() modifiers: PageModifiers = {}
    @Output() onChange: EventEmitter<PageModifiers> = new EventEmitter<PageModifiers>();

    toggleDescending() {
        this.modifiers.descending = !this.modifiers.descending;
        this.onChange.emit(this.modifiers);
    }

    changeOrderType(newOrder: string) {
        this.modifiers.orderBy = newOrder;
        this.onChange.emit(this.modifiers);
    }
}
