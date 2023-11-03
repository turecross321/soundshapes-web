import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faPoo, faSlidersH} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

@Component({
    selector: 'app-list-top',
    templateUrl: './list-top.component.html',
    styleUrls: []
})
export class ListTopComponent {
    @Output() clickFilters: EventEmitter<void> = new EventEmitter<void>();
    @Input() faIcon: IconDefinition = faPoo;
    @Input() totalItems: number | undefined = undefined;
    protected readonly faSlidersH = faSlidersH;
}
