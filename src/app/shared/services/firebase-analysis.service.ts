import { Injectable } from '@angular/core';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAnalysisService {

  constructor(public firebaseAnalytics: FirebaseAnalytics,
  ) {
  }

  logEvent(eventName, data) {
    console.log('event -->',eventName,'data-->',data)
    this.firebaseAnalytics.logEvent(eventName, data)
      .then((res: any) => console.log('FB analysis -->',res))
      .catch((error: any) => console.error('FB analysis Error -->',error));
  }
}
