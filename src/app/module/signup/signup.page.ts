/* eslint-disable @typescript-eslint/semi */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMAIL_PATTERN, ONLY_CHAR, ROUTES_STR } from 'src/app/core/constants/app-constants';
import { getInputFieldValidation, maxNumToBeAllowed } from 'src/app/shared/utils/common-functions';
import { SignupService } from './services/signup.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;
  resForm: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(ONLY_CHAR)]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      mobile: ['', [Validators.required, Validators.min(6000000000), Validators.max(9999999999)]],
      countryCode: ['+91', [Validators.required]]
    });
    this.signupForm.get('countryCode').valueChanges.subscribe(val => {
      if (val === '+91') {
        this.signupForm.controls['mobile'].setValidators([Validators.required, Validators.min(6000000000), Validators.max(9999999999)]);
      } else {
        this.signupForm.controls['mobile'].setValidators([Validators.required, Validators.min(1000000000), Validators.max(9999999999)
        ]);
      }
      this.signupForm.controls['mobile'].updateValueAndValidity();
    });
  }

  getValid(fieldName) {
    return getInputFieldValidation(this.signupForm, fieldName, this.submitted);
  }

  createObjForNewUserSignUp() {
    const body = { ...this.signupForm.value };
    body['displayType'] = 'newUser';
    return body;
  }

  async getOtp() {
    this.submitted = true;
    if (this.signupForm.valid) {
      const reqBody = await this.createObjForNewUserSignUp();
      this.signupService.getOtp(reqBody).then(async (response) => {
        reqBody['name'] = this.signupForm.controls.name.value;
        //passing data to the OTP module through subject
        this.signupService.sendNewUserData(reqBody);
        this.router.navigate([ROUTES_STR.otp]);
      });
    }
  }

  onKeyPress(event) {
    return maxNumToBeAllowed(event, 10);
  }
}
