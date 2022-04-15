import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  DAYS_FULL,
  ROUTES_STR,
  SLOT_TIME,
  WEEKDAYS,
} from 'src/app/core/constants/app-constants';
import { AppData } from 'src/app/shared/services/app-data.service';
import { OutletDetails } from '../../model/outlet-details.model';
import { OperationalTimingService } from '../operational-timing/services/operational-timing.service';

@Component({
  selector: 'app-custom-timing',
  templateUrl: './custom-timing.page.html',
  styleUrls: ['./custom-timing.page.scss'],
})
export class CustomTimingPage implements OnInit, OnDestroy {
  operationalForm: any = FormGroup;
  slots: FormArray;
  fullDays = DAYS_FULL;
  submitted = false;
  slotTimeList = SLOT_TIME;
  outletDetailsSubscription: Subscription;
  formInit = false;
  weekDaysList = WEEKDAYS;
  outletModel = new OutletDetails();
  timings = [];
  showAddMore = true;
  selectedDay = 0;
  setTimefor: any;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private operationalTimingService: OperationalTimingService,
    private location: Location,
    private activatedroute: ActivatedRoute
  ) {
    this.activatedroute.queryParams.subscribe((params) => {
      console.log('custom 2', params);

      if (params.page === 'menuItems') {
        this.setTimefor = params.page;
        AppData.singleMenuitemTimeSub$.subscribe((singlemenuTimings) => {
          console.log('singlemenuTimings', singlemenuTimings);
          this.timings = singlemenuTimings
        });
      }
      else if (params.page === 'outlet') {
        this.setTimefor = params.page;
        this.outletDetailsSubscription = AppData.outletDetailsSub$.subscribe(
          (outletsData) => {
            if (outletsData) {
              this.outletModel = Object.assign(this.outletModel, outletsData);
              this.timings = this.outletModel._opHours;
              console.log('custom', this.timings);
              // this.buildForm();
            }
          }
        );
      }
      if (params.idx) {
        this.selectedDay = params.idx;
      }
    });
  }

  ngOnInit() {
    if (this.timings) {
      this.buildForm();
    }
    console.log(this.selectedDay);
    console.log(this.fullDays[0]);
  }

  buildForm() {
    const newTime = this.timings.map((data) => {
      console.log('custom 3', data);
      return this.fb.group({
        operational: [data.operational],
        slots: this.fb.array(this.getArray(data.slots)),
      });
    });
    console.log('newTime  ->', newTime);
    this.operationalForm = this.fb.group({ ...newTime });
    this.formInit = true;
  }

  onSelectDay(day = 0) {
    this.selectedDay = day;
  }

  getArray(slots) {
    return slots.map((slot) => {
      return this.slotsGroup(slot);
    });
  }
  slotsGroup(slot?): FormGroup {
    if (slot && slot.startTime === '0000' && slot.endTime === '2359') {
      return this.fb.group({
        startTime: ['24Hours', [Validators.required]],
        endTime: [''],
      });
    } else {
      return this.fb.group({
        startTime: [slot ? slot.startTime : '', [Validators.required]],
        endTime: [slot ? slot.endTime : '', [Validators.required]],
      });
    }
  }
  onOperationalClose(isOff, index) {
    if (!isOff) {
      const control = this.operationalForm.controls[index]['controls']['slots'];
      control.clear(index);
    } else {
      const control = <FormArray>(
        this.operationalForm.controls[index]['controls']['slots']
      );
      control.push(this.initTimes());
    }
  }

  initTimes(): FormGroup {
    return this.fb.group({
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
    });
  }

  onAddNewHours(): void {
    this.showAddMore = false;
    const control = <FormArray>(
      this.operationalForm.controls[this.selectedDay]['controls']['slots']
    );
    control.push(
      this.fb.group({
        startTime: ['', [Validators.required]],
        endTime: ['', [Validators.required]],
      })
    );
  }
  onChangeTime(obj, indI, indJ) {
    const objControl = obj.controls;
    if (obj.controls.startTime.value === '24Hours') {
      this.showAddMore = false;
      this.operationalForm.controls[indI]['controls']['slots']['controls'][
        indJ
      ]['controls']['endTime'].setValue('2359');
    } else if (
      objControl.startTime.value !== '' &&
      objControl.endTime.value !== ''
    ) {
      this.showAddMore = true;
    } else {
      this.showAddMore = false;
    }
  }
  get operational() {
    return this.operationalForm.get('operational');
  }

  onRemoveHours(indexJ): void {
    const control = <FormArray>(
      this.operationalForm['controls'][this.selectedDay]['controls']['slots']
    );
    if (control.length > 1) {
      control.removeAt(indexJ);
    }
    this.showAddMore = true;
  }

  onOpHoursSubmit(): any {
    this.submitted = true;
    if (this.operationalForm.valid) {
      const formObj = JSON.parse(JSON.stringify(this.operationalForm.value));
      Object.values(formObj).forEach((key) => {
        key['slots'].forEach((val) => {
          if (val['startTime'] === '0001' || val['startTime'] === '24Hours') {
            val['startTime'] = '0000';
          }

          if (val['endTime'] === '' || val['startTime'] === '24Hours') {
            val['endTime'] = '2359';
          }
        });
      });
      this.operationalTimingService.saveCustomTimeData(formObj);
      
      const obj = {}

      if (this.setTimefor === 'menuItems') {
        this.activatedroute.queryParams.subscribe((res) => {
          obj['id'] = res.id
        });
      }
      const navigationExtras: NavigationExtras = { queryParams: obj }
      this.setTimefor === 'menuItems' ? this.route.navigate([ROUTES_STR.newItem], navigationExtras) : this.route.navigate([ROUTES_STR.createOutlet]);
    }
  }

  onNavigateCustomTiming() {
    this.location.back();
  }

  generateOpDetails() {
    return this.operationalForm.value;
  }

  ngOnDestroy(): void {
   // AppData.singleMenuitemTimeSub$.next([]);
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.outletDetailsSubscription)
      this.outletDetailsSubscription.unsubscribe();
  }
}
