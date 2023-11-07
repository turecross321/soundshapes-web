import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faPoo, faSlidersH} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {IApiFilters} from "../../api/types/filters/i-api-filters";

@Component({
    selector: 'app-list-top',
    templateUrl: './list-top.component.html',
    styleUrls: []
})
export class ListTopComponent {
    @Output() clickFilters: EventEmitter<void> = new EventEmitter<void>();
    @Input() faIcon: IconDefinition = faPoo;
    @Input() totalItems: number | undefined = undefined;
    @Input() filters: any;
    protected readonly faSlidersH = faSlidersH;

    getFiltersCount() {
        if (!this.filters)
            return 0;

        let count : number = 0;

        for (let key of this.filters) {
            const value: any = this.filters[key];
            if (value != null || value != undefined)
                count += 1;
        }

        return count;
    }
}
