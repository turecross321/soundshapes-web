import {Component} from '@angular/core';
import {HorizontalDividerComponent} from "../../components/horizontal-divider/horizontal-divider.component";
import {PageComponent} from "../../components/page/page.component";
import {PageHeaderComponent} from "../../components/page-header/page-header.component";
import {PageContentComponent} from "../../components/page-content/page-content.component";
import {GenericPageComponent} from "../../components/generic-page/generic-page.component";
import {faGhost} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [
    HorizontalDividerComponent,
    PageComponent,
    PageHeaderComponent,
    PageContentComponent,
    GenericPageComponent
  ],
  templateUrl: './not-found-page.component.html',
})
export class NotFoundPageComponent {

  protected readonly faGhost = faGhost;
}
