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
    animate('1000ms',  style({ opacity: 1} ))
  ])

])
