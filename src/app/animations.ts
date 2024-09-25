import {animate, group, query, style, transition, trigger} from "@angular/animations";

export const slideFromTop = trigger('slideFromTop', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateY(-12px)'}),
    animate('150ms ease', style({opacity: 1, transform: 'translateY(0)'})),
  ]),
  transition(':leave', [
    animate('150ms ease', style({opacity: 0, transform: 'translateY(-12px)'})),
  ]),
]);

export const slideFromLeft = trigger('slideFromLeft', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateX(-12px)'}),
    animate('150ms ease-out', style({opacity: 1, transform: 'translateX(0)'})),
  ]),
  transition(':leave', [
    animate('150ms ease-in', style({opacity: 0, transform: 'translateX(-12px)'})),
  ]),
]);

export const slideToRight = trigger('slideToRight', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateX(-12px)'}),
    animate('500ms ease-out', style({opacity: 1, transform: 'translateX(0)'})),
  ]),
  transition(':leave', [
    animate('150ms ease-in', style({opacity: 0, transform: 'translateX(12px)'})),
  ]),
]);

export const toast = trigger('toast', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateX(100%)'}),
    animate('300ms ease-out', style({opacity: 1, transform: 'translateX(0)'})),
  ]),
  transition(':leave', [
    animate('300ms ease-in', style({opacity: 0, transform: 'translateX(100%)'})),
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

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({opacity: 0}),
    animate('150ms ease-in', style({opacity: 1})),
  ]),
])

export const routeTransition = trigger('routeTransition', [
  transition('* <=> *', [
    group([
      // Leaving element fades out and moves up
      query(':leave', [
        style({opacity: 1, position: 'fixed', width: '100%'}),
        animate('150ms ease-in-out', style({opacity: 0}))
      ], {optional: true}),
      // Entering element fades in
      query(':enter', [
        style({opacity: 0}),
        animate('150ms ease', style({opacity: 1}))
      ], {optional: true})
    ])
  ])
]);
