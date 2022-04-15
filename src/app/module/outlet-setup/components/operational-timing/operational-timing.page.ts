import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  DAYS_HALF,
  ROUTES_STR,
  SLOT_TIME,
} from 'src/app/core/constants/app-constants';
import { AppData } from 'src/app/shared/services/app-data.service';
import { OperationalTimingService } from './services/operational-timing.service';

@Component({
  selector: 'app-operational-timing',
  templateUrl: './operational-timing.page.html',
  styleUrls: ['./operational-timing.page.scss'],
})
export class OperationalTimingPage implements OnInit, OnDestroy {
  @Input() timings = [];
  @Input() setTimeFor;
  slots: FormArray;
  days = DAYS_HALF;
  slotTimeList = SLOT_TIME;
  submitted = false;
  operatonalFormSubscription = new Subscription();

  constructor(
    private route: Router,
    private operationalTimingService: OperationalTimingService,
    private activatedroute: ActivatedRoute
  ) {
    this.operatonalFormSubscription =
      this.operationalTimingService.operationalFrom.subscribe((message) => {
        if (message) {
          this.timings = Object.assign(this.timings, message);
          AppData.singleMenuitemTimeSub$.next(this.timings);
        }
      });
  }

  ngOnInit() {
    AppData.singleMenuitemTimeSub$.next(this.timings);
  }
  getSlots(key) {
    const time = this.slotTimeList.find((data) => data.key === key);
    return time.value;
  }

  onOpHoursSubmit(): any {
    this.submitted = true;
    return this.timings;
  }

  onNavigateCustomTiming() {
    console.log('setTimeFor', this.setTimeFor);
    const obj = {
      page: this.setTimeFor
    }
    if (this.setTimeFor === 'menuItems') {
      this.activatedroute.queryParams.subscribe((res) => {
        obj['id'] = res.id
        console.log('params', res);
      });
    }
    const navigationExtras: NavigationExtras = { queryParams: obj }
    this.route.navigate([ROUTES_STR.customTiming], navigationExtras);
  }

  ngOnDestroy(): void {
    if (this.operatonalFormSubscription)
      this.operatonalFormSubscription.unsubscribe();
  }
}
