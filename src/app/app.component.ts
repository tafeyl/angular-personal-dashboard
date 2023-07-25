import { Component, OnInit } from '@angular/core';
import { UnsplashService } from 'src/app/shared/unsplash.service';
import { RouterOutlet } from '@angular/router';
import { transition, trigger, style, animate, query, group } from '@angular/animations';
import { Observable, map, timer } from 'rxjs';

const baseStyles = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnim', [
      transition(':increment', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'translateX(-100px)'
            }))
          ], { optional: true }),
          
          query(':enter', [
            style({
              position: 'absolute',
              left: '100%',
              transform: 'translateX(100px)',
              opacity: 0
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ], { optional: true })
        ])
      ]),

      transition(':decrement', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'translateX(100px)'
            }))
          ], { optional: true }),
          
          query(':enter', [
            style({
              position: 'absolute',
              left: '-100%',
              transform: 'translateX(-100px)',
              opacity: 0
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ], { optional: true })
        ])
      ]),

      transition('* => secondary', [
        style({
          position: 'relative',
        }),

        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'scale(0.8)'
            }))
          ], { optional: true }),
          
          query(':enter', [
            style({
              transform: 'scale(1.2)',
              opacity: 0
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ])
      ]),

      transition('secondary => *', [
        style({
          position: 'relative',
        }),

        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'scale(1.25)'
            }))
          ], { optional: true }),
          
          query(':enter', [
            style({
              transform: 'scale(0.8)',
              opacity: 0
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})

export class AppComponent implements OnInit {
  backgroundImageUrl: string = '';
  dateTime!: Observable<Date>

  constructor(private unsplashService: UnsplashService) {}

  ngOnInit() {
    this.getRandomBackgroundImage()

    this.dateTime = timer(0, 1000).pipe(
      map(() => {
        return new Date()
      })
    )
  }

  getRandomBackgroundImage() {
    this.unsplashService.getRandomImage()
      .then(imageUrl => {
        this.backgroundImageUrl = imageUrl
        document.documentElement.style.setProperty('--background-image-url', `url('${imageUrl}')`)
      })
      .catch(error => {
        console.error('Error fetching random image:', error)
      });
  }

  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      const tab = outlet.activatedRouteData['tab']
      if (!tab) return 'secondary'
      return tab
    }
  }
}
