import {Component, Input} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent {
  @Input() name: string = "Title";
}
