import { Injectable } from '@angular/core';
import { outletLetIsOff } from '../utils/common-functions';
import { ApiRequestService } from './api-request.service';
import { AppData } from './app-data.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private apiService: ApiRequestService) { }
  onlyNumberAllow(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
      return false;
    }
    return true;
  }

  isOutletOnOff() {
    return this.apiService.get('outletList').then((res) => {
      console.log(res);
      AppData.outletList = res['body']['data'];
      if(AppData.outletList){
        return outletLetIsOff();
      }
    });
  }

}
