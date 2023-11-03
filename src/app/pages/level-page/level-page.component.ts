import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiClientService} from "../../api/api-client.service";
import {ApiLevel} from "../../api/types/api-level";
import {faEllipsisVertical, faHeartbeat, faPlus, faScaleUnbalanced, faUpDown} from "@fortawesome/free-solid-svg-icons";
import {ApiLevelScaleType} from "../../api/types/api-level-scale-type";

@Component({
    selector: 'app-level-page',
    templateUrl: './level-page.component.html',
    styleUrls: []
})
export class LevelPageComponent {
    level: ApiLevel | null = null;
    notFound: boolean = false;
    protected readonly faHeartbeat = faHeartbeat;
    protected readonly faScaleUnbalanced = faScaleUnbalanced;
    protected readonly faUpDown = faUpDown;
    protected readonly faPlus = faPlus;
    protected readonly faEllipsisVertical = faEllipsisVertical;

    constructor(route: ActivatedRoute, private apiClient: ApiClientService) {
        route.params.subscribe((params) => {
            const id = params["id"];
            if (this.level?.id != id) {
                this.getLevel(id);
            }
        });

    }

    async getLevel(id: string) {
        this.notFound = false;
        this.level = null;
        try {
            this.level = await this.apiClient.getLevel(id);
        } catch (e) {
            this.notFound = true;
        }
    }

    thumbnailUrl() {
        return this.apiClient.getLevelThumbnailUrl(this.level!);
    }

    scaleText() {
        switch (this.level!.analysis!.scale) {
            case ApiLevelScaleType.major:
                return "Major"
            case ApiLevelScaleType.pentatonic:
                return "Pentatonic";
            case ApiLevelScaleType.minor:
                return "Minor";
            case ApiLevelScaleType.chromatic:
                return "Chromatic";
        }
    }

    transposeText() {
        if (this.level!.analysis!.transposeValue > 0)
            return `+${this.level!.analysis!.transposeValue}`

        return this.level!.analysis!.transposeValue.toLocaleString();
    }

    vehicleTags(): string[] {
        let vehicles = [];
        if (this.level?.analysis?.hasCar)
            vehicles.push("Has Car");
        if (this.level?.analysis?.hasExplodingCar)
            vehicles.push("Has Exploding Car");
        if (this.level?.analysis?.hasUfo)
            vehicles.push("Has UFO");
        if (this.level?.analysis?.hasFirefly)
            vehicles.push("Has Firefly");

        return vehicles;
    }
}
