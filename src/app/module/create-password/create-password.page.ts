/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES_STR } from 'src/app/core/constants/app-constants';
import { ApiRequestService } from 'src/app/shared/services/api-request.service';
import { getInputFieldValidation } from 'src/app/shared/utils/common-functions';
import { OtpService } from '../otp/services/otp.service';
import { SignupService } from '../signup/services/signup.service';
@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.page.html',
  styleUrls: ['./create-password.page.scss'],
})
export class CreatePasswordPage implements OnInit {

  confirmForm: FormGroup;
  passwordType = 'password';
  passwordShown = false;
  passwordType2 = 'password';
  passwordShown2 = false;
  dataTobeSentBack: any;
  isSubmitted = false;
  showPasswordMismatch = false;
  validStatus: number = 200;
  constructor(
    private otpService: OtpService,
    private router: Router,
    private fb: FormBuilder,
    private signupService: SignupService,
    private apiService: ApiRequestService
  ) { }

  ngOnInit() {
    this.verifiedData();
    this.passwordInitForm();
  }

  passwordInitForm() {
    this.confirmForm = this.fb.group({
      // eslint-disable-next-line quote-props
      'password': ['', [Validators.required, Validators.minLength(6)]],
      // eslint-disable-next-line quote-props
      'confirmPassword': ['', [Validators.required, Validators.minLength(6)]]
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
    if (this.confirmForm.status === 'VALID') {
      if (this.confirmForm.controls.password.value === this.confirmForm.controls.confirmPassword.value) {
        if (this.dataTobeSentBack['displayType'] === 'newUser') {
          this.dataTobeSentBack['password'] = this.confirmForm.controls.password.value;
          delete this.dataTobeSentBack['displayType'];
          // passing all the signup data to the the Signup API
          this.signupService.signup(this.dataTobeSentBack).then((response) => {
            const responseData = response['body']['data'];
            this.signupService.saveAccountDataInLocal(responseData)
            if (this.validStatus === response['status']) {
              this.router.navigate([ROUTES_STR.dashboard]);
            }
          });
        } else {
          const data = {
            password: this.confirmForm.getRawValue()['password']
          };
          this.apiService.post('resetPassword', data).then((response) => {
            this.router.navigate([ROUTES_STR.login]);
          });
        }
      } else {
        this.showPasswordMismatch = true;
      }
    }
  }

  disablePswdMismatch() {
    this.showPasswordMismatch = false;
  }

  otpPage() {
    this.router.navigate([ROUTES_STR.otp]);
  }

  togglePassword() {
    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType = 'password';
    } else {
      this.passwordShown = true;
      this.passwordType = 'text';
    }
  }

  togglePassword2() {
    if (this.passwordShown2) {
      this.passwordShown2 = false;
      this.passwordType2 = 'password';
    } else {
      this.passwordShown2 = true;
      this.passwordType2 = 'text';
    }
  }
}
