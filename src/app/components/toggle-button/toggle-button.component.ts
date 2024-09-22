import {Component, Input} from '@angular/core';
import {faPoo} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent, IconDefinition} from "@fortawesome/angular-fontawesome";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-toggle-button',
  standalone: true,
  imports: [
    FaIconComponent,
    NgClass
  ],
  templateUrl: './toggle-button.component.html',
})
export class ToggleButtonComponent {
  @Input() value: boolean = false;
  @Input() icon: IconDefinition = faPoo;
  @Input() ariaLabel: string = null!;

}
