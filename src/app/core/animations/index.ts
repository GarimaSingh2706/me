import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  animateChild,
} from '@angular/animations';

/** Fade + rise — used for scroll reveals */
export const fadeRise = trigger('fadeRise', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(40px)' }),
    animate(
      '0.7s cubic-bezier(0.16, 1, 0.3, 1)',
      style({ opacity: 1, transform: 'translateY(0)' })
    ),
  ]),
]);

/** Stagger container — children with @fadeItem animate in sequence */
export const staggerContainer = trigger('staggerContainer', [
  transition(':enter', [
    query('@fadeItem', stagger(80, [animateChild()])),
  ]),
]);

export const fadeItem = trigger('fadeItem', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(30px)' }),
    animate(
      '0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      style({ opacity: 1, transform: 'translateY(0)' })
    ),
  ]),
]);

/** Slide in from left */
export const slideInLeft = trigger('slideInLeft', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-50px)' }),
    animate(
      '0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
  ]),
]);

/** Slide in from right */
export const slideInRight = trigger('slideInRight', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(50px)' }),
    animate(
      '0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
  ]),
]);

/** Scale in */
export const scaleIn = trigger('scaleIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.9)' }),
    animate(
      '0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      style({ opacity: 1, transform: 'scale(1)' })
    ),
  ]),
]);

/** Page route transition */
export const pageTransition = trigger('pageTransition', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate(
          '0.3s ease',
          style({ opacity: 0, transform: 'translateY(-20px)' })
        ),
      ],
      { optional: true }
    ),
  ]),
]);

/** Loading bar shimmer */
export const shimmer = trigger('shimmer', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.4s ease', style({ opacity: 1 })),
  ]),
]);
