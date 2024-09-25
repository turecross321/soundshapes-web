import {EventEmitter, Injectable, Output, Type} from '@angular/core';
import {Popup} from "../types/components/popup";

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  @Output() onOpenPopup = new EventEmitter<Popup>();
  @Output() onClosePopup = new EventEmitter<Type<any>>();


  constructor() {
  }

  openPopup(type: Type<any>, extraArguments: { [key: string]: any } = []) {
    this.onOpenPopup.emit({component: type, extraArguments: extraArguments});
  }

  closePopup(component: Type<any>) {
    this.onClosePopup.emit(component);
  }
}
