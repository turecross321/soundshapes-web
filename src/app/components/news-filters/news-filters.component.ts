import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DropdownOption} from "../../types/dropdown-option";
import {faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {PageModifiers} from "../../types/page-modifiers";

@Component({
    selector: 'app-news-filters',
    templateUrl: './news-filters.component.html',
    styleUrls: []
})
export class NewsFiltersComponent {
    orderTypes: DropdownOption[] = [
        {
            name: "Creation Date",
            value: "creationDate"
        },
        {
            name: "Modification Date",
            value: "modificationDate"
        },
        {
            name: "Character Count",
            value: "characters"
        },

    ];

    @Input() modifiers: PageModifiers = {}
    @Output() onChange: EventEmitter<PageModifiers> = new EventEmitter<PageModifiers>();
    protected readonly faArrowDown = faArrowDown;

    toggleDescending() {
        this.modifiers.descending = !this.modifiers.descending;
        this.onChange.emit(this.modifiers);
    }

    changeOrderType(newOrder: string) {
        this.modifiers.orderBy = newOrder;
        this.onChange.emit(this.modifiers);
    }
}
