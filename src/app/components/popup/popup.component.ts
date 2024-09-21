import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {HorizontalDividerComponent} from "../horizontal-divider/horizontal-divider.component";
import {NgIf} from "@angular/common";
import {faSpinner, faX} from "@fortawesome/free-solid-svg-icons";
import {ClickOutsideDirective} from "../../directives/click-outside.directive";
import {fade} from "../../animations";

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    ButtonComponent,
    FaIconComponent,
    HorizontalDividerComponent,
    NgIf,
    ClickOutsideDirective
  ],
  templateUrl: './popup.component.html',
  animations: [fade]
})
export class PopupComponent {
  @Output() close = new EventEmitter<void>();

  @Input() name: string = "Title";
  @Input() loading: boolean = false;
  timesClickedOutside: number = 0;
  protected readonly faSpinner = faSpinner;
  protected readonly faX = faX;

  clickOutside() {
    // Ignore first click outside, because it's triggered by the click that opens it
    if (this.timesClickedOutside > 0) {
      this.close.emit();
    }

    this.timesClickedOutside++;
  }
}
