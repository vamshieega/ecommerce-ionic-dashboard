import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  private verifiedData = new BehaviorSubject<any>(this.sendVerifiedData);

  constructor() { }
  //sending otp data
  sendVerifiedData(user: any) {
    this.verifiedData.next(user);
  }
  getVerifiedData() {
    return this.verifiedData.asObservable();
  }
}
