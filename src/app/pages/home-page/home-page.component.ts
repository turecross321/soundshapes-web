import {Component} from '@angular/core';
import {GenericPageComponent} from "../../components/generic-page/generic-page.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    GenericPageComponent
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

}
