import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ALLOWED_CERTIFICATE_TYPE, OUTLET_FORM_STATUS, UPLOAD_FILE_BEAN } from 'src/app/core/constants/app-constants';
import { ErrorMessage } from 'src/app/core/constants/validation-msg-constants';
import { AppData } from 'src/app/shared/services/app-data.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { getInputFieldValidation, maxNumToBeAllowed } from 'src/app/shared/utils/common-functions';
import { FssaiDetails } from '../../model/fssai-details.model';
import { OutletDetails } from '../../model/outlet-details.model';
import { ProfileService } from '../../services/profile.service';


@Component({
  selector: 'app-fssai',
  templateUrl: './fssai.page.html',
  styleUrls: ['./fssai.page.scss'],
})
export class FssaiPage implements OnInit {

  isLicense = false;
  fssaiForm: FormGroup;
  fssaiDetailsModel = new FssaiDetails();
  outletDetailsSubscription = new Subscription();
  outletModel = new OutletDetails();
  isViewCertificate = false;
  startMinDate = new Date().toISOString();
  submitted = false;
  formInit = false;
  fssaiReadOnly = false;
  certificateBean = UPLOAD_FILE_BEAN;
  certificateName: string = null;
  certificateLink: string;
  maxYear = new Date().getFullYear() + 5;
  cityStatesCopy;
  showCity = true;
  validUpto: any;


  constructor(private fb: FormBuilder,
    private toaster: ToastService,
    private profileService: ProfileService) {
    this.outletDetailsSubscription = AppData.outletDetailsSub$.subscribe((outletsData) => {
      this.outletModel = Object.assign(this.outletModel, outletsData);
      if (outletsData?.fssai) {
        this.fssaiDetailsModel = Object.assign(this.fssaiDetailsModel, outletsData['fssai']);
        this.initForm();
        // this.setDataView();
        console.log(outletsData['fssai']);
      } else {
        this.initForm();
      }
    });
  }

  ngOnInit() {
  }

  onDateChange(event) {
    this.validUpto = event.detail.value;
  }

  setDataView() {
    
    const date = new Date(this.fssaiForm.controls['validUpto'].value);
    console.log(this.fssaiDetailsModel['validUpto']);
    const expireDate = { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
    console.log(expireDate);
    this.fssaiForm.controls['validUpto'].setValue(expireDate, { emit: false });
    this.isViewCertificate = this.fssaiDetailsModel._certificateLink !== '' ? true : false;
  }

  // Forms Handling
  initForm() {
    this.fssaiForm = this.fb.group({
      lic: [this.fssaiDetailsModel['lic'], [Validators.required, Validators.min(10000000000000), Validators.max(99999999999999)]],
      validUpto: [{value: this.fssaiDetailsModel['validUpto'], disabled: this.fssaiReadOnly}],
      fssaiEntered: [this.fssaiDetailsModel['fssaiEntered']],
      uploadCertificate: [{ value: this.fssaiDetailsModel['updateCert'], disabled: true }]
    });
    this.formInit = true;

    this.fssaiDetailsModel = Object.assign(this.fssaiDetailsModel, new FssaiDetails());
    this.removeValidation();
    // this.fssaiForm.controls["lic"].setValue("", { emitEvent: false });
    // this.fssaiForm.controls["validUpto"].setValue("", { emitEvent: false });
    // this.fssaiForm.controls['fssaiEntered'].setValue(false, { emitEvent: false });

    this.fssaiForm.get('fssaiEntered').valueChanges.subscribe((val) => {
      console.log(val)
      if (val) {
        this.addValidation();
      } else {
        this.fssaiDetailsModel = Object.assign(this.fssaiDetailsModel, new FssaiDetails());
        this.removeValidation();
        // this.fssaiForm.controls["lic"].setValue("", { emitEvent: false });
        // this.fssaiForm.controls["validUpto"].setValue("", { emitEvent: false });
        // this.fssaiForm.controls['fssaiEntered'].setValue(false, { emitEvent: false });
      }
    });
  }

  // for checking valid fields
  getValid(fieldName) {
    return getInputFieldValidation(this.fssaiForm, fieldName, this.submitted);
  }

  onKeyPress(event) {
    return maxNumToBeAllowed(event, 14);
  }


  removeValidation() {
    this.fssaiReadOnly = true;
    this.fssaiForm.controls["lic"].setValidators([]);
    this.fssaiForm.controls["validUpto"].setValidators([]);
  }

  addValidation() {
    this.fssaiForm.controls["lic"].setValidators([Validators.required, Validators.min(10000000000000), Validators.max(99999999999999)]);
    this.fssaiForm.controls["lic"].updateValueAndValidity();
    this.fssaiForm.controls["validUpto"].setValidators([Validators.required]);
    this.fssaiForm.controls["validUpto"].updateValueAndValidity();
    this.fssaiReadOnly = false;
  }

  // for upload certificate
  onCertificateSelect(event) {
    const file: File = event.target.files[0];
    if (event.target.files && file) {
      if (ALLOWED_CERTIFICATE_TYPE.indexOf(file.type) !== -1) {
        const totalSizeMB = Math.round(file.size / Math.pow(1024, 2));
        if (totalSizeMB < 2) {
          const splitArray = file.name.split('.');
          const type = splitArray[splitArray.length - 1];
          this.certificateBean['name'] = file.name;
          this.certificateBean['contentType'] = file.type ? file.type : type;
          this.certificateBean['size'] = file.size;
          const reader: FileReader = new FileReader();
          reader.onloadend = e => {
            this.certificateBean['bytes'] = reader.result;
          };
          reader.readAsDataURL(file);
          this.certificateName = this.certificateBean.name;
        } else {
          this.toaster.presentToast(ErrorMessage.MAX_FILE_SIZE_MSG, 'Warning');
        }
      } else {
        this.toaster.presentToast(ErrorMessage.ALLOWED_DOC_TYPE_MSG, 'Warning');
      }
    }
  }

  // for save FSSAI details
  onFSSAIDetailsSubmit() {
    this.submitted = true;
    console.log(this.fssaiForm);
    
    if (this.fssaiForm.controls['fssaiEntered'].value) {
      this.setDataView();
      this.fssaiDetailsModel = Object.assign(this.fssaiDetailsModel, this.fssaiForm.value);
      this.fssaiDetailsModel._outletId = AppData.outletId;
      this.fssaiDetailsModel['status'] = OUTLET_FORM_STATUS;
      console.log(this.fssaiDetailsModel);
      
      const eDate = new Date(this.fssaiDetailsModel['validUpto']['year'],
      this.fssaiDetailsModel['validUpto']['month'] - 1, this.fssaiDetailsModel['validUpto']['day']);
      const isoSDateTime = new Date(eDate.setHours(0, 0, 0, 0)).toISOString();
      this.fssaiDetailsModel['validUpto'] = isoSDateTime;
      if (this.certificateName !== null) {
        this.fssaiDetailsModel['certificateName'] = this.certificateName;
        this.fssaiDetailsModel['certificateLink'] = this.certificateBean.bytes;
        this.fssaiDetailsModel['updateCert'] = true;
      } else {
        this.fssaiDetailsModel['updateCert'] = false;
      }

      if (this.fssaiForm.valid) {
        const todayDate = new Date();
        const cDate = new Date(todayDate.setHours(0, 0, 0, 0));
        const validUptoDate = new Date(this.fssaiDetailsModel['validUpto']);
        if (validUptoDate.getTime() >= cDate.getTime()) {
          if (this.fssaiDetailsModel['certificateLink'] !== '') {
            this.onSaveFSSAIDetails();
          } else {
            this.toaster.presentToast(ErrorMessage.UPLOAD_CERTIFICATE_MSG, 'Warning');
          }
        } else {
          this.toaster.presentToast(ErrorMessage.CERTIFICATE_EXPIRE_DATE_MSG, 'Warning');
        }
      } else {
        return;
      }
    } else {
      console.log(this.fssaiDetailsModel);
      this.fssaiDetailsModel._validUpto = '';
      this.fssaiDetailsModel._outletId = AppData.outletId;
      this.isViewCertificate = false;
      this.onSaveFSSAIDetails();
    }

  }

  onSaveFSSAIDetails() {
    if (this.fssaiForm.valid) {
      this.profileService.saveOutletDetails(this.fssaiDetailsModel).then((response) => {
        const responseData = response['body']['data'];
        this.fssaiDetailsModel._certificateLink = responseData['certificateLink'];

        this.profileService.setOutletStatus(AppData.outletId, responseData['newOutletStatus']);
        // for add FSSAI details value in outletDetails behavior subject data
        this.outletModel['fssai'] = Object.assign(this.outletModel['fssai'], this.fssaiDetailsModel);
        AppData.outletDetailsSub$.next(this.outletModel);
        setTimeout(() => {
          this.profileService.navigation(4);
        }, 1000);

      });
    }
  }

  // for view certificate
  viewCertificate() {
    const body = {
      link: this.fssaiDetailsModel._certificateLink
    };
    this.profileService.getCertificateLink(body).then((response) => {
      this.certificateLink = response['body']['data']['link'];
      window.open(this.certificateLink);
    });
  }

  close(event) {
    console.log(event.target.parentElement);
    event.target.parentElement.classList.add('none');
  }

  back() {
    this.profileService.navigation(2);
  }

  saveAndProceed() {
    this.onFSSAIDetailsSubmit();
  }


}
