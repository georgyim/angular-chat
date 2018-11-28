import {
  animate, AnimationTriggerMetadata,
  keyframes,
  style,
  transition,
  trigger
} from '@angular/animations';

export const fadeOffAnimation: AnimationTriggerMetadata =
  trigger('fadeOffAnimation', [
    transition('* => void', animate('500ms ease-in', style({
      opacity: 0,
      transform: 'translateX(-155px)',
    }))),
    transition('void => *', animate('500ms ease-in', keyframes([
      style({opacity: 0, transform: 'translateY(15px)', offset: 0}),
      style({opacity: .5, transform: 'translateY(7px)', offset: 0.5}),
      style({opacity: 1, transform: 'translateY(0)', offset: 1.0}),
    ]))),
  ]);

