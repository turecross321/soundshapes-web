import {Component, Input} from '@angular/core';
import {ApiUser} from "../../api/types/api-user";
import {ApiLevel} from "../../api/types/api-level";
import {ApiAlbum} from "../../api/types/api-album";
import {ApiNewsEntry} from "../../api/types/api-news-entry";

@Component({
    selector: 'app-link',
    templateUrl: './link.component.html',
    styleUrls: []
})
export class LinkComponent {
    @Input() user?: ApiUser;
    @Input() level?: ApiLevel;
    @Input() album?: ApiAlbum;
    @Input() newsEntry?: ApiNewsEntry;

    text(): string {
        if (this.user)
            return this.user.username;
        else if (this.level)
            return this.level.name;
        else if (this.album)
            return this.album.name;
        else if (this.newsEntry)
            return this.newsEntry.title;

        return "no data";
    }

    link(): string {
        if (this.user)
            return "/users/" + this.user.username;
        else if (this.level)
            return "/levels/" + this.level.id;
        else if (this.album)
            return "/albums/" + this.album.id
        else if (this.newsEntry)
            return "/news/" + this.newsEntry.id;

        return "";
    }
}
