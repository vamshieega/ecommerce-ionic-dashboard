import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { fromEvent, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { DashboardStepStatus, DEFAULT_COLORS, MENU_LAYOUT_CODE } from 'src/app/core/constants/app-constants';
import { ErrorMessage } from 'src/app/core/constants/validation-msg-constants';
import { ColorPaletteModalPage } from 'src/app/shared/component/color-palette-modal/color-palette-modal.page';
import { AccountConfigModel, DashboardStep, SelectLoc, ThemeConfig } from 'src/app/shared/models/accountConfig.model';
import { AppData } from 'src/app/shared/services/app-data.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { contrast, getInputFieldValidation, hexToRGB, maxNumToBeAllowed } from 'src/app/shared/utils/common-functions';
import { MerchantService } from '../merchant/services/merchant.service';
import { SignupService } from '../signup/services/signup.service';
import { AccountConfigService } from './services/account-config.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.page.html',
  styleUrls: ['./account-setting.page.scss'],
})
export class AccountSettingPage implements OnInit {

  @ViewChild('storeName', { static: false }) input: ElementRef;

  accountConfigForm: FormGroup;
  accountConfigModel = new AccountConfigModel();
  themeConfig = new ThemeConfig();
  formInit = false;
  menuLayoutCode = MENU_LAYOUT_CODE;
  menuDisplayCode;
  checked = false;
  submitted = false;
  primaryColor: string;
  secondaryColor: string;
  showClrError = false;
  restId: String;
  storeNameUrl: string;
  step: DashboardStep;
  stepStatus = DashboardStepStatus;
  domainResponseData;
  restData;
  dataSaved = false;
  isDomainPresent = false;

  constructor(private formBuilder: FormBuilder,
    private merchantService: MerchantService,
    private signupService: SignupService,
    private toast: ToastService,
    private modalController: ModalController,
    private accountConfigService: AccountConfigService
  ) {
    AppData.restDataSub$.subscribe((restData) => {
      this.restData = restData;
      if (restData) {
        this.merchantService.setRestaurantProfile(restData);
        this.accountConfigModel = Object.assign(this.accountConfigModel, this.merchantService.restaurantProfile._config);
        this.restId = this.merchantService.restaurantProfile._restId;
        this.menuDisplayCode = this.accountConfigModel['theme']['menuDisplayType'];
        this.domainResponseData = restData?.config.hostUrl;
      }
    });
  }

  ngOnInit() {
    this.domainResponseData = this.restData?.config.hostUrl;
    this.storeNameUrl = this.domainResponseData;
    if (this.restId === '') {
      this.merchantService.getRestData().then((data) => {
        this.accountConfigModel = Object.assign(this.accountConfigModel, this.merchantService.restaurantProfile._config);
        this.initForm();
      });
    } else {
      this.initForm();
    }

    this.merchantService.getRestData().then((data) => {
      this.accountConfigModel = Object.assign(this.accountConfigModel, this.merchantService.restaurantProfile._config);
      this.restId = this.merchantService.restaurantProfile._restId;
      this.primaryColor = this.accountConfigModel._theme['colors']['--primary-clr'] || DEFAULT_COLORS.primaryColor;
      this.secondaryColor = this.accountConfigModel._theme['colors']['--secondary-clr'] || DEFAULT_COLORS.secondaryColor;
      this.initForm();
      if (this.menuDisplayCode === this.menuLayoutCode.NORMAL_MENU_ITEM) {
        this.checked = true;
        this.accountConfigModel._theme._menuDisplayType = this.menuDisplayCode;
      } else {
        this.checked = false;
      }
    });
  }

  ngAfterViewInit(): void {
    this.onStoreNameInputField()
  }

  onStoreNameInputField() {
    fromEvent(this.input.nativeElement, 'keyup').pipe(filter(Boolean),
      map(p => { return p }), debounceTime(500), distinctUntilChanged(), tap((event: KeyboardEvent) => {
        let inputValue = this.input.nativeElement.value;
        if (inputValue.length === 0) {
          this.storeNameUrl = ''
        }
        if (inputValue.length >= 3) {
          this.signupService.storeNameValidation(this.input.nativeElement.value).then((resp) => {
            const responseData = resp['body']['data'];
            this.isDomainPresent = false;
            if (responseData.type === 'success') {
              this.storeNameUrl = resp['body'].data.data.hostUrl;
              this.isDomainPresent = false;
            } else {
              this.isDomainPresent = true;
            }
          });
        }
      }, catchError(error => { return of(error) }))
    ).subscribe();
  }

  initForm() {
    this.accountConfigForm = this.formBuilder.group({
      'menuDisplayType': [this.accountConfigModel['theme']['menuDisplayType'].toString(), [Validators.required]],
      'primaryColor': [this.primaryColor, [Validators.required]],
      'secondaryColor': [this.secondaryColor, [Validators.required]],
      'storeName': [this.restData?.config.appName || '', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'businessCategory': ['b2b', [Validators.required]]
    });

    this.formInit = true;
  }

  getValid(fieldName) {
    return getInputFieldValidation(this.accountConfigForm, fieldName, this.submitted);
  }

  onSelectMenuLayout(layout) {
    this.menuDisplayCode = layout;
  }

  async onItemLayoutSubmit() {
    this.submitted = true;

    if (this.accountConfigForm.valid) {
      if (!this.isDomainPresent) {
        this.accountConfigModel._siteContent['selectLoc'] = new SelectLoc();
        this.accountConfigModel._theme['menuDisplayType'] = Number(this.accountConfigForm.value.menuDisplayType);
        this.accountConfigModel._theme['colors'] = this.themeConfig.generateJson(
          this.accountConfigForm.value.primaryColor.toUpperCase(),
          this.accountConfigForm.value.secondaryColor.toUpperCase())
        await this.accountConfigService.saveDetails(JSON.stringify(Object.assign({ restId: this.restId }, this.accountConfigModel)));
        await this.merchantService.getRestData().then((res) => {
          if (!this.restData?.config.hostUrl) {
            this.domainSave();
          }
        });
        this.domainResponseData = this.restData?.config.hostUrl;
      } else {
        this.toast.presentToast(ErrorMessage.STORE_NAME_EXIT_MSG, 'toast-error');
        this.scrollToFirstInvalidControl();
      }

    } else {
      this.accountConfigForm.markAllAsTouched();
      this.scrollToFirstInvalidControl();
      return;
    }
  }

  scrollToFirstInvalidControl() {
    const firstElementWithError: HTMLElement = document.querySelector('form .ng-invalid');
    if (firstElementWithError) {
      firstElementWithError.scrollIntoView({ behavior: 'smooth', block: "center" });
    }
  }

  domainSave() {
    if (this.accountConfigForm.value) {
      let domainData = {
        storeName: this.accountConfigForm.controls.storeName.value,
        businessCategory: "b2b",
        // businessType: this.accountConfigForm.controls.businessType.value
      }
      this.accountConfigService.completeSignUp(domainData).then((value) => {
        if (value) {
          this.dataSaved = true;
          this.accountConfigService.domainSave.next(value);
          let deployObj = {
            "initStep": "deploy"
          }
          this.accountConfigService.onCompleteSignUpSuccess(deployObj);
        }
      });
    }
  }

  onSelectPrimaryColor(color) {
    this.accountConfigForm.controls['primaryColor'].setValue(color.toUpperCase());
    this.checkColorConst();
  }

  onSelectSecColor(color) {
    this.accountConfigForm.controls['secondaryColor'].setValue(color.toUpperCase());
    this.checkColorConst();
  }

  async openColorPalette() {
    let modal = await this.modalController.create({ component: ColorPaletteModalPage, cssClass: 'colorPaletterModal-page' });
    modal.onDidDismiss().then(async (res) => {
      if (res.data !== undefined) {
        this.primaryColor = res.data.primaryColor;
        this.secondaryColor = res.data.secondaryColor;
        this.onSelectPrimaryColor(res.data.primaryColor);
        this.onSelectSecColor(res.data.secondaryColor);
      }
    });
    return await modal.present();
  }

  onColorChange(event, type) {
    if (type === 'PC') {
      this.primaryColor = event.target.value;
    } else {
      this.secondaryColor = event.target.value;
    }
  }

  onKeyPress(event, maxLength) {
    return maxNumToBeAllowed(event, maxLength);
  }

  checkColorConst() {
    const primary = this.accountConfigForm.value['primaryColor'];
    const secondary = this.accountConfigForm.value['secondaryColor'];
    const primaryRGB = primary ? hexToRGB(primary) : '';
    const secondaryRGB = secondary ? hexToRGB(secondary) : '';
    const constVal = contrast(primaryRGB, secondaryRGB);
    if (constVal <= 3) {
      this.showClrError = true;
    } else {
      this.showClrError = false;
    }
  }

}
