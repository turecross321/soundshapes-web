import {Component, Input} from '@angular/core';
import {ApiEvent} from "../../api/types/api-event";
import {ApiEventType} from "../../api/types/api-event-type";

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: []
})
export class EventComponent {
    @Input() event: ApiEvent | null = null;
    protected readonly ApiEventType = ApiEventType;

    leaderboardTime(): string {
        const durationInMilliseconds = this.event!.dataLeaderboardEntry!.playTime;
        const minutes = Math.floor(durationInMilliseconds / 60000);
        const seconds = Math.floor((durationInMilliseconds % 60000) / 1000);

        if (minutes < 1)
            return `${seconds} seconds`;

        return `${minutes} minutes and ${seconds} seconds`;
    }
}
