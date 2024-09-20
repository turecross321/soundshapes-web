import {Component} from '@angular/core';
import {HorizontalDividerComponent} from "../horizontal-divider/horizontal-divider.component";

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    HorizontalDividerComponent
  ],
  templateUrl: './page.component.html',
})
export class PageComponent {
}
