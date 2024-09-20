import {Component, Input} from '@angular/core';
import {HorizontalDividerComponent} from "../horizontal-divider/horizontal-divider.component";
import {PageComponent} from "../page/page.component";
import {PageContentComponent} from "../page-content/page-content.component";
import {PageHeaderComponent} from "../page-header/page-header.component";

@Component({
  selector: 'app-generic-page',
  standalone: true,
  imports: [
    HorizontalDividerComponent,
    PageComponent,
    PageContentComponent,
    PageHeaderComponent
  ],
  templateUrl: './generic-page.component.html',
})
export class GenericPageComponent {
  @Input() name: string = "Title";
}
