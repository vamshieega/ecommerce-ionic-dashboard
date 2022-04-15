import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES_STR, WEEKDAYS, WEEKS } from 'src/app/core/constants/app-constants';
import { AppData } from 'src/app/shared/services/app-data.service';
import { Discount } from '../../models/discount';

@Component({
  selector: 'app-discount-schedule',
  templateUrl: './discount-schedule.page.html',
  styleUrls: ['./discount-schedule.page.scss'],
})
export class DiscountSchedulePage implements OnInit {


  weekDaysList = WEEKDAYS;
  discountModel = new Discount();
  discuntSchedule: FormGroup;
  couponId: String;
  minuteValues: String = '0,30,59';
  weeks = [...WEEKS];

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.initForm();

    AppData.discountModelSub$.subscribe(async (res) => {
      if (res !== null) {
        this.discountModel = Object.assign(this.discountModel, res);
        this.initForm();
        if (this.discountModel['activeSlots']['category'] === 'weekdays') {
          const weekDaysGrpControls = this.weeks.map(c => new FormControl(c));
          (this.discuntSchedule.get("activeSlots") as FormGroup).addControl('weekdays', this.fb.array(weekDaysGrpControls));
          this.discuntSchedule['controls']['activeSlots']['controls']['weekdays'].setValue(
            JSON.parse(JSON.stringify(await this.setWeekdaysVal(this.discountModel['activeSlots']['weekdays']))), { emit: false });
        }
      }
    })

    AppData.discountModelSub$.subscribe(async (res) => {
      if (res !== null) {
        this.discountModel = res;
        this.couponId = res['couponId']
      }
    })
  }

  // set active slots weekdays
  setWeekdaysVal(weekdays) {
    this.weeks.map((wObj, indI) => {
      weekdays.forEach((sObj) => { if (indI === Number(sObj)) { this.weeks[indI] = true; } });
    });
    return JSON.parse(JSON.stringify(this.weeks));;
  }

  async initForm() {
    this.discuntSchedule = this.fb.group({

      activeSlots: this.fb.group({
        category: [this.discountModel['activeSlots']['category']],
        slots: this.fb.group({
          startTime: [new Date(new Date().setHours(parseInt(this.discountModel['activeSlots']['slots']['startTime'].slice(0, 2)), parseInt(this.discountModel['activeSlots']['slots']['startTime'].slice(2, 4)))).toISOString()],
          endTime: [new Date(new Date().setHours(parseInt(this.discountModel['activeSlots']['slots']['endTime'].slice(0, 2)), parseInt(this.discountModel['activeSlots']['slots']['endTime'].slice(2, 4)))).toISOString()],
        })
      })

    });
  }
  get offerFormGrp() { return this.discuntSchedule.controls; } // getting parent form group control
  get activeSlots() { return this.offerFormGrp.activeSlots['controls'] }

  radioChange(val) {
    // console.log(event);
    console.log(val)

    if (val === 'weekdays') {
      this.addWeekends();
    }
    else {
      (this.discuntSchedule.get("activeSlots") as FormGroup).removeControl('weekdays');
    }
    // this.discuntSchedule.get("activeSlots").valueChanges.subscribe(async (val) => {

    //   if (val !== null) {
    //     console.log(' dscds');
    //     if (val['category'] === 'weekdays') {
    //       this.addWeekends();
    //     }
    //     else {
    //       (this.discuntSchedule.get("activeSlots") as FormGroup).removeControl('weekdays');
    //     }
    //   }
    // });

    // console.log(this.discuntSchedule.value['activeSlots']['category']);
    // if (value.category.value === 'weekdays') {
    //   this.addWeekends();
    // } else {
    //   (this.discuntSchedule.get("activeSlots") as FormGroup).removeControl('weekdays');
    // }
    // this.discuntSchedule.get("slots").valueChanges.subscribe(async (val) => {
    //   if (val !== null) {
    //     console.log(val);
    //   }
    // });
  }

  async addWeekends() {
    const weekDaysGrpControls = this.weeks.map(c => new FormControl(c));
    (this.discuntSchedule.get("activeSlots") as FormGroup).addControl('weekdays', this.fb.array(weekDaysGrpControls));
    this.discuntSchedule['controls']['activeSlots']['controls']['weekdays'].setValue(
      JSON.parse(JSON.stringify(await this.setWeekdaysVal([]))), { emit: false });
  }
  dateChange(event) {
    console.log(event);
  }

  submit() {
    console.log(this.discuntSchedule.value)
    AppData.commonDiscountSub$.next(this.discuntSchedule.value);
    if (this.couponId !== "") {
      this.router.navigate([ROUTES_STR.createOffer], { queryParams: { couponId: this.couponId } })
    }
    else {
      this.router.navigate([ROUTES_STR.createOffer]);
    }
  }
}
