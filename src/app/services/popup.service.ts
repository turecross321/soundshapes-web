import {EventEmitter, Injectable, Output, Type} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  @Output() onOpenPopup = new EventEmitter<Type<any>>();
  @Output() onClosePopup = new EventEmitter<Type<any>>();


  constructor() {
  }

  openPopup(component: Type<any>) {
    this.onOpenPopup.emit(component);
  }

  closePopup(component: Type<any>) {
    this.onClosePopup.emit(component);
  }
}
