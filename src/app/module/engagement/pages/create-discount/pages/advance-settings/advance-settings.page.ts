import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES_STR } from 'src/app/core/constants/app-constants';
import { Discount } from '../../models/discount';

@Component({
  selector: 'app-advance-settings',
  templateUrl: './advance-settings.page.html',
  styleUrls: ['./advance-settings.page.scss'],
})
export class AdvanceSettingsPage implements OnInit {

  @Input() advanceSettings: any;
  @Output() settingsForm: EventEmitter<any> = new EventEmitter();

  today = new Date();
  max = new Date().getFullYear() + 10;
  min = new Date(new Date().setMonth(this.today.getMonth() - 3)).toISOString(); // code for reduce 3 months :/

  discountModel = new Discount();
  advanceSettingsForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.advanceSettingsForm = this.fb.group({
      advancedSettingSelectedV: [this.discountModel['advancedSettingSelectedV']],
      // usage: this.fb.group({
      //   perCustomer: this.fb.group({
      //     intervalUnit: '',
      //     intervalValue: '',
      //     limit: '',
      //   }),
      //   totalTimes: this.discountModel['usage']['totalTimes'],
      //   usageLimitV: '',
      // })
    });

    this.advanceSettingsForm.get('advancedSettingSelectedV').valueChanges.subscribe(val => {
      console.log(val)
    });
  }


  ngOnChanges(changes: SimpleChanges) {
    const currentItem: SimpleChange = changes.advanceSettings;
    if (currentItem && currentItem.currentValue) {
      console.log('currentItem advance', currentItem.currentValue);
      this.discountModel = currentItem.currentValue;
      this.init();
      if (this.discountModel['advancedSettingSelectedV']) {
        this.addAdvanceSettingFrmKey();
      }
    }
  }

  discountSchedule() {
    this.router.navigate([ROUTES_STR.discountSchedule]);
  }

  advanceSetting(event) {
    if (event.detail.checked) {
      this.addAdvanceSettingFrmKey();
    }
  }

  addAdvanceSettingFrmKey() {
    this.advanceSettingsForm.addControl('usage', this.fb.group({
      usageLimitV: [this.discountModel['usage']['usageLimitV']],
      totalTimes: [this.discountModel['usage']['totalTimes']]
    }));
    this.advanceSettingsForm.addControl('dateSpan', this.fb.group({
      startDate: [this.discountModel['activeSlots']['dateSpan']['startDate']],
      endDate: [this.discountModel['activeSlots']['dateSpan']['endDate']]
    }));



    // this.advanceSettingsForm.get('usage').valueChanges.subscribe(val => {
    //   console.log(val)
    // });



    // this.advanceSettingsForm.get('dateSpan').valueChanges.subscribe(val => {
    //   console.log(this.advanceSettingsForm.value);
    //   let obj = {
    //     type: 'dateSpan',
    //     value: this.advanceSettingsForm.value['dateSpan']
    //   }
    //   this.settingsForm.emit(obj);
    // });


    if (this.discountModel['usage']['perCustomer']) {
      (this.advanceSettingsForm.get("usage") as FormGroup).addControl('perCustomer', this.fb.group({
        'intervalUnit': [this.discountModel['usage']['perCustomer']['intervalUnit']],
        'intervalValue': [this.discountModel['usage']['perCustomer']['intervalValue'], [Validators.required, Validators.min(1)]],
        'limit': [this.discountModel['usage']['perCustomer']['limit'], [Validators.required]]
      }));
    }
  }
  get offerFormGrp() { return this.advanceSettingsForm.controls; } // getting parent form group control
  get usageFormGrp() { return this.offerFormGrp.usage['controls'] }

  noOfDiscounts(event) {
    if (event.detail.checked) {
      this.advanceSettingsForm.controls['usage']['controls']['usageLimitV'].setValue('total', { emit: false });
    }
  }
  usage(event) {
    let obj = {
      type: 'usage',
      value: this.advanceSettingsForm.value['usage']
    }
    // this.advanceSettingsForm.get('usage')
    this.settingsForm.emit(obj);
    // this.advanceSettingsForm.get('usage').valueChanges.subscribe(val => {
    //   console.log(val)
    // });
  }

  onDateChange(event) {
    console.log(event.detail.value);
    console.log(this.advanceSettingsForm.value);
    let obj = {
      type: 'dateSpan',
      value: this.advanceSettingsForm.value['dateSpan']
    }
    this.settingsForm.emit(obj);
  }

  save() {
    console.log(this.advanceSettingsForm.value)
  }
  noOfLimit(event) {
    if (event.detail.checked) {
      this.advanceSettingsForm.controls['usage']['controls']['usageLimitV'].setValue('per-customer', { emit: false });
    }
  }
}
