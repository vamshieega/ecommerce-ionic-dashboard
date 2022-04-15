import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { COUNTRY_TYPE, ONLY_CHARACTERS_WITH_AND_DOT, OUTLET_FORM_STATUS } from 'src/app/core/constants/app-constants';
import { ErrorMessage } from 'src/app/core/constants/validation-msg-constants';
import { AppData } from 'src/app/shared/services/app-data.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { getInputFieldValidation } from 'src/app/shared/utils/common-functions';
import { FinancialDetails } from '../../model/financial-details.model';
import { OutletDetails } from '../../model/outlet-details.model';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.page.html',
  styleUrls: ['./bank-details.page.scss'],
})
export class BankDetailsPage implements OnInit, OnDestroy {

  submitted = false;
  financialDetailForm: FormGroup;
  outletDetailsSubscription = new Subscription();
  outletModel = new OutletDetails();
  formInit = false;
  financialDetailsModel = new FinancialDetails();
  isEdit = false;
  enteredAmountData;
  outletId = '';
  initVerification = false;
  initVerificationMsg;
  enterAmount: FormControl = new FormControl();
  currency = COUNTRY_TYPE[AppData.restData?.config.currency];

  constructor(private fb: FormBuilder, private profileService: ProfileService, private toast: ToastService) {
    this.outletDetailsSubscription = AppData.outletDetailsSub$.subscribe((outletData) => {
      this.outletModel = Object.assign(this.outletModel, outletData);
      if (outletData) {
        this.financialDetailsModel = Object.assign(this.financialDetailsModel, outletData['finance']);
        this.initForm();
        this.editChange();
      }

    });

    this.outletId = AppData.outletId;
  }

  ngOnInit() {
    this.initForm();
    this.onEnterAmount();
  }

  // enter amount input value
  onEnterAmount() {
    this.enterAmount.valueChanges.subscribe(
      (value: any) => {
        this.enteredAmountData = value;
      });
  }

  editChange() {
    this.isEdit = this.financialDetailForm.valid;
  }

  // for checking valid fields
  getValid(fieldName) {
    return getInputFieldValidation(this.financialDetailForm, fieldName, this.submitted);
  }

  // showing , hiding amount verification button and drop-down
  showEnterAmount() {
    if (this.isEdit && !this.financialDetailsModel.isAccountVerified) {
      return true;
    }
    return false;
  }

  get f() {
    return this.financialDetailForm.controls;
  }

  initForm() {
    this.financialDetailForm = this.fb.group({
      bankName: [this.financialDetailsModel._bankName, [Validators.required]],
      accountNumber: [this.financialDetailsModel._accountNumber,
      [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      holderName: [this.financialDetailsModel._holderName, [Validators.required,
      Validators.minLength(3), Validators.maxLength(30), Validators.pattern(ONLY_CHARACTERS_WITH_AND_DOT)]],
      ifscCode: [this.financialDetailsModel._ifscCode, [Validators.required, Validators.pattern('^[A-Z]{4}[0][A-Z0-9]{6}$')]],
    });
    this.formInit = true;
  }

  // for save the financial details
  saveDetails() {
    Object.keys(this.financialDetailForm.controls).forEach((key) =>{
      this.financialDetailForm.get(key).setValue(this.financialDetailForm.get(key).value.toString().trim());
    });
    this.submitted = true;
    this.financialDetailsModel = Object.assign(this.financialDetailsModel, this.financialDetailForm.value);
    this.financialDetailsModel._outletId = AppData.outletId; // set outlet id from AppData service

    if (this.financialDetailForm.valid) {
      this.financialDetailsModel['status'] = OUTLET_FORM_STATUS; // set status = active
      this.onSaveFinancialOutletDetails();

    } else {
      return;
    }

  }

   // save financial details
   onSaveFinancialOutletDetails() {
    // for save financial details data
    this.profileService.saveOutletDetails(this.financialDetailsModel).then((response) => {
      const responseData = response['body']['data'];
      if (response['body'].type !== 'error') {
        // for add financial details value in outletDetails behavior subject data
        this.outletModel['finance'] = Object.assign(this.outletModel['finance'], this.financialDetailsModel);
        AppData.outletDetailsSub$.next(this.outletModel);
        this.profileService.setOutletStatus(responseData['outletId'], responseData['newOutletStatus']);
        // for add financial details value in outletDetails behavior subject data
        this.outletModel['finance'] = Object.assign(this.outletModel['finance'], this.financialDetailsModel);
        AppData.outletDetailsSub$.next(this.outletModel);
        this.onInitVerification(this.outletId); //calling init verification if bank details is already not present
        // this.onInitVerification('874abdb0-dbd9-11ea-bcaf-1b1ee2778768');

        // if (responseData) {
        this.editChange();
        // }
      }

    });
  }

  onEdit() {
    this.isEdit = false;
  }

  // on verify enter amount
  onAmountVerify() {
    const amountVerifyData = {
      step: 'verifyBank',
      amount: this.enteredAmountData,
      outletId: this.outletId
    };

    if (this.enteredAmountData) {
      this.profileService.onVerifyAccount(amountVerifyData).then((res: any) => {
        console.log(res['body']['data']);
        const responseData = res['body'];
        if (responseData.type !== 'error') {
          this.financialDetailsModel.isAccountVerified = true;
          this.outletModel['finance'] = Object.assign(this.outletModel['finance'], this.financialDetailsModel);
          AppData.outletDetailsSub$.next(this.outletModel);
          this.toast.presentToast('Information Updated.', 'success');
          setTimeout(() => {
            this.profileService.navigation(5);
          }, 1000);
        } else {
          this.toast.presentToast(responseData['message'], 'error');
        }
      });
    } else {
      this.toast.presentToast(ErrorMessage.AMOUNT_VERIFICATION, 'Error');
    }
  }

  nextpage() {
    setTimeout(() => {
      this.profileService.navigation(5);
    }, 300);
  }


  // Bank Account init Verification
  onInitVerification(outletId) {
    this.profileService.accountInitVerification(outletId).then(
      (value: any) => {
        if (value && value.body &&
          value.body.data && value.body.data.state === 'VERIFICATION_DONE') {
          this.initVerification = true;
          this.initVerificationMsg = value.body.data.state;
        }
      });

  }

  back() {
    this.profileService.navigation(3);
  }

  ngOnDestroy() {
    this.outletDetailsSubscription.unsubscribe();
  }

}
