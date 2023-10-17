import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-code-block',
    templateUrl: './code-block.component.html',
    styleUrls: []
})
export class CodeBlockComponent {
    @Input() text: string = "not_set";
}
