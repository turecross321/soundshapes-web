import {Component} from '@angular/core';
import {GenericPageComponent} from "../../components/generic-page/generic-page.component";

@Component({
  selector: 'app-api-documentation-page',
  standalone: true,
  imports: [
    GenericPageComponent
  ],
  templateUrl: './api-documentation-page.component.html',
})
export class ApiDocumentationPageComponent {

}
