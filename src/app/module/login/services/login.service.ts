/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable } from '@angular/core';
import { ApiRequestService } from 'src/app/shared/services/api-request.service';
import { AppData } from 'src/app/shared/services/app-data.service';
import { FcmMessagingService } from 'src/app/shared/services/fcm-messaging.service';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private apiService: ApiRequestService,
    private fcmMessagingService: FcmMessagingService
  ) { }

  login(loginObj) {
    return new Promise((resolve, reject) => {
      this.apiService.post('login', loginObj).then((res) => {
        const obj = {
          changeIndex: true,
          outletList: res['body']['data']['userData']['permissions']['outlets'],
        };
        AppData.outletListSub$.next(obj);
        AppData.token$.next(res['headers'].get('x-access-token'));
        AppData.userDataSub$.next(res['body']['data']['userData']);
        AppData.restDataSub$.next(res['body']['data']['restData']);
        AppData.isAuthenticated = true;
        if (AppData.outletList && AppData.outletList.length > 0) {
          AppData.outletIdSub$.next(AppData.outletList[0]['outletId']);
          this.getOutletDetails();
        }
        resolve(res);
        this.fcmMessagingService.sendFCMTokenToServer();
      }).catch((err) => {
        reject(err);
      });
    });
  }

  getOutletDetails() {
    this.apiService
      .get('outletDetails', '?outletId=' + AppData.outletId)
      .then((res) => {
        const responseData = res['body']['data'];
        AppData.outletDetailsSub$.next(responseData);
      });
  }
}
