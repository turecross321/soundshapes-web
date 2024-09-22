import {Component, Input} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-border',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './border.component.html',
})
export class BorderComponent {
  @Input() loading: boolean = false;
  protected readonly faSpinner = faSpinner;
}
