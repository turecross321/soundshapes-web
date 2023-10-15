import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: []
})
export class TooltipComponent {
    @Input() text = "Not set";
}
