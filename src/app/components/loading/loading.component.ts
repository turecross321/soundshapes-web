import {Component} from '@angular/core';
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: []
})
export class LoadingComponent {
    faSpinner: IconDefinition = faSpinner;
}
