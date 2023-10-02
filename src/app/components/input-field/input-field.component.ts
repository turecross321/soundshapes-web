import {Component, Input} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faEye, faEyeSlash, faPoo} from "@fortawesome/free-solid-svg-icons";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: []
})
export class InputFieldComponent {
  @Input() id: string = "";
  @Input() placeholder: string = "No Placeholder Set!";
  @Input() faIcon: IconDefinition = faPoo;
  @Input() type: InputType = InputType.Text;
  @Input() fControlName: string = "";
  @Input() fGroup!: FormGroup;

  typeString: string = "";
  toggleVisibilityIcon: IconDefinition = faEye;
  visible: boolean = true;
  toggleable: boolean = false;

  ngOnInit() {

    switch (this.type) {
      case InputType.Text:
        this.setVisibility(true);
        this.toggleable = false;
        break;
      case InputType.Password:
        this.setVisibility(false);
        this.toggleable = true;
        break;
    }

  }

  toggleVisibility() {
    this.setVisibility(!this.visible);
  }

  setVisibility(visibility: boolean) {
    if (visibility) {
      this.typeString = "text";
      this.toggleVisibilityIcon = faEyeSlash;
      this.visible = true;
    } else {
      this.typeString = "password";
      this.toggleVisibilityIcon = faEye;
      this.visible = false;
    }
  }
}

export enum InputType {
  Text = 0,
  Password = 1
}
