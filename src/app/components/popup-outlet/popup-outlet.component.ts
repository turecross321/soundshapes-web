import {ChangeDetectorRef, Component, InjectionToken, Injector, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {PopupService} from "../../services/popup.service";
import {NgIf} from "@angular/common";
import {fade} from "../../animations";
import {Popup} from "../../types/components/popup";

export const EXTRA_ARGUMENTS_TOKEN = new InjectionToken<{ [key: string]: any }>('EXTRA_ARGUMENTS_TOKEN');

@Component({
  selector: 'app-popup-outlet',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './popup-outlet.component.html',
  animations: [fade]
})
export class PopupOutletComponent {
  @ViewChild('container', {read: ViewContainerRef, static: false}) container!: ViewContainerRef;
  visible: boolean = false;

  constructor(private popup: PopupService, private cdr: ChangeDetectorRef) {
    popup.onOpenPopup.subscribe((request: Popup) => {
      this.visible = true;
      cdr.detectChanges();
      this.addComponent(request);
    });

    popup.onClosePopup.subscribe((component: Type<any>) => {
      this.removeComponent(component);
      if (this.popup.getComponentRefs().length <= 0)
        this.visible = false;
    })
  }

  addComponent(data: Popup) {
    const injector = Injector.create({
      providers: [
        {provide: EXTRA_ARGUMENTS_TOKEN, useValue: data.extraArguments}
      ],
      parent: this.container.injector
    })
    const component = this.container.createComponent(data.component, {injector});
    this.popup.addComponentRef(component);
  }

  removeComponent(componentClass: Type<any>) {
    const component = this.popup.getComponentRefs().find((component) => component.instance instanceof componentClass)!;
    const componentIndex = this.popup.getComponentRefs().indexOf(component);

    this.container.remove(this.container.indexOf(component.hostView));
    this.popup.removeComponentRefAt(componentIndex);
  }
}
