import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { getInputFieldValidation } from 'src/app/shared/utils/common-functions';

@Component({
  selector: 'app-discount-code-modal',
  templateUrl: './discount-code-modal.page.html',
  styleUrls: ['./discount-code-modal.page.scss'],
})
export class DiscountCodeModalPage implements OnInit {

  discountCodeForm: FormGroup

  submitted: boolean = false;
  discountCode: any;
  constructor(private modalController: ModalController, private fb: FormBuilder) { }

  ngOnInit() {
    this.init();
    console.log('discountCode', this.discountCode);
  }

  getValid(fieldName) {
    return getInputFieldValidation(this.discountCodeForm, fieldName, this.submitted);
  }

  init() {
    this.discountCodeForm = this.fb.group({
      couponCode: [this.discountCode, [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
    })
  }

  save() {
    this.submitted = true;
    if (this.discountCodeForm.valid) {
      let couponCode = this.discountCodeForm.value.couponCode
      console.log(this.discountCodeForm.value.couponCode);
      this.modalController.dismiss(couponCode);
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
