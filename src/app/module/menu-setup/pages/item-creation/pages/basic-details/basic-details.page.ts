import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, ModalController } from '@ionic/angular';
import { COUNTRY_TYPE, GSTIN_TAXES, UPLOAD_FILE_BEAN } from 'src/app/core/constants/app-constants';
import { MenuItem } from 'src/app/module/menu-setup/models/menu-item';
import { ImageCropperModalPage } from 'src/app/shared/component/image-cropper-modal/image-cropper-modal.page';
import { AppData } from 'src/app/shared/services/app-data.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { getInputFieldValidation } from 'src/app/shared/utils/common-functions';
import { CategoryService } from '../../../categories/services/category.service';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.page.html',
  styleUrls: ['./basic-details.page.scss'],
})
export class BasicDetailsPage implements OnInit {


  categoryAlertOptions: any = {
    header: 'Item Category'
  };

  subCategoryAlertOptions: any = {
    header: 'Item Sub Category'
  };


  @ViewChild(IonContent, { static: false }) content: IonContent;

  @Output() chargesBilling = new EventEmitter<any>();
  @Input() menuItemDetails: any;
  currency = COUNTRY_TYPE[AppData.restData?.config.currency];

  restLogoUrl = '';
  menuItemModel = new MenuItem;
  formInit: boolean = false;
  itemBasicDetailsForm: FormGroup;
  itemDetailsObj: any;
  isSubmitted: any;
  gstinTaxesList = GSTIN_TAXES;
  changedControlName = '';

  isUploadLogo = false;
  restLogoBean = UPLOAD_FILE_BEAN;
  imageDetails: File;
  localStorageSavedGst;
  categoryDetailsList = [];
  selectedGst;
  selectedGstType = false;
  subCategoryDetailsList = [];

  constructor(private categoryService: CategoryService,
    private fb: FormBuilder,
    private toast: ToastService,
    private modalController: ModalController) { }

  async ngOnInit() {
    this.getCategories();
    this.initAddItemForm();

    if (AppData.outletDetails?.gstin.gstApplicableOn === "outlet") {
      this.localStorageSavedGst = AppData.outletDetails?.gstin.gstinPercent;
      this.selectedGst = this.gstinTaxesList.find(gst => gst.key == this.localStorageSavedGst);
      if (this.selectedGst && AppData.outletDetails?.gstin.gstApplicableOn === "outlet") {
        setTimeout(() => {
          this.itemBasicDetailsForm.get('gst').setValue(this.selectedGst.key);
          this.selectedGstType = true;
        })

      }

    }
  }

  //checked
  ngOnChanges(changes: SimpleChanges) {
    const currentItem: SimpleChange = changes.menuItemDetails;
    if (currentItem.currentValue) {
      this.menuItemModel = { ...currentItem.currentValue };
      this.itemDetailsObj = { ...currentItem.currentValue };
      this.initAddItemForm();
      this.onSetValue();
    }
  }

  //checked
  async getCategories() {
    await this.categoryService.getAllCategories(AppData.outletId).then((res) => {
      const listCategory = res['body']['data']['categories'];
      this.categoryDetailsList = listCategory.filter((list: any) => !list.name.includes('unassigned'));
    }).catch((err) => { });
  }

  //checked
  initAddItemForm() {
    this.itemBasicDetailsForm = this.fb.group({
      name: [this.menuItemModel['name'], [Validators.required]],
      description: [this.menuItemModel['description']],
      imageUrl: [this.menuItemModel['imageUrl']],
      isVeg: [this.menuItemModel['isVeg'], [Validators.required]],
      ribbon: [this.menuItemModel['ribbon']],
      category: [this.menuItemModel['category'], [Validators.required]],
      subCategory: [this.menuItemModel['subCategory']],
      discountAdded: [this.menuItemModel['discountAdded']],
      originalPrice: [this.menuItemModel['originalPrice'], [Validators.required, Validators.min(1)]],
      price: [this.menuItemModel['price']],
      gst: [this.menuItemModel['gst'], [Validators.required]],
    });
    this.formInit = true;
    this.onFormValueChange();
  }

  //checked
  getValid(fieldName) {
    return getInputFieldValidation(this.itemBasicDetailsForm, fieldName, this.isSubmitted);
  }

  //checked
  onRemoveImage() {
    this.restLogoUrl = '';
  }

  //checked
  onSetValue() {
    this.restLogoUrl = this.menuItemModel['imageUrl'];
    if (this.menuItemModel['isVeg']) {
      if (this.menuItemModel['containsEgg']) {
        this.itemBasicDetailsForm.controls.isVeg.setValue('egg', { emit: false });
      } else {
        this.itemBasicDetailsForm.controls.isVeg.setValue('veg', { emit: false });
      }
    } else {
      this.itemBasicDetailsForm.controls.isVeg.setValue('non-veg', { emit: false });
    }
    this.setSubCategory(this.menuItemModel['category']);
  }

  //checked
  onFormValueChange() {
    this.itemBasicDetailsForm.get('gst').valueChanges.subscribe((val) => {
      const emitObj = {
        discountPrice: this.itemBasicDetailsForm['controls']['price'].value,
        gst: val
      }
      this.chargesBilling.emit(emitObj);
    });

    this.itemBasicDetailsForm.get('price').valueChanges.subscribe((val) => {
      this.emitDisAndGst(val, this.itemBasicDetailsForm.value.gst);
    });

    this.itemBasicDetailsForm.get('category').valueChanges.subscribe((val) => {
      this.setSubCategory(val);
    });

    this.itemBasicDetailsForm.get('originalPrice').valueChanges.subscribe((val) => {
      if (!(this.itemBasicDetailsForm.value.discountAdded)) {
        this.itemBasicDetailsForm.controls.price.setValue(val, { emit: false });
      }
      this.emitDisAndGst(this.itemBasicDetailsForm.value.price, this.itemBasicDetailsForm.value.gst);
    });

    this.itemBasicDetailsForm.get('discountAdded').valueChanges.subscribe((val) => {
      if (val) {
        this.itemBasicDetailsForm.controls["price"].setValidators([Validators.required, Validators.min(1)]);
        this.itemBasicDetailsForm.controls["price"].updateValueAndValidity();
        this.emitDisAndGst(this.itemBasicDetailsForm.value.price, this.itemBasicDetailsForm.value.gst);
      } else {
        this.itemBasicDetailsForm.controls["price"].setValidators([]);
        this.itemBasicDetailsForm.controls["price"].updateValueAndValidity();
        this.emitDisAndGst(this.itemBasicDetailsForm.value.originalPrice, this.itemBasicDetailsForm.value.gst);
      }
    });
  }

  //checked
  setSubCategory(val) {
    setTimeout(() => {
      this.subCategoryDetailsList = this.categoryDetailsList.filter((cate: any) => cate.catId.includes(val));
      if (this.subCategoryDetailsList[0]['subCategories'].length > 0) {
        this.itemBasicDetailsForm.controls.subCategory.setValidators(Validators.required);
      } else {
        this.itemBasicDetailsForm.controls.subCategory.setValue('', { emit: false });
        this.itemBasicDetailsForm.controls.subCategory.clearValidators();
      }
      this.itemBasicDetailsForm.controls.subCategory.updateValueAndValidity();
    }, 200);
  }

  //checked
  emitDisAndGst(disPrice, gst) {
    const emitObj = {
      discountPrice: Number(disPrice),
      gst: Number(gst)
    }
    this.chargesBilling.emit(emitObj);
  }

  //checked
  onEnterPrice(val) {
    this.changedControlName = val;
  }

  //checked
  getDetails() {
    this.isSubmitted = true;
    console.log('get details');
    if (this.itemBasicDetailsForm.valid) {
      const formObj = { ...this.itemBasicDetailsForm.value };
      formObj['isVeg'] = this.itemBasicDetailsForm.value['isVeg'] === 'egg' ? true : (formObj['isVeg'] === 'veg' ? true : false);
      formObj['containsEgg'] = this.itemBasicDetailsForm.value['isVeg'] === 'egg' ? true : false;
      formObj['price'] = formObj['discountAdded'] ? formObj['price'] : formObj['originalPrice'];
      console.log('get details', formObj);
      console.log('this.restLogoUrl', this.restLogoUrl);
      if (this.restLogoUrl.indexOf('http') > -1) {
        formObj.imageUrl = this.restLogoUrl;
        console.log('get details if1', formObj);
        return this.sendDetails(formObj);
      } else if (this.restLogoUrl === '') {
        formObj.imageUrl = '';
        console.log('get details if2', formObj);
        return this.sendDetails(formObj);
      } else if (this.restLogoUrl.indexOf('http') === -1 && !(this.imageDetails && this.imageDetails.name)) {
        this.toast.presentToast('Menu item image Url is invalid. Please upload new image', 'toast-error');
      } else {
        formObj.imageUrl = {
          data: this.restLogoUrl,
          name: this.imageDetails.name,
        }
        console.log('get details if3', formObj);
        return this.sendDetails(formObj);
      }

    } else {
      this.itemBasicDetailsForm.markAllAsTouched();
      setTimeout(() => { this.scrollToFirstInvalidControl() }, 100);
      return;
    }
  }

  sendDetails(formObj) {
    if (formObj.discountAdded) {
      if (Number(formObj.originalPrice) >= Number(formObj.price)) {
        return formObj;
      } else {
        this.itemBasicDetailsForm.markAllAsTouched();
        setTimeout(() => { this.scrollToFirstInvalidControl() }, 100);
        this.toast.presentToast('Price Should be less than Original Price', 'toast-error');
      }
    } else {
      return formObj;
    }
  }

  scrollToFirstInvalidControl() {
    // const firstElementWithError: HTMLElement = document.querySelector('form .ng-invalid');
    // if (firstElementWithError) {
    //   firstElementWithError.scrollIntoView({ behavior: 'smooth', block: "center" });
    // }
    const firstElementWithError: HTMLElement = document.getElementById('is-inp-invalid');
    if (firstElementWithError) {
      firstElementWithError.scrollIntoView({ behavior: 'smooth', block: "center" });
    }
  }

  ignoreKeyboardNumber(e) {
    if (this.selectedGstType) {
      if (e.which > 48 || e.which < 57) {
        e.preventDefault();
      }
    }
  }

  async onRestLogoSelect(event) {
    const file: File = event.target.files[0];
    this.imageDetails = file;
    let modal = await this.modalController.create({
      component: ImageCropperModalPage,
      componentProps: { modalObj: event }
    });
    modal.onDidDismiss().then(async (res) => {
      if (res.data) {
        this.restLogoUrl = res.data.imageLink;
      }
    })
    return await modal.present();
  }
}
