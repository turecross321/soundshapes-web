import {Component, Input} from '@angular/core';
import {formatDistance} from "date-fns";
import {unixToDate} from "../../date-convert";

@Component({
    selector: 'app-date',
    templateUrl: './date.component.html',
    styleUrls: []
})
export class DateComponent {
    @Input() unix: number = 0;

    date(): string {
        const date = unixToDate(this.unix);
        return date.toLocaleDateString() + " : " + date.toLocaleTimeString();
    }

    moment(): string {
        return formatDistance(unixToDate(this.unix), new Date(), {addSuffix: true, includeSeconds: false});
    }
}
