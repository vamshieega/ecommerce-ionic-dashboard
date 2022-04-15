import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COUNTRY_TYPE } from 'src/app/core/constants/app-constants';
import { MerchantService } from 'src/app/module/merchant/services/merchant.service';
import { AppData } from 'src/app/shared/services/app-data.service';

@Component({
  selector: 'app-delivery-price-range',
  templateUrl: './delivery-price-range.page.html',
  styleUrls: ['./delivery-price-range.page.scss'],
})
export class DeliveryPriceRangePage implements OnInit {

  @Input() maxDistance: number;
  @Input() outletChargeTypeV: string;
  @Input() set selectionType(selectionType: string) {
    console.log(selectionType);
    this.inpSelectionType = selectionType;
    if (selectionType === 'byDistance') {
      this.title = 'Distance range'
      this.dropOpt = 'KM'
      this.rangesFormArray = [];
    } else {
      this.title = 'Cart value range'
      this.dropOpt = this.currency?.name;
      this.rangesFormArray = [];
    }
    this.setRangesValue(this.inpRanges);
    this.initForm();
  }
  @Input() set ranges(ranges) {
    console.log(ranges);
    this.setRangesValue(ranges);
    this.inpRanges = ranges;
  }
  title: string;
  formInit = false;
  dropOpt: string;
  inpRanges: any;

  currency = COUNTRY_TYPE[AppData.restData?.config.currency];
  priceRangeForm: FormGroup;
  inpSelectionType: string;
  rangesFormArray: any;

  constructor(private fb: FormBuilder,
    private merchantService: MerchantService) {
      this.merchantService.getRestData();
      
    }
    
    ngOnInit() {
      this.initForm();
  }

  initForm() {
    this.priceRangeForm = this.fb.group({
      range: this.fb.array([this.getFormValues()])
    })
    this.formInit = true;
    if (this.rangesFormArray && this.rangesFormArray.length > 0) {
      let rangeFormArr = <FormArray>this.priceRangeForm.get('range');
      console.log(this.rangesFormArray);
      while (rangeFormArr.length !== 0) {
        rangeFormArr.removeAt(0)
      }
      this.rangesFormArray.forEach((value) => {
        rangeFormArr.push(value);
      })
    }
  }

  setRangesValue(ranges) {
    console.log(this.inpSelectionType, this.outletChargeTypeV);
    
    if (ranges && ranges.length > 0 && this.inpSelectionType === this.outletChargeTypeV) {
      const rangesFormArray = ranges.map((range) => {
        console.log(range);
        return this.getFormValues(range.from, range.to, range.price)
      });
      console.log(rangesFormArray);
      this.rangesFormArray = rangesFormArray;
    }
  }

  getFormValues(from = '', to = '', price = '') {
    console.log(from, to, price);
    return this.fb.group({
      from: [from, Validators.required],
      to: [to, [Validators.required]],
      price: [price, Validators.required]
    }, { validators: this.checkMinMaxValue() })
  }

  checkMinMaxValue() {
    return (formGroup: FormGroup) => {
      const minControl = formGroup.controls['from'];
      const maxControl = formGroup.controls['to'];
      if (maxControl.errors && !maxControl.errors.shouldGreater) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (Number(minControl.value) >= Number(maxControl.value)) {
        maxControl.setErrors({ shouldGreater: true });
      } else {
        maxControl.setErrors(null);
      }
      if (this.inpSelectionType === 'byDistance') {
        if (Number(maxControl.value) > this.maxDistance) {
          maxControl.setErrors({ rangeDistance: true });
        } else if (Number(minControl.value) >= Number(maxControl.value)) {
          maxControl.setErrors({ shouldGreater: true });
        } else {
          maxControl.setErrors(null);
        }

      }
    }
  }

  getErrorMsg(formGroup, controlName = 'to') {
    if (!formGroup.get(controlName).errors) {
      return 'Please fill the mandatory Fields above';
    } else {
      return (formGroup.get(controlName).errors ?
                  (formGroup.get(controlName).errors.shouldGreater ? 'To Value should be greater than From Value' : 
                      (formGroup.get(controlName).errors.rangeDistance ? 'To Value should be lesser than range' : 
                          'Please fill the mandatory Fields above'))
              : 'Please fill the mandatory Fields above');
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  isInvalid(formGroup, controlName) {
    if (controlName !== 'to') {
      return formGroup.get(controlName).status &&
        (formGroup.get(controlName).dirty || formGroup.get(controlName).touched) &&
        (formGroup.get(controlName).errors ? formGroup.get(controlName).errors.required : false);
    } else {
      return formGroup.get(controlName).status &&
        (formGroup.get(controlName).dirty || formGroup.get(controlName).touched) &&
        (formGroup.get(controlName).errors
          ? (formGroup.get(controlName).errors.required || formGroup.get(controlName).errors.shouldGreater || formGroup.get(controlName).errors.rangeDistance)
          : false);
    }
  }

  addDistance(formGroup) {
    console.log(this.priceRangeForm.status);
    if (this.priceRangeForm.status === 'INVALID') {
      this.markFormGroupTouched(formGroup);
    } else {
      const rangeArray = <FormArray>(this.priceRangeForm.controls['range']);
      console.log(rangeArray);
      const group = rangeArray.controls[rangeArray.controls.length - 1]
      console.log(group);
      if (this.inpSelectionType === 'byDistance') {
        rangeArray.push(this.getFormValues(group.value.to, this.maxDistance.toString()));
      } else {
        rangeArray.push(this.getFormValues(group.value.to));
      }
      console.log(this.priceRangeForm);
    }
  }

  generateDetails() {
    console.log(this.priceRangeForm);
    console.log(this.priceRangeForm.value);
    if (this.priceRangeForm.status !== 'INVALID') {
      const formValue = this.priceRangeForm.value.range;
      let ranges = []
      ranges = formValue.map((range) => {
        return {
          from: range.from,
          to: range.to,
          price: range.price,
        }
      });
      console.log(ranges);
      return ranges;
    }else{
      this.markFormGroupTouched(this.priceRangeForm);
      return [];
    }
  }

  isValid() {
    return this.priceRangeForm.valid;
  }

  removeDistance(index) {
    const rangeArray = <FormArray>(this.priceRangeForm.controls['range']);
    rangeArray.removeAt(index);
  }

}
