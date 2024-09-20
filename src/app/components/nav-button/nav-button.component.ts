import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {FaIconComponent, IconDefinition} from "@fortawesome/angular-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {ButtonType} from "../../types/component-enums/button.type";

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [
    NgClass,
    FaIconComponent,
    NgIf
  ],
  templateUrl: './nav-button.component.html',
})
export class NavButtonComponent {
  @Input() label: string = null!;
  @Input() icon: IconDefinition = null!;
  @Input() type: ButtonType = ButtonType.Button;
  @Input() loading: boolean = false;
  protected readonly faSpinner = faSpinner;
}

