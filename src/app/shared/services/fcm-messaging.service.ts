import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { Subject } from 'rxjs';
import { FOREGROUND_MSG, ORDER_STATUS, ROUTES_STR } from 'src/app/core/constants/app-constants';
import { StorageService } from 'src/app/core/services/storage.service';
import { OrderService } from 'src/app/module/orders/services/order.service';
import { ApiRequestService } from './api-request.service';
import { AppData } from './app-data.service';
import { AudioService } from './audio.service';
@Injectable({
  providedIn: 'root',
})
export class FcmMessagingService {
  outletIds = [];
  constructor(
    private apiRequestService: ApiRequestService,
    private fcm: FCM,
    private audioService: AudioService,
    private localnotifications: LocalNotifications,
    private ngZone: NgZone,
    private router: Router,
    private orderService: OrderService
  ) { }

  getFCMToken() {
    this.fcm.createNotificationChannel({
      id: 'orderNotification',
      name: 'orderNotification',
      description: 'Notification Channel for Orders',
      // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
      importance: 'high',
      sound: 'order_notif',
    });
    this.fcm.getToken().then((token) => {
      console.log('fcm Token', token);
      AppData.fcmTokenSub$.next(token);
    }).then((res) => { }).catch((err) => { });
  }

  async tokenSubscribe() {
    await this.getFCMToken();
  }

  async sendFCMTokenToServer() {
    console.log('sendFCMTokenToServer  -->');
    AppData.outletListSub$.subscribe((data) => {
      this.outletIds = data.outletList.map((item) => item.outletId);
      const outletIds = this.outletIds;
      const body = {
        token: AppData.fcmToken,
        outletIds,
        action: 'subscribe',
      };
      this.apiRequestService.post('newOrderSubscription', body);
    });
  }

  componentMethodCallSource$ = new Subject();

  onNotifiction() {
    this.fcm.onNotification().subscribe((payLoad) => {
      console.log('fcm services notif chanfge', payLoad);
      if (payLoad['status'] === 'acceptanceWait') {
        if (payLoad['wasTapped']) {
          console.log('Received in background orders -->');
          AppData.notificationSub$.next('orderReceived');
          this.componentMethodCallSource$.next(payLoad);
          this.ngZone.run(() => this.router.navigate([ROUTES_STR.orders]));
          this.orderService.orderStatusListModelKeySubject$.next('acceptanceWait');
          this.audioService.stopNotificationSound();
        } else {
          console.log('Received in foreground');
          this.audioService.playNotification();
          setTimeout(() => {
            this.audioService.stopNotificationSound();
          }, 3000);
          this.localnotifications.schedule({
            title: 'New Order',
            text: FOREGROUND_MSG,
          });
          this.localnotifications.on('click').subscribe(notification => {
            this.ngZone.run(() => this.router.navigate([ROUTES_STR.orders]));
            AppData.notificationSub$.next('orderReceived');
            this.orderService.orderStatusListModelKeySubject$.next('acceptanceWait');
            this.audioService.stopNotificationSound();
          });
        }
      }
    });
  }

}
