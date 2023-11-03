import {Component, Input} from '@angular/core';
import {ApiLevel} from "../../api/types/api-level";
import {faHeart, faPlay, faSkull} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-level-statistics',
    templateUrl: './level-statistics.component.html',
    styleUrls: []
})
export class LevelStatisticsComponent {
    @Input() level!: ApiLevel;
    protected readonly faPlay = faPlay;
    protected readonly faHeart = faHeart;
    protected readonly faSkull = faSkull;
}
