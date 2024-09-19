import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";
import {FaIconComponent, IconDefinition} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [
    NgClass,
    FaIconComponent
  ],
  templateUrl: './nav-button.component.html',
})
export class NavButtonComponent {
  @Input() label: string = null!;
  @Input() icon: IconDefinition = null!;
}
