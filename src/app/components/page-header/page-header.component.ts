import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [],
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent {
  @Input() name: string = "Title";
}
