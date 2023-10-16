import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: []
})
export class PageComponent {
    @Input() header: string = "Title";
    @Input() loading: boolean = false;
}
