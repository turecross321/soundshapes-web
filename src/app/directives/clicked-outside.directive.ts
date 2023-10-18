import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
    selector: '[appClickedOutside]'
})
export class ClickedOutsideDirective {

    @Output() public clickedOutside = new EventEmitter();
    clicks: number = 0;

    constructor(private el: ElementRef) {
    }

    @HostListener('document:click', ['$event.target'])
    public onClick(target: any) {
        // ignore first click, this is because it will otherwise count the click that was done in order to open the menu
        if (this.clicks == 0) {
            this.clicks += 1;
            return;
        }

        this.clicks += 1;

        const clickedInside = this.el.nativeElement.contains(target);
        if (!clickedInside) {
            this.clickedOutside.emit(target);
        }
    }

}