import {
  trigger,
  state,
  style,
  animate,
  transition,
  group,
  query,
  stagger,
  keyframes,
  animateChild
} from '@angular/animations';

export const notesLoadAnimation = trigger('listAnimation', [
  state('noLoad', style({opacity: 0, height: 0, padding: 0,  visibility: 'hidden'})),
  transition('* => load', [
    animate('300ms ease-in', style({ height: '*', padding: '*',  visibility: 'visible'} )),
    animate('900ms',  style({ opacity: 1} ))
  ])

]);

export const homeSlideInAnimation = trigger('slideIn', [
  state('void', style({opacity: 0,  transform: 'translateX(-100%) rotate(-120deg)'})),

  transition(':enter', [
    animate(900)
  ])
]);

export const visibilityAnimation = trigger('visibilityAnimation', [
  state('true' , style({ opacity: 1, transform: 'scale(1.0)' })),
  state('false', style({ opacity: 0, transform: 'scale(0.0)'  })),
  transition('true => false', animate('300ms')),
  transition('false => true', animate('500ms')),
]);

