import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SLOT_TIME, WEEKDAYS } from 'src/app/core/constants/app-constants';

@Component({
  selector: 'app-daywise-ophours',
  templateUrl: './daywise-ophours.page.html',
  styleUrls: ['./daywise-ophours.page.scss'],
})
export class DaywiseOphoursPage implements OnInit {
  @Input() timings = [];
  weekdayForm: FormGroup;
  defaultTime = [{ startTime: '0000', endTime: '2359' }];
  weekDaysList = WEEKDAYS;
  showAddMore = true;
  slotTimeList = SLOT_TIME;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const slotAvailable = this.timings.some((itm) => itm.slots.length > 0);
    if (this.timings && slotAvailable) {
      this.weekdayForm = this.fb.group({
        weekdays: new FormArray(
          this.weekDaysList.map((c, index) => {
            return new FormControl(this.timings[index]['operational']);
          })
        ),
        slots: this.fb.array(this.getArray(this.getSlotList(this.timings))),
      });
      this.showAddMore = this.getSlotList(this.timings).some(
        (itm) => itm.startTime && itm.endTime
      );
    } else {
      this.weekdayForm = this.fb.group({
        weekdays: new FormArray(
          this.weekDaysList.map((c) => new FormControl(!c.select))
        ),
        slots: this.fb.array([this.slotsGroup()]),
      });
    }
  }

  getSlotList(timing) {
    const obj = timing.find((itm) => itm.slots.length > 0);
    return obj['slots'] || [];
  }

  getArray(slots) {
    return slots.map((slot) => {
      console.log('called for slots');
      return this.slotsGroup(slot);
    });
  }
  onChangeTime(obj, indJ) {
    const objControl = obj.controls;
    console.log(obj.controls['startTime'].value);
    if (obj.controls.startTime.value === '24Hours') {
      this.showAddMore = false;
      this.weekdayForm.controls['slots']['controls'][indJ]['controls'][
        'endTime'
      ].setValue('2359');
      // this.weekdayForm.controls['slots']['controls'][indJ]['controls'][
      //   'startTime'
      // ].setValue('0000');
    } else if (
      objControl.startTime.value !== '' &&
      objControl.endTime.value !== ''
    ) {
      this.showAddMore = true;
    } else {
      this.showAddMore = false;
    }
    console.log(this.showAddMore);
  }
  slotsGroup(slot?): FormGroup {
    console.log(slot);
    if (slot && slot.startTime === '0000' && slot.endTime === '2359') {
      console.log('called for active slots');

      return this.fb.group({
        startTime: ['24Hours', [Validators.required]],
        endTime: [''],
      });
    } else {
      console.log('called for blank slots');
      return this.fb.group({
        startTime: [slot ? slot.startTime : '', [Validators.required]],
        endTime: [slot ? slot.endTime : '', [Validators.required]],
      });
    }
  }
  onAddNewHours(): void {
    this.showAddMore = false;
    const control = <FormArray>this.weekdayForm.controls['slots'];
    control.push(
      this.fb.group({
        startTime: ['', [Validators.required]],
        endTime: ['', [Validators.required]],
      })
    );
  }
  onRemoveHours(indexJ): void {
    console.log(indexJ);
    const control = <FormArray>this.weekdayForm['controls']['slots'];
    if (control.length > 1) {
      control.removeAt(indexJ);
    }
    this.showAddMore = this.weekdayForm['controls']['slots'].value.some(
      (itm) => itm.startTime !== '' && itm.endTime !== ''
    );
  }
  setWeekdaysArr(weekdays) {
    let finalWeekdays = [];
    this.weekDaysList.map((obj, indI) => {
      weekdays.forEach((wObj, indJ) => {
        if (wObj && indI === indJ) {
          finalWeekdays.push(indI);
        }
      });
    });
    return finalWeekdays;
  }
  getAllTimeObj() {
    return {
      '0': { operational: true, slots: this.defaultTime },
      '1': { operational: true, slots: this.defaultTime },
      '2': { operational: false, slots: this.defaultTime },
      '3': { operational: true, slots: this.defaultTime },
      '4': { operational: true, slots: this.defaultTime },
      '5': { operational: true, slots: this.defaultTime },
      '6': { operational: true, slots: this.defaultTime },
    };
  }
  generateDayWiseData() {
    const data = this.getAllTimeObj();
    console.log(this.weekdayForm.value);
    this.weekdayForm.value.weekdays.forEach((day, index) => {
      data[index]['operational'] = day;
      if (day) {
        data[index]['slots'] = this.weekdayForm.value.slots.forEach((itm) => {
          if (itm['startTime'] === '0001' || itm['startTime'] === '24Hours') {
            itm['startTime'] = '0000';
          }

          if (itm['endTime'] === '' || itm['startTime'] === '24Hours') {
            itm['endTime'] = '2359';
          }
        });
        data[index]['slots'] = this.weekdayForm.value.slots.filter((itm) => {
          return itm.startTime !== '' && itm.endTime !== '';
        });
      } else {
        data[index]['slots'] = [];
      }
    });
    return data;
  }
}
