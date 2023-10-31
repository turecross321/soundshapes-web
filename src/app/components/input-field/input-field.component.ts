import {Component, Input, OnInit} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {FormGroup} from "@angular/forms";
import {faEye, faEyeSlash, faPoo} from "@fortawesome/free-solid-svg-icons";
import {ElementStyle} from "../../types/element-style";

@Component({
    selector: 'app-input-field',
    templateUrl: './input-field.component.html',
    styleUrls: []
})
export class InputFieldComponent implements OnInit {
    @Input() id: string = "";
    @Input() placeholder: string = "No Placeholder Set!";
    @Input() faIcon: IconDefinition = faPoo;
    @Input() type: InputType = InputType.Text;
    @Input() fGroup!: FormGroup;
    @Input() style: ElementStyle = ElementStyle.primary;
    @Input() readOnly: boolean = false;
    typeString: string = "";
    visible: boolean = true;
    toggleable: boolean = false;
    faEye: IconDefinition = faEye;
    faEyeSlash: IconDefinition = faEyeSlash;
    protected readonly Input = Input;
    protected readonly InputStyle = ElementStyle;

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
            this.visible = true;
        } else {
            this.typeString = "password";
            this.visible = false;
        }
    }
}

export enum InputType {
    Text = 0,
    Password = 1
}
