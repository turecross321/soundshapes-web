import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCheck, faMinus, faX} from "@fortawesome/free-solid-svg-icons";
import {ToggleButtonComponent} from "../toggle-button/toggle-button.component";

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [
    FaIconComponent,
    ToggleButtonComponent
  ],
  templateUrl: './toggle.component.html',
})
export class ToggleComponent {
  @Input() value: boolean | null = true;
  @Input() nullable: boolean = false;
  @Output() change = new EventEmitter<boolean | null>();
  protected readonly faCheck = faCheck;
  protected readonly faX = faX;
  protected readonly faMinus = faMinus;

  setState(value: boolean | null) {
    this.value = value;
    this.change.emit(value);
  }
}
