/* eslint-disable @typescript-eslint/member-ordering */

import { Injectable } from '@angular/core';
import { ApiRequestService } from 'src/app/shared/services/api-request.service';
import { BehaviorSubject } from 'rxjs';
import { AppData } from 'src/app/shared/services/app-data.service';
@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private newUser = new BehaviorSubject<any>(this.sendNewUserData);

  constructor(private apiRequestService: ApiRequestService) { }

  getOtp(reqBody) {
    return this.apiRequestService.post('sendOtp', reqBody);
  }
  signup(reqBody) {
    return this.apiRequestService.post('signup', reqBody);
  }
  sendNewUserData(user: any) {
    this.newUser.next(user);
  }
  saveAccountDataInLocal(responseData) {
    AppData.token$.next(responseData.token);
    AppData.userDataSub$.next(responseData['user']);
    AppData.restDataSub$.next(responseData['restData']);
    const obj = {
      changeIndex: true,
      outletList: responseData['user']['permissions']['outlets']
    };
    AppData.outletListSub$.next(obj);
    AppData.isAuthenticated = true;
    if (AppData.outletList && AppData.outletList.length > 0) {
      AppData.outletIdSub$.next(AppData.outletList[0]['outletId']);
    }
  }
  getNewUserData() {
    return this.newUser.asObservable();
  }

  storeNameValidation(storeName) {
    return this.apiRequestService.get('storeNameValidation', `?storeName=${storeName}`);
  }
}
