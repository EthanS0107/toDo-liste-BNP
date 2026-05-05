import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, query, animate, group } from '@angular/animations';
import { HeaderComponent } from './components/shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(
          ':enter, :leave',
          [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              opacity: 0,
            }),
          ],
          { optional: true },
        ),
        query(':enter', [style({ transform: 'translateY(20px)', opacity: 0 })], { optional: true }),
        group([
          query(
            ':leave',
            [animate('300ms ease-out', style({ transform: 'translateY(-20px)', opacity: 0 }))],
            { optional: true },
          ),
          query(
            ':enter',
            [animate('300ms 150ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))],
            { optional: true },
          ),
        ]),
      ]),
    ]),
  ],
})
export class App {
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }
}
