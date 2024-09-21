import {ChangeDetectorRef, Component, ComponentRef, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {PopupService} from "../../services/popup.service";
import {NgIf} from "@angular/common";
import {fade} from "../../animations";

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
  components: ComponentRef<any>[] = [];
  visible: boolean = false;

  constructor(private popup: PopupService, private cdr: ChangeDetectorRef) {
    popup.onOpenPopup.subscribe((componentClass: Type<any>) => {
      this.visible = true;
      cdr.detectChanges();
      this.addComponent(componentClass);
    });

    popup.onClosePopup.subscribe((componentClass: Type<any>) => {
      this.removeComponent(componentClass);
      if (this.components.length <= 0)
        this.visible = false;
    })
  }

  addComponent(componentClass: Type<any>) {
    const component = this.container.createComponent(componentClass);
    this.components.push(component);
  }

  removeComponent(componentClass: Type<any>) {
    const component = this.components.find((component) => component.instance instanceof componentClass)!;
    const componentIndex = this.components.indexOf(component);

    this.container.remove(this.container.indexOf(component.hostView));
    this.components.splice(componentIndex, 1);
  }
}
