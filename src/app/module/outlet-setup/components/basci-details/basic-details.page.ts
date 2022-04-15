import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  BUSINESS_TYPE_LIST,
  ROUTES_STR,
  UPLOAD_FILE_BEAN,
} from 'src/app/core/constants/app-constants';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AppData } from 'src/app/shared/services/app-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { BasicDetails } from '../../model/basic-details.model';
import { getInputFieldValidation } from 'src/app/shared/utils/common-functions';
import { OutletDetails } from '../../model/outlet-details.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ErrorMessage } from 'src/app/core/constants/validation-msg-constants';
import { ProfileService } from '../../services/profile.service';
import { MerchantService } from 'src/app/module/merchant/services/merchant.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.page.html',
  styleUrls: ['./basic-details.page.scss'],
})
export class BasicDetailsPage implements OnInit {
  basicDetailsForm: FormGroup;
  restLogoBean = UPLOAD_FILE_BEAN;

  outletDetailsSubscription = new Subscription();
  addressFormSubscription = new Subscription();
  basicDetailsModel = new BasicDetails();
  outletModel = new OutletDetails();
  submitted = false;
  formInit = false;
  isUploadLogo = false;
  showCloseIcon = false;
  file: File;
  lat: number;
  lng: number;
  mobile: string;
  email: string;
  restLogoUrl = '';
  oldBasicModel;
  addressLine: string;
  dragImageOutletLogo;
  countryCode: any;
  businessTypeList = BUSINESS_TYPE_LIST;
  routeObj;

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    public loaderService: LoaderService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private merchantService: MerchantService,
    private location: Location
  ) {
    AppData.userDataSub$.subscribe((userData) => {
      if (userData) {
        this.countryCode = userData.countryCode;
        this.mobile = userData.mobile;
        this.email = userData.email;
        console.log(userData);
      }
    });
    this.addressFormSubscription =
      this.profileService.manageAddressFrom.subscribe((data) => {
        if (data) {
          console.log('Navigation data' + data);
          this.lat = data.lat;
          this.lng = data.long;
          this.addressLine = data.address.addressLine;
          this.basicDetailsModel['longLat'] = [
            String(this.lng),
            String(this.lat),
          ];

          this.basicDetailsModel = Object.assign(this.basicDetailsModel, data);
        }
      });
    this.outletDetailsSubscription = AppData.outletDetailsSub$.subscribe(
      (outletsData) => {
        console.log(outletsData);
        this.outletModel = Object.assign(this.outletModel, outletsData);

        if (outletsData) {
          this.basicDetailsModel = Object.assign(
            this.basicDetailsModel,
            outletsData['basic']
          );
          this.addressLine = this.basicDetailsModel['address']['addressLine'];
          this.restLogoUrl = this.basicDetailsModel._outletLogo;
          this.oldBasicModel = Object.assign({}, this.basicDetailsModel);
          this.initForm();

        } else {
        }
      }
    );
  }

  initForm() {
    this.basicDetailsForm = this.fb.group({
      outletName: [
        this.basicDetailsModel['outletName'].trim(),
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          this.noWhitespaceValidator,
        ],
      ],
      businessType: [
        this.outletModel['config']['businessType'],
        [Validators.required],
      ],
    });
    this.formInit = true;
    
  }

  ngOnInit() {
    this.oldBasicModel = Object.assign({}, this.basicDetailsModel);
    this.initForm();
    // this.activatedRoute.queryParams.subscribe((params) => {
    //   this.routeObj = params;
    //   if (Object.keys(this.routeObj).length > 0) {
    //     this.addressLine = this.routeObj['addressLine'];
    //   }
    // });
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  onRestLogoSelect(event) {
    const file: File = event.target.files[0];
    this.restLogoBean.contentType = file.type;
    this.restLogoBean.name = file.name;
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.restLogoUrl = event.target['result'] as string;
      this.isUploadLogo = true;
      this.restLogoBean.bytes = this.restLogoUrl;
    };
  }

  onNavigateToManageAddress() {
    if (this.addressLine) {
      const queryParams: NavigationExtras = {
        queryParams: {
          address: this.addressLine,
        },
      };
      this.route.navigate([ROUTES_STR.manageAddress], queryParams);
    } else {
      this.route.navigate([ROUTES_STR.manageAddress]);
    }
  }

  getValid(fieldName) {
    return getInputFieldValidation(
      this.basicDetailsForm,
      fieldName,
      this.submitted
    );
  }

  //ion-select doesnot update by its own, so this line to manually upadate
  onChangeBusinessType(event) {
    this.basicDetailsForm['controls']['businessType'].setValue(
      event.detail.value
    );
  }
  async onBasicDetailsSubmit() {
    this.submitted = true;
    this.basicDetailsModel = Object.assign(
      this.basicDetailsModel,
      this.basicDetailsForm.value
    );
    this.basicDetailsModel['outletId'] = AppData.outletId;
    this.basicDetailsModel._mobile = this.mobile;
    this.basicDetailsModel['email'] = this.email;
    this.basicDetailsModel._locality =
      this.basicDetailsModel['address']['locality'];

    console.log('=> Basic Page form', this.basicDetailsForm);
    if (this.isUploadLogo) {
      this.basicDetailsModel._outletLogo = this.restLogoBean.bytes;
      this.basicDetailsModel._updateLogo = true;
    } else {
      this.basicDetailsModel._updateLogo = false;
    }
    this.basicDetailsModel._logoName = this.restLogoBean.name;
    if (this.basicDetailsForm.valid) {
      const searchLocation = this.basicDetailsModel['address']['addressLine'];
      if (searchLocation !== undefined && searchLocation !== '') {
        if (
          this.basicDetailsModel._outletLogo !== null &&
          this.basicDetailsModel._outletLogo !== ''
        ) {
          if (
            Number(this.basicDetailsModel._longLat[0]) !==
              this.oldBasicModel['longLat'][0] ||
            Number(this.basicDetailsModel._longLat[1]) !==
              this.oldBasicModel['longLat'][1]
          ) {
            this.basicDetailsModel._updateLocation = true;
          }

          this.onSaveBasicOutletDetails();
          setTimeout(() => {
            this.profileService.navigation(1);
          }, 300);
        } else {
          this.toast.presentToast(ErrorMessage.UPLOAD_OUTLET_LOGO, 'Error');
        }
      } else {
        this.toast.presentToast(ErrorMessage.ENTER_ADDRESS_ON_MAP, 'Error');
      }
    } else {
      // stop here if form is invalid
      this.toast.presentToast(ErrorMessage.FORM_VALIDATION_ERROR, 'Error');
      this.scrollToFirstInvalidControl();
      return;
    }
  }
  scrollToFirstInvalidControl() {
    const firstElementWithError: HTMLElement =
      document.querySelector('form .ng-invalid');
    if (firstElementWithError) {
      firstElementWithError.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  async onSaveBasicOutletDetails() {
    console.log('called');
    console.log(this.basicDetailsModel);
    await this.loaderService.show();
    this.profileService
      .saveOutletDetails(this.basicDetailsModel)
      .then(async (response) => {
        const responseData = response['body']['data'];
        console.log(responseData);
        AppData.outletIdSub$.next(responseData['outletId']);
        if (this.isUploadLogo) {
          this.basicDetailsModel._outletLogo = responseData['outletLogo'];
        }
        this.outletModel['basic'] = Object.assign(
          this.outletModel['basic'],
          this.basicDetailsModel
        );
        await this.profileService.setOutletDataInLocalStorage(
          this.basicDetailsModel,
          responseData
        );
        AppData.outletDetailsSub$.next(this.outletModel);
        this.merchantService.getRestData();
        if (AppData.outletList.length === 1) {
          AppData.appPermissionCheckSub$.next('next');
        }
        this.isUploadLogo = false;
        this.submitted = false;
        this.loaderService.hide();
        setTimeout(() => {}, 1000);
      })
      .catch((error) => {
        this.loaderService.hide();
      });
  }
  ngOnDestroy() {
    this.outletDetailsSubscription.unsubscribe();
    this.addressFormSubscription.unsubscribe();
  }
  onBack() {
    this.location.back();
  }
}
