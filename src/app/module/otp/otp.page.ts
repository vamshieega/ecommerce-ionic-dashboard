/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { COUNTERR, OTP_CONFIG, ROUTES_STR, SECONDS } from 'src/app/core/constants/app-constants';
import { ApiRequestService } from 'src/app/shared/services/api-request.service';
import { AppData } from 'src/app/shared/services/app-data.service';
import { URL_KEYS } from 'src/app/shared/services/request-url.service';
import { SignupService } from '../signup/services/signup.service';
import { OtpService } from './services/otp.service';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  title = 'OTP Verification';
  validStatus: number = 200;
  modalObj: any;
  // Form for just storing elements , not used in HTML file
  mobileForm: FormGroup;
  //  Counter Variable
  seconds = SECONDS;
  showResend = false;
  interval: any;
  config = OTP_CONFIG;
  counter = COUNTERR;
  otpInput: string;
  isOtpValid = false;
  // Variable which will be pass to call API
  dataTobeSentBack = {};
  // Modal Header Variables
  header = '';
  otpHeader = 'OTP Verification';
  forgetPassword = 'Forgot Password';
  //forgot password variables
  forgetPasswordmobile = '';
  forgetPasswordCC = '';
  routhPath: string;

  constructor(private fb: FormBuilder, public router: Router,
    private apiService: ApiRequestService,
    private signupService: SignupService,
    private otpService: OtpService,
    private platform: Platform
  ) { }

  ngOnInit() {
    //this.nativeBackBtn();
    this.startTimer();
    this.seconds = 30;
    this.signUpData();
    this.initFrom();
    this.userFilter();
  }


  nativeBackBtn() {
    this.platform.backButton.subscribeWithPriority(999900, () => {
      if (this.header === this.forgetPassword) {
        console.log('forgetPassword', ROUTES_STR.forgetPassword);
        this.router.navigate([ROUTES_STR.forgetPassword]);
      }
      else {
        console.log('forgetPassword', ROUTES_STR.signUp);
        this.router.navigate([ROUTES_STR.signUp]);
      }
    });
  }

  // Filtering the user, whether user is new or existing user
  userFilter() {
    if (this.modalObj.displayType === 'newUser') {
      this.header = this.otpHeader;
      this.mobileForm.controls['mobile'].setValue(this.modalObj.mobile);
      this.mobileForm.controls['countryCode'].setValue(this.modalObj.countryCode);
    } else {
      this.header = this.forgetPassword;
      //collecting the forget password data (from forget paassword routes, we are getting data)
      this.forgetPasswordmobile = this.router.getCurrentNavigation().extras?.state.mobile;
      this.forgetPasswordCC = this.router.getCurrentNavigation().extras?.state.countryCode;
      this.routhPath = this.router.getCurrentNavigation().extras?.state.route;
      this.forgetPasswordCalled();
    }
  }

  //collecting the signup data with subject
  signUpData() {
    this.signupService.getNewUserData().subscribe(res => {
      this.modalObj = res;
    });
  }

  initFrom() {
    this.mobileForm = this.fb.group({
      // eslint-disable-next-line quote-props
      'mobile': [],
      // eslint-disable-next-lininitFrome quote-props
      'countryCode': [],
    });
  }
  // timer for the otp input
  startTimer() {
    this.interval = setInterval(() => {
      if (this.seconds > 1) {
        this.showResend = false;
        this.seconds--;
      } else {
        this.showResend = true;
        clearInterval(this.interval);
        if (this.counter === 0) {
          this.showResend = false;
          this.counter = -1;
        }
      }
    }, 1000);
  }
  // on verify otp and to show the confirm password modal

  async onVerifyOTP(otp?) {
    this.otpInput = otp;
    if ((this.otpInput && this.otpInput.length) === 4) {
      if (this.modalObj['displayType'] === 'newUser') {
        const reqBody = await this.createObjForNewUserToVerifyOTP();
        this.onVerifyNewUser(reqBody);
      } else {
        const reqBody = this.createObjForOldUserToVerifyOTP();
        this.toForgetPassword(reqBody);
      }
    } else if ((this.otpInput && this.otpInput.length) !== 4) {
      //temporarily empty
    }
  }

  onVerifyNewUser(reqBody) {
    let callingUrl: URL_KEYS;
    if (this.modalObj['subuserType'] === 'sub') {
      callingUrl = 'subinitSignup';
    } else {
      callingUrl = 'initSignup';
    }
    this.apiService.post(callingUrl, reqBody).then((response) => {
      this.dataTobeSentBack['userId'] = response['body']['data']['userId'] || '';
      this.dataTobeSentBack['userOptions'] = {};
      this.dataTobeSentBack['userOptions']['registered'] = response['body']['data']['registered'];
      this.dataTobeSentBack['userOptions']['setPassword'] = response['body']['data']['setPassword'];
      this.dataTobeSentBack['userType'] = callingUrl === 'initSignup' ? 'owner' : 'employee';
      this.dataTobeSentBack['deviceId'] = AppData.deviceId;
      const userData = Object.assign({}, this.modalObj, this.dataTobeSentBack);
      this.otpService.sendVerifiedData(userData);
      if (this.dataTobeSentBack['userOptions']['setPassword']) {
        this.router.navigate([ROUTES_STR.createPassword]);
      }
    });
  }

  createObjForNewUserToVerifyOTP() {
    const body = {
      'mobile': (this.mobileForm.controls.mobile.value).toString(),
      'otp': this.otpInput,
      'deviceId': AppData.deviceId,
      'countryCode': this.modalObj.countryCode
    };
    return body;
  }

  createObjForOldUserToVerifyOTP() {
    const body = {
      'userId': (this.mobileForm.controls.mobile.value).toString(),
      'otp': this.otpInput,
      'countryCode': this.mobileForm.controls.countryCode.value,
    };
    return body;
  }

  toForgetPassword(reqBody) {
    this.apiService.post('forgetPassword', reqBody).then((response) => {
      if (this.validStatus === response['status']) {
        this.router.navigate([ROUTES_STR.createPassword]);
      }
      else {
        //temporarily using
      }
    });
  }

  createObjForSendOTP() {
    const body = { ...this.mobileForm.value };
    return body;
  }
  // to resend the otp after the count is down to 0
  async resend() {
    const reqBody = await this.createObjForSendOTP();
    reqBody['method'] = 'resendOtp';
    this.apiService.post('sendOtp', reqBody).then((response) => {
      this.seconds = 30;
      if (this.counter >= 0) {
        this.startTimer();
        this.counter--;
      }
    });
  }

  onOtpChange(otp) {
    this.otpInput = otp;
    if (this.otpInput.length === 4) {
      this.onVerifyOTP(otp);
    } else if (this.otpInput.length > 0) {
      this.isOtpValid = true;
    } else {
      this.isOtpValid = false;
    }
  }

  previousPage() {
    if (this.routhPath === 'forget-password') {
      this.router.navigate([ROUTES_STR.forgetPassword]);
    }
    else {
      this.router.navigate([ROUTES_STR.signUp]);
    }
  }

  forgetPasswordCalled() {
    this.mobileForm.controls['mobile'].setValue(this.forgetPasswordmobile);
    this.mobileForm.controls['countryCode'].setValue(this.forgetPasswordCC);
    this.startTimer();
    this.seconds = 30;
    const reqBody = this.createObjForSendOTP();
    reqBody['method'] = 'sendOtp';
    this.apiService.post('sendOtp', reqBody);
  }
}
