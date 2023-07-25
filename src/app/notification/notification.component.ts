import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/notification.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { NotificationData } from '../shared/notification-data.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('notificationAnim', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(5px)'
        }),
        animate('150ms 125ms ease-out')
      ]),
      transition(':leave', [
        animate(125, style({
          opacity: 0,
          transform: 'scale(0.85)'
        }))
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit {
  
  notification: NotificationData[] | null = null

  timeout: any
  
  constructor(private notificationService: NotificationService) {}
  
  ngOnInit(): void {
    this.notificationService.notifications.subscribe((notification: NotificationData) => {
      this.notification = Array(notification)

      clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        this.notification = null
      }, notification.duration)
    })
  }

}
