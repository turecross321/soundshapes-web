import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {HorizontalDividerComponent} from "../horizontal-divider/horizontal-divider.component";
import {NgIf} from "@angular/common";
import {faSpinner, faX} from "@fortawesome/free-solid-svg-icons";
import {ClickOutsideDirective} from "../../directives/click-outside.directive";
import {fade, fadeIn} from "../../animations";

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
  animations: [fade, fadeIn]
})
export class PopupComponent implements AfterViewInit {
  @Output() close = new EventEmitter<void>();

  @Input() name: string = "Title";
  @Input() loading: boolean = false;
  protected readonly faSpinner = faSpinner;
  protected readonly faX = faX;

  private isInitialized = false; // Flag to indicate initialization

  ngAfterViewInit() {
    this.isInitialized = true; // Set the flag when the component is fully initialized
  }

  clickOutside() {
    if (this.isInitialized) {
      this.close.emit();
    }
  }
}
