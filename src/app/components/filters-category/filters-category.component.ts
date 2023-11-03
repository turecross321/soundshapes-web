import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-filters-category',
    templateUrl: './filters-category.component.html'
})
export class FiltersCategoryComponent {
    @Input() label: string = "NOT SET";
}
