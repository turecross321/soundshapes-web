import {ComponentRef, EventEmitter, Injectable, Output, Type} from '@angular/core';
import {Popup} from "../types/components/popup";

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  @Output() onOpenPopup = new EventEmitter<Popup>();
  @Output() onClosePopup = new EventEmitter<Type<any>>();
  @Output() onAddedComponentRef = new EventEmitter<ComponentRef<any>>();

  private componentRefs: ComponentRef<any>[] = []


  constructor() {
  }

  addComponentRef(ref: ComponentRef<any>) {
    this.componentRefs.push(ref);
    this.onAddedComponentRef.emit(ref);
  }

  removeComponentRefAt(index: number) {
    this.componentRefs.splice(index, 1);
  }

  getComponentRefs() {
    return this.componentRefs;
  }

  openPopup(type: Type<any>, extraArguments: {
    [key: string]: any
  } = []) {
    this.onOpenPopup.emit({component: type, extraArguments: extraArguments});
  }

  closePopup(component: Type<any>) {
    this.onClosePopup.emit(component);
  }
}
