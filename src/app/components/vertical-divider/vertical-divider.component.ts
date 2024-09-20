import {Component, Input} from '@angular/core';
import {ColorType} from "../../types/component-enums/color.type";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-vertical-divider',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './vertical-divider.component.html',
})
export class VerticalDividerComponent {
  @Input() color: ColorType = ColorType.Content;
  protected readonly ColorType = ColorType;
}
