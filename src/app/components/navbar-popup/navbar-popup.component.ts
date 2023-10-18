import {Component, Input} from '@angular/core';
import {Side} from "../../types/side";

@Component({
    selector: 'app-navbar-popup',
    templateUrl: './navbar-popup.component.html',
    styleUrls: []
})
export class NavbarPopupComponent {
    @Input() side: Side = Side.Left;
    protected readonly Side = Side;
}
