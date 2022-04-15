import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GSTIN_TAXES, OUTLET_FORM_STATUS } from 'src/app/core/constants/app-constants';
import { AppData } from 'src/app/shared/services/app-data.service';
import { getInputFieldValidation } from 'src/app/shared/utils/common-functions';
import { GSTInDetails } from '../../model/gst-details.model';
import { OutletDetails } from '../../model/outlet-details.model';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-billing-and-taxes',
  templateUrl: './billing-and-taxes.page.html',
  styleUrls: ['./billing-and-taxes.page.scss'],
})
export class BillingAndTaxesPage implements OnInit, OnDestroy {

  outletDetailsSubscription = new Subscription();
  gstInForm: FormGroup;
  gstInDetailsModel = new GSTInDetails();
  submitted = false;
  gstinTaxes = GSTIN_TAXES;
  formInit = false;
  outletModel = new OutletDetails();

  constructor(private formBuilder: FormBuilder,
    private profileService: ProfileService) {
      this.outletDetailsSubscription = AppData.outletDetailsSub$.subscribe((outletData) => {
        this.outletModel = Object.assign(this.outletModel, outletData);
        console.log(outletData);
        if (outletData) {
          this.gstInDetailsModel = Object.assign(this.gstInDetailsModel, outletData['gstin']);
          this.initForm();
        }
      });
  }

  ngOnInit() {
    this.initForm();
		if (this.gstInForm.controls.gstinEntered.value === false) {
			this.includeTaxNo();
		}
		console.log(this.gstInDetailsModel);
  }

  initForm() {
    this.gstInForm = this.formBuilder.group({
      gstinEntered: [this.gstInDetailsModel['gstinEntered'].toString()],
      gstinNumber: [this.gstInDetailsModel['gstinNumber']],
			gstApplicableOn: [this.gstInDetailsModel['gstApplicableOn']],
			gstinPercent: [this.gstInDetailsModel['gstinPercent']]
		});
    this.formInit = true;
		this.gstInForm.controls['gstinEntered'].valueChanges.subscribe((value) => {
			console.log(value);
			if (value === 'true') {
				this.gstInForm.controls['gstinNumber'].setValidators([
          Validators.required, Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')
        ]);
				this.gstInForm.updateValueAndValidity();
			} else {
				this.removeValidators();
			}
		});
  }


  getValid(fieldName) {
		return getInputFieldValidation(this.gstInForm, fieldName, this.submitted);
	}

  includeTaxNo() {
		this.removeValidators();
		this.gstInForm.controls['gstinNumber'].setValue('', { emitEvent: false });
		this.gstInForm.controls['gstinEntered'].setValue(false, { emitEvent: false });
		this.gstInForm.controls['gstApplicableOn'].setValue('', { emitEvent: false });
		this.gstInForm.controls['gstinPercent'].setValue('0', { emitEvent: false });
	}

  removeValidators() {
		this.gstInForm.removeControl('gstinNumber');
		this.gstInForm.addControl('gstinNumber', new FormControl());
		console.log(this.gstInForm);
	}

  onGSTInDetailsSubmit() {
		console.log(this.gstInForm.value);
		console.log(this.gstInForm);
		this.submitted = true;
		this.gstInDetailsModel = Object.assign(this.gstInDetailsModel, this.gstInForm.value);
		this.gstInDetailsModel._outletId = AppData.outletId;
		this.gstInDetailsModel['status'] = OUTLET_FORM_STATUS;
		this.gstInDetailsModel._gstinType = this.gstInDetailsModel._gstinEntered === true ? 'composition' : 'NA';
		if (this.gstInForm.valid) {
			this.profileService.saveOutletDetails(this.gstInDetailsModel).then((response) => {
				const responseData = response['body']['data'];
				this.profileService.setOutletStatus(responseData['outletId'], responseData['newOutletStatus']);
				// for add gstin details value in outletDetails behavior subject data
				this.outletModel['gstin'] = Object.assign(this.outletModel['gstin'], this.gstInDetailsModel);
				AppData.outletDetailsSub$.next(this.outletModel);
				setTimeout(()=>{
					this.profileService.navigation(3);
				  },1000);
			});
		} else {
			return;
		}
		console.log(this.gstInDetailsModel);

	}

  back() {
    this.profileService.navigation(1);
  }

  saveAndProceed() {
    this.onGSTInDetailsSubmit();
  }

  ngOnDestroy() {
		this.outletDetailsSubscription.unsubscribe();
	}

}
