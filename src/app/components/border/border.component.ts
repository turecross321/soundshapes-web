import {Component, Input} from '@angular/core';
import {ElementStyle} from "../../types/element-style";

@Component({
    selector: 'app-border',
    templateUrl: './border.component.html',
    styleUrls: []
})
export class BorderComponent {
    @Input() style: ElementStyle = ElementStyle.primary;
    protected readonly ElementStyle = ElementStyle;
}
