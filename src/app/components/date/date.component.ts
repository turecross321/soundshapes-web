import {Component, Input, OnInit} from '@angular/core';
import {formatDistance} from "date-fns";

@Component({
    selector: 'app-date',
    templateUrl: './date.component.html',
    styleUrls: []
})
export class DateComponent implements OnInit {
    @Input() date: Date = null!;

    formattedDate(): string {
        return this.date.toLocaleDateString() + " : " + this.date.toLocaleTimeString();
    }

    moment(): string {
        return formatDistance(this.date, new Date(), {addSuffix: true, includeSeconds: false});
    }

    ngOnInit(): void {
        this.date = new Date(this.date);
    }
}
