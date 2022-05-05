/* eslint-disable new-parens */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StorageService } from "src/app/core/services/storage.service";
import { environment } from "src/environments/environment.dev";
import { UserModel } from "../models/user.model";

@Injectable({
	providedIn: "root",
})
export class AppData {
	static token$ = new BehaviorSubject(null);
	static token = '';
	static baseUrl = environment.baseUrl;
	// static commonBaseUrl = environment.commonBaseUrl;
	static googleMapUrl = environment.googleMapUrl;
	//static commonBaseUrl = environment.commonBaseUrl;
	static socketUrl = environment.socketUrl;

	static userDataSub$ = new BehaviorSubject(null);
	static userData: UserModel;

	static restDataSub$ = new BehaviorSubject(null);
	static restData: any;

	static outletList = [];
	static outletListSub$ = new BehaviorSubject(null);
	static selectedOutlet = 0;
	static outletId = '';
	static outletIdSub$ = new BehaviorSubject('');

	static isAuthenticated = false;
	static appPermissionCheckSub$ = new BehaviorSubject('init');
	static userList = [];
	static userListSub$ = new BehaviorSubject([]);
	static selectedIndex = -1;
	static selectedSubIndex = -1;
	static selectedSubIndexSub$ = new BehaviorSubject(-1);

	static profileMenuSelectedIndex = -1;
	static profileMenuSelectedSub$ = new BehaviorSubject(-1);
	static profileSubMenuSelectedIndex = -1;
	static profileSubMenuSelectedSub$ = new BehaviorSubject(-1);
	static selectedIndexSub$ = new BehaviorSubject(-1);

	static socialMenuSelectedSub$ = new BehaviorSubject(-1);
	static socialSubMenuSelectedIndex = -1;
	static socialSubMenuSelectedSub$ = new BehaviorSubject(-1);

	static outletDetailsSub$ = new BehaviorSubject(null);
	static outletDetails;

	static promoItemsList = [];
	static outletNameSub$ = new BehaviorSubject(null);

	static fcmTokenSub$ = new BehaviorSubject('');
	static fcmToken = '';

	static deviceIdSub$ = new BehaviorSubject('');
	static deviceId = '';
	static orderDetailsData: any = new BehaviorSubject([]);

	static yourPlateItemsSub$ = new BehaviorSubject(null);
	static yourPlateItems;
	static plateItemCountSub$ = new BehaviorSubject({ itemCount: 0, itemTotal: 0, outletName: '' });

	static selectedAddonsListSub$ = new BehaviorSubject([]);
	static selectedAddonsList = [];
	static addonList;

	static selectedOrderItemSub$ = new BehaviorSubject([]);
	static selectedOrderItem = [];

	static itemsInPlateSub$ = new BehaviorSubject([]);
	static itemsInPlate = [];

	static spInstructionsSub$ = new BehaviorSubject('');
	static spInstructions = '';

	static pageTitleSub$ = new BehaviorSubject('');
	static pageTitle = '';

	static cartIdSub$ = new BehaviorSubject(''); // contain cartId
	static cartId = '';

	static customerDetailsSub$ = new BehaviorSubject(null);
	static customerDetails;

	static posSelectedOutletSub$ = new BehaviorSubject({ selectedOutletId: '', selectedOutletName: '' });
	static posSelectedOutlet;
	static posOutletsSub$ = new BehaviorSubject([]);
	static posOutlets = [];

	static facebookUserDetailsSub$ = new BehaviorSubject({ userId: '', userName: '' });
	static facebookUserDetails;

	static campaignDetailsSub$ = new BehaviorSubject({ campaignId: '', adSetId: '', adId: '', outletIds: '', productTags: '' });
	static campaignDetails;

	static businessTypeSub$ = new BehaviorSubject('');
	static businessType = '';

	static userLoginDaySub$ = new BehaviorSubject('');
	static userLoginDay = '';

	static versionSub$ = new BehaviorSubject('');
	static version = '';

	//Used in item search modal
	static menuListDisplaySub$ = new BehaviorSubject([]);
	//static menuListDisplay = '';

	//Used in custom timings page
	static singleMenuitemTimeSub$ = new BehaviorSubject([]);
	//static singleMenuitemTime = '';

	static addonDetailsSub$ = new BehaviorSubject([]);
	static variantDetailsSub$ = new BehaviorSubject([]);

	static navigationSub$ = new BehaviorSubject('');

	static discountModelSub$ = new BehaviorSubject(null);

	static notificationSub$ = new BehaviorSubject(null);

	static resetArraySub$ = new BehaviorSubject(null);

	static commonDiscountSub$ = new BehaviorSubject(null);

	constructor(private storage: StorageService) {
		// console.log(this.storage.getItem('outletDetail'));

		if (this.storage.getItem("token") !== null) {
			AppData.token$.next(this.storage.getItem("token"));
			AppData.token = this.storage.getItem("token")
			AppData.isAuthenticated = true;
		}

		if (this.storage.getItem("deviceId") !== null) {
			AppData.deviceIdSub$.next(this.storage.getItem("deviceId"));
		}

		AppData.token$.subscribe((data: string) => {
			AppData.token = data;
			this.setToken(data);
		});

		if (this.storage.getItem('userData') !== null) {
			AppData.userDataSub$.next(this.storage.getItem('userData'));
		}

		if (this.storage.getItem('restData') !== null) {
			AppData.restDataSub$.next(this.storage.getItem('restData'));
		}

		if (this.storage.getItem('outletId') != null) {
			AppData.outletIdSub$.next(this.storage.getItem('outletId'));
		}

		if (this.storage.getItem('userList') != null) {
			AppData.userList = this.storage.getItem('userList');
		}

		if (this.storage.getItem('outletList')) {
			const obj = {
				changeIndex: false,
				outletList: this.storage.getItem('outletList') ? this.storage.getItem('outletList') : []
			};
			AppData.outletListSub$.next(obj);
		}

		if (this.storage.getItem('outletDetails') !== null) {
			AppData.outletDetailsSub$.next(this.storage.getItem('outletDetails'));
		}


		if (this.storage.getItem('cartId') !== null) {
			AppData.cartIdSub$.next(this.storage.getItem('cartId'));
		}

		if (this.storage.getItem('customerDetails') !== null) {
			AppData.customerDetailsSub$.next(this.storage.getItem('customerDetails'));
		}

		if (this.storage.getItem('yourPlateItem') !== null) {
			AppData.yourPlateItemsSub$.next(this.storage.getItem('yourPlateItem'));
		}

		if (this.storage.getItem('orderItems') !== null) {
			AppData.selectedOrderItemSub$.next(this.storage.getItem('orderItems'));
		}

		if (this.storage.getItem('posOutletSelected') !== null) {
			AppData.posSelectedOutletSub$.next(this.storage.getItem('posOutletSelected'));
		}
		if (this.storage.getItem('posOutlets') !== null) {
			AppData.posOutletsSub$.next(this.storage.getItem('posOutlets'));
		}
		if (this.storage.getItem('facebookUserDetails') !== null) {
			AppData.facebookUserDetailsSub$.next(this.storage.getItem('facebookUserDetails'));
		}

		if (this.storage.getItem('campaignDetails') !== null) {
			AppData.campaignDetailsSub$.next(this.storage.getItem('campaignDetails'));
		}

		AppData.campaignDetailsSub$.subscribe((res) => {
			this.storage.setItem('campaignDetails', res);
			AppData.campaignDetails = JSON.parse(JSON.stringify(res));
		});

		if (this.storage.getItem('businessType') !== null) {
			AppData.businessTypeSub$.next(this.storage.getItem('businessType'));
		}

		AppData.businessTypeSub$.subscribe((res) => {
			this.storage.setItem('businessType', res);
			AppData.businessType = JSON.parse(JSON.stringify(res));
		});


		AppData.facebookUserDetailsSub$.subscribe((res) => {
			this.storage.setItem('facebookUserDetails', res);
			AppData.facebookUserDetails = JSON.parse(JSON.stringify(res));
		});

		AppData.posOutletsSub$.subscribe((res) => {
			this.storage.setItem('posOutlets', res);
			AppData.posOutlets = JSON.parse(JSON.stringify(res));
		});

		AppData.posSelectedOutletSub$.subscribe((res) => {
			this.storage.setItem('posOutletSelected', res);
			AppData.posSelectedOutlet = JSON.parse(JSON.stringify(res));
		});

		AppData.selectedOrderItemSub$.subscribe((res) => {
			this.storage.setItem('orderItems', res);
			AppData.selectedOrderItem = res;
		});

		AppData.customerDetailsSub$.subscribe((obj) => {
			this.storage.setItem('customerDetails', obj);
			AppData.customerDetails = obj;
		});

		AppData.cartIdSub$.subscribe((cartId) => {
			this.storage.setItem('cartId', cartId);
			AppData.cartId = cartId;
		});

		AppData.yourPlateItemsSub$.subscribe((cartObj) => {
			// if (cartObj !== null) {
			this.storage.setItem('yourPlateItem', cartObj);
			AppData.yourPlateItems = JSON.parse(JSON.stringify(cartObj));
			// }
			if (AppData.yourPlateItems) {
				let itmCount = 0;
				let itemsInPlate = 0;
				if (AppData.yourPlateItems['outlets'].length > 0) {
					itemsInPlate = AppData.yourPlateItems['outlets'][0]['items'].length;
				}
				let itmSubTotal = 0
				if (itemsInPlate > 0) {
					AppData.yourPlateItems['outlets'][0]['items'].forEach((items) => {
						itmCount += items.quantity;
						itmSubTotal += items.billing.subTotal;
					});
					// console.log('item added');
					AppData.plateItemCountSub$.next({ itemCount: itmCount, itemTotal: itmSubTotal, outletName: cartObj['outlets'][0]['outletName'] });
				} else {
					AppData.plateItemCountSub$.next({ itemCount: 0, itemTotal: 0, outletName: '' });
					AppData.selectedOrderItemSub$.next([]);
				}
			} else {
				AppData.plateItemCountSub$.next({ itemCount: 0, itemTotal: 0, outletName: '' });
				AppData.selectedOrderItemSub$.next([]);
			}
		});

		AppData.token$.subscribe((data: string) => {
			this.setToken(data);
		});

		AppData.userDataSub$.subscribe((userData) => {
			this.storage.setItem('userData', userData);
			AppData.userData = Object.assign(new UserModel, userData);
		});

		AppData.outletIdSub$.subscribe((outletId) => {
			this.storage.setItem('outletId', outletId);
			AppData.outletId = outletId;
		});

		AppData.userListSub$.subscribe((userList) => {
			this.storage.setItem('userList', userList);
			AppData.userList = userList;
		});

		AppData.outletListSub$.subscribe((outletListDetails) => {
			if (outletListDetails) {
				if (outletListDetails.outletList) {
					this.storage.setItem('outletList', outletListDetails.outletList);
				}
				AppData.outletList = outletListDetails.outletList;
				if (AppData.outletList && AppData.outletList.length > 0) {
					if (outletListDetails.changeIndex) {
						AppData.selectedOutlet = 0;
						// AppData.outletIdSub$.next(AppData.outletList[AppData.selectedOutLet]['outletId']);
					} else {
						// below condition is added to check new outlet creation is coming.
						if (AppData.selectedOutlet === -1) {
							AppData.selectedOutlet = AppData.outletList.length - 1;
							// AppData.outletIdSub$.next(AppData.outletList[AppData.selectedOutLet]['outletId']);
						}
					}

					for (var i = 0; i < AppData.outletList.length; i++) {
						if (AppData.outletList[i].outletId === AppData.outletId) {
							AppData.outletNameSub$.next(AppData.outletList[i].locality);
						}
					}
				} else {
					AppData.outletIdSub$.next('');
					this.storage.setItem('outletList', null);
				}
			}
		});

		AppData.restDataSub$.subscribe((restData) => {
			if (restData) {
				this.storage.setItem('restData', restData);
				AppData.restData = restData;
			}
		});

		AppData.selectedIndexSub$.subscribe((index) => {
			AppData.selectedIndex = index;
		});

		AppData.selectedSubIndexSub$.subscribe((index) => {
			AppData.selectedSubIndex = index;
		});

		AppData.profileMenuSelectedSub$.subscribe((index) => {
			AppData.profileMenuSelectedIndex = index;
		});

		AppData.profileSubMenuSelectedSub$.subscribe((index) => {
			AppData.profileSubMenuSelectedIndex = index;
		});

		AppData.socialSubMenuSelectedSub$.subscribe((index) => {
			AppData.socialSubMenuSelectedIndex = index;
		});

		AppData.fcmTokenSub$.subscribe((fcmToken) => {
			if (fcmToken) {
				AppData.fcmToken = fcmToken;
			}
		});

		AppData.deviceIdSub$.subscribe((deviceId) => {
			this.storage.setItem("deviceId", deviceId);
			AppData.deviceId = JSON.parse(JSON.stringify(deviceId));
		});

		AppData.outletDetailsSub$.subscribe((outletObj) => {
			this.storage.setItem('outletDetails', outletObj);
			// console.log('------------>OUTLET DETAILS----->', outletObj);

			AppData.outletDetails = JSON.parse(JSON.stringify(outletObj));
			if (outletObj?.config.businessType) {
				AppData.businessTypeSub$.next(outletObj.config.businessType);
			}
		});

		AppData.userLoginDaySub$.subscribe((currentTime) => {
			if (currentTime === 'currentTime') {
				this.storage.setItem("userLoginDay", new Date());
			}
			else {
				AppData.userLoginDaySub$.subscribe((res) => {
					AppData.userLoginDay = res;
				});
			}
		})
		if (this.storage.getItem("userLoginDay") !== null) {
			AppData.userLoginDaySub$.next(this.storage.getItem("userLoginDay"));
			AppData.userLoginDaySub$.subscribe((res) => {
				AppData.userLoginDay = res;
			});
		}

		AppData.versionSub$.subscribe((res) => {
			console.log('versionSub$', res);
			if (res !== '' && res !== null) {
				console.log('versionSub$ num', res);
				AppData.version = res;
			}
		})

	}

	setToken(token: string) {
		this.storage.setItem("token", token);
		// AppData.token = token;
	}

	isAuthenticatedFunction() {
		return !(this.storage.getItem("token") === null);
	}
}
