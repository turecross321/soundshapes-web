import {Component, Input} from '@angular/core';
import {ApiLevel} from "../../api/types/api-level";
import {ApiClientService} from "../../api/api-client.service";
import {faHeart, faPlay, faSkull} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-level',
    templateUrl: './level.component.html',
    styleUrls: []
})
export class LevelComponent {
    @Input() level: ApiLevel | null = null;
    protected readonly faPlay = faPlay;
    protected readonly faHeart = faHeart;
    protected readonly faSkull = faSkull;

    constructor(private apiClient: ApiClientService) {
    }

    thumbnailUrl() {
        return this.apiClient.getLevelThumbnailUrl(this.level!);
    }

    url() {
        return "/levels/" + this.level?.id;
    }
}
