import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiRequestService } from 'src/app/shared/services/api-request.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private apiService: ApiRequestService) { }

  showRevenueChartSub$ = new BehaviorSubject(false);
  showOperationalChartSub$ = new BehaviorSubject(false);

  saveRevenueChart(val: boolean) {
    this.showRevenueChartSub$.next(val);
  }

  saveOperationalChart(val: boolean) {
    this.showOperationalChartSub$.next(val);
  }

  getReportsdata(outletId, startDate, endDate) {
    return this.apiService.get('getReport', `?outletId=${outletId}&startDate=${startDate}&endDate=${endDate}`);
  }
}
