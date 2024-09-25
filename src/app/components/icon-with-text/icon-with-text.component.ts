import {Component, Input} from '@angular/core';
import {FaIconComponent, IconDefinition} from "@fortawesome/angular-fontawesome";
import {faPoo} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-icon-with-text',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './icon-with-text.component.html',
})
export class IconWithTextComponent {
  @Input() icon: IconDefinition = faPoo
  @Input() text: string = "yep";
}
