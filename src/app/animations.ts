import {animate, style, transition, trigger} from "@angular/animations";

export const slideFromTop = trigger('slideFromTop', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateY(-12px)'}),
    animate('150ms ease-in', style({opacity: 1, transform: 'translateY(0)'})),
  ]),
  transition(':leave', [
    animate('150ms ease-out', style({opacity: 0, transform: 'translateY(-12px)'})),
  ]),
]);

export const slideFromLeft = trigger('slideFromLeft', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateX(-12px)'}),
    animate('150ms ease-in', style({opacity: 1, transform: 'translateX(0)'})),
  ]),
  transition(':leave', [
    animate('150ms ease-out', style({opacity: 0, transform: 'translateX(-12px)'})),
  ]),
]);

export const slideToRight = trigger('slideToRight', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateX(-12px)'}),
    animate('500ms ease-in', style({opacity: 1, transform: 'translateX(0)'})),
  ]),
  transition(':leave', [
    animate('500ms ease-out', style({opacity: 0, transform: 'translateX(12px)'})),
  ]),
]);

export const fade = trigger('fade', [
  transition(':enter', [
    style({opacity: 0}),
    animate('150ms ease-in', style({opacity: 1})),
  ]),
  transition(':leave', [
    animate('150ms ease-out', style({opacity: 0})),
  ]),
])
