import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiRequestService } from 'src/app/shared/services/api-request.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryConfigService {

  deliveryServiceSub$ = new Subject();
  deliveryChargesSub$ = new Subject();
  deliveryRangesSub$ = new Subject();
  deliveryRadiusSub$ = new Subject();

  constructor(private apiService: ApiRequestService) { }

  saveDeliveryService(data) {
    this.deliveryServiceSub$.next(data);
  }

  saveDeliveryCharges(data) {
    this.deliveryChargesSub$.next(data);
  }

  saveDeliveryRanges(data) {
    this.deliveryRangesSub$.next(data);
  }

  saveDeliveryRadius(data) {
    this.deliveryRadiusSub$.next(data);
  }

  saveSetupDetails(setupData) {
    return this.apiService.post('setupDetails', setupData);
  }
}
