import {Component, Input} from '@angular/core';
import {FaIconComponent, IconDefinition} from "@fortawesome/angular-fontawesome";
import {faPoo, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {NgClass, NgIf} from "@angular/common";
import {ButtonType} from "../../types/component-enums/button.type";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    FaIconComponent,
    NgIf,
    NgClass
  ],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() text: string = "Not set";
  @Input() icon: IconDefinition = faPoo;
  @Input() loading: boolean = false;
  @Input() type: ButtonType = ButtonType.Button;
  protected readonly faSpinner = faSpinner;
}
