import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {FaIconComponent, IconDefinition} from "@fortawesome/angular-fontawesome";
import {faEye, faEyeSlash, faPoo} from "@fortawesome/free-solid-svg-icons";
import {NgClass, NgIf} from "@angular/common";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {InputContentType} from "../../types/component-enums/input-content.type";
import {InputStyle} from "../../types/component-enums/input.type";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    FaIconComponent,
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() fControl: FormControl = null!;
  @Input() icon: IconDefinition = faPoo;
  @Input() placeholder: string = "Placeholder";
  @Input() type: InputContentType = InputContentType.Text
  @Input() style: InputStyle = InputStyle.Normal;
  @Input() value: string = "";
  showPassword: boolean = false;
  @ViewChild('inputField') inputField!: ElementRef;
  protected readonly InputContentType = InputContentType;
  protected readonly faEye = faEye;
  protected readonly faEyeSlash = faEyeSlash;
  protected readonly InputStyle = InputStyle;

  focusInput() {
    const inputElement = this.inputField.nativeElement;
    inputElement.focus();
  }

  characterLimit(): number | null {
    switch (this.type) {
      case InputContentType.Code:
        return 6;
      case InputContentType.Email:
        return 320;
      default:
        return null;
    }
  }

  allowedCharactersPattern(): RegExp {
    switch (this.type) {
      case InputContentType.Code:
        return /\d/;
      case InputContentType.Email:
        return /[a-zA-Z0-9._%+-@]/
      default:
        return /(.*?)/;
    }
  }

  getInputTypeText() {
    switch (this.type) {
      case InputContentType.Email:
        return "email"
      case InputContentType.Password:
        return this.showPassword ? "text" : "password";
      case InputContentType.Code:
      case InputContentType.Text:
      default:
        return "text";
    }
  }

  setShowPassword(value: boolean) {
    this.showPassword = value;
  }

  onInput(event: any) {
    let input = event.target.value;
    const limit: number | null = this.characterLimit();

    if (limit && input.length > limit) {
      input = input.substring(0, limit); // remove the new character if it exceeds the character length
    }

    // Only keep allowed characters
    event.target.value = input.replace(/[^]/g, (char: string) => this.allowedCharactersPattern().test(char) ? char : '');
  }
}



