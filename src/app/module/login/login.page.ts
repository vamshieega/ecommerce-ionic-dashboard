/* eslint-disable @typescript-eslint/no-inferrable-types */
import { APP_DETAILS, NEW_COUNTRY_CODES, ROUTES_STR } from './../../core/constants/app-constants';
/* eslint-disable @typescript-eslint/dot-notation */
import { Router } from '@angular/router';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppData } from 'src/app/shared/services/app-data.service';
import { LoginService } from './services/login.service';
import { getInputFieldValidation, maxNumToBeAllowed } from 'src/app/shared/utils/common-functions';
import { ModalController, NavController } from '@ionic/angular';
import { FcmMessagingService } from 'src/app/shared/services/fcm-messaging.service';
import { ConfirmationmodalPage } from 'src/app/shared/component/confirmationmodal/confirmationmodal.page';
@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	loginForm: FormGroup;
	submitted = false;
	password = true;
	countryCodes = NEW_COUNTRY_CODES;
	passwordType = 'password';
	passwordShown = false;
	constructor(
		private fb: FormBuilder,
		private loginService: LoginService,
		private router: Router,
		private navCtrl: NavController,
		private ngZone: NgZone,
		private fcmMessagingService: FcmMessagingService,
		private modalController: ModalController
	) {
	}

	ngOnInit() {
		this.initLoginForm();
	}

	ionViewWillEnter() {
		this.initLoginForm();
	}

	initLoginForm() {
		// this.fcmMessagingService.tokenSubscribe();
		this.loginForm = this.fb.group({
			userName: ['', [Validators.required, Validators.min(6000000000), Validators.max(9999999999)]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			countryCode: ['']
		});

		const timezoneOffset = String(new Date().getTimezoneOffset());
		if (timezoneOffset === "-330") {
			this.loginForm.controls['countryCode'].setValue(this.countryCodes[0].code);
		} else {
			this.loginForm.controls['countryCode'].setValue(this.countryCodes[1].code);
		}

		this.loginForm.get('countryCode').valueChanges.subscribe(val => {
			if (val === '+91') {
				this.loginForm.controls['userName'].setValidators([Validators.required, Validators.min(6000000000), Validators.max(9999999999)]);
			} else {
				this.loginForm.controls['userName'].setValidators([Validators.required, Validators.min(1000000000), Validators.max(9999999999)]);
			}
			this.loginForm.controls['userName'].updateValueAndValidity();
		});
	}

	getValid(fieldName) {
		return getInputFieldValidation(this.loginForm, fieldName, this.submitted);
	}

	async login() {
		this.submitted = true;
		if (this.loginForm.valid) {
			try {
				this.onLogin(await this.createLoginObj());
			} catch (err) {
			}
		}
	}

	createLoginObj() {
		const reqBody = { ...APP_DETAILS, ...this.loginForm.value };
		reqBody['deviceId'] = AppData.deviceId;
		return reqBody;
	}

	onLogin(loginObj) {
		console.log('loginObj', loginObj);
		this.loginService.login(loginObj).then((res) => {
			//this.navCtrl.navigateRoot([ROUTES_STR.orders]);
			this.navCtrl.navigateForward([ROUTES_STR.dashboard]);
			//this.ngZone.run(() => this.router.navigate([ROUTES_STR.manage]));
			//this.router.navigate([ROUTES_STR.orders]); 
			this.submitted = false;
			AppData.appPermissionCheckSub$.next('');
			this.loginForm.reset();
		}).catch(err => {
			if (err['status'] === 401) {
				this.confirmation();
			}
		});
	}

	async confirmation() {
		console.log('confirmation');
		let modal = await this.modalController.create({
			component: ConfirmationmodalPage, cssClass: 'Confirmationmodal',
			componentProps: { icon: 'icon-logout', title: 'No user found for this number, please sign up', endMsg: 'sign in' }
		});
		modal.onDidDismiss().then(async (res) => {
			console.log(res.data);
			if (res.data) {
				this.router.navigate([ROUTES_STR.signUp]);
			}
		});
		return await modal.present();
	}
	// onKeyPress(event) {
	// 	console.log(event);
	// 	return maxNumToBeAllowed(event, 10);
	// }

	togglePassword() {
		if (this.passwordShown) {
			this.passwordShown = false;
			this.passwordType = 'password';
		} else {
			this.passwordShown = true;
			this.passwordType = 'text';
		}
	}
}
