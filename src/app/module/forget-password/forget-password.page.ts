/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES_STR } from 'src/app/core/constants/app-constants';
import { getInputFieldValidation, maxNumToBeAllowed } from 'src/app/shared/utils/common-functions';
import { OtpService } from '../otp/services/otp.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  confirmForm: FormGroup;
  dataTobeSentBack: any;
  isSubmitted = false;
  showPasswordMismatch = false;

  constructor(
    private otpService: OtpService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.verifiedData();
    this.passwordInitForm();
  }

  passwordInitForm() {
    this.confirmForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.min(6000000000), Validators.max(9999999999)]],
      countryCode: ['+91', Validators.required]
    });
  }

  verifiedData() {
    this.otpService.getVerifiedData().subscribe(res => {
      this.dataTobeSentBack = res;
    });
  }
  
  getvalidAll(fieldName) {
    return getInputFieldValidation(this.confirmForm, fieldName, this.isSubmitted);
  }

  proceed() {
    this.isSubmitted = true;
    if (this.confirmForm.valid) {
      //passing forget password data to the otp module through routes
      this.router.navigate([ROUTES_STR.otp],
        {
          state: { mobile: this.confirmForm.controls.mobile.value, countryCode: this.confirmForm.controls.countryCode.value, route: 'forget-password' }
        });
    }
  }

  otpPage() {
    this.router.navigate([ROUTES_STR.login]);
  }

  // onKeyPress(event) {
  //   return maxNumToBeAllowed(event, 10);
  // }
}
