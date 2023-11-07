import {Component, Input, OnInit} from '@angular/core';
import {formatDistance} from "date-fns";

@Component({
    selector: 'app-date',
    templateUrl: './date.component.html',
    styleUrls: []
})
export class DateComponent implements OnInit {
    @Input() prefix: string = "";
    @Input() date: Date | string = null!;
    _date!: Date;

    formattedDate(): string {
        return this._date.toLocaleDateString() + " @ " + this._date.toLocaleTimeString();
    }

    moment(): string {
        return formatDistance(this._date, new Date(), {addSuffix: true, includeSeconds: false});
    }

    ngOnInit(): void {
        this._date = new Date(this.date);
    }
}
