import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ApiRequestService } from 'src/app/shared/services/api-request.service';
@Injectable({
  providedIn: 'root',
})
export class OperationalTimingService {
  public operationalFrom = new BehaviorSubject(null);

  constructor(private apiService: ApiRequestService) {}

  opHoursSubmit(reqData) {
    return this.apiService.post('outlet', reqData);
  }
  saveCustomTimeData(data) {
    this.operationalFrom.next(data);
  }
}
