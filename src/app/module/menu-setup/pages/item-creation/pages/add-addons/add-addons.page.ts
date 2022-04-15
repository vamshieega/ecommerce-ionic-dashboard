import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { CONFIRM_MODAL, COUNTRY_TYPE, ROUTES_STR } from 'src/app/core/constants/app-constants';
import { ConfirmationmodalPage } from 'src/app/shared/component/confirmationmodal/confirmationmodal.page';
import { AppData } from 'src/app/shared/services/app-data.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { VariantModalPage } from '../variant-modal/variant-modal.page';

@Component({
  selector: 'app-add-addons',
  templateUrl: './add-addons.page.html',
  styleUrls: ['./add-addons.page.scss'],
})
export class AddAddonsPage implements OnInit {

  addonDetails = [];
  tempAddonDetails = [];
  currency = COUNTRY_TYPE[AppData.restData?.config.currency];
  itemAddonsForm: FormGroup;
  changedControlName: any;
  addonOptions = [];
  addonsPage: boolean;
  addonIndex: number = 0;
  editAddon = false;
  minMaxDiscount: boolean;
  title: any;
  count = 1;

  constructor(private fb: FormBuilder, private navCtrl: NavController, private platform: Platform,
    private toast: ToastService, private router: Router, private modalController: ModalController) {

    AppData.navigationSub$.subscribe((res) => {
      if (res === 'addAddon' && this.count === 1) {
        this.count = this.count + 1;
        this.backPage();
        AppData.navigationSub$.next('');
      }
    });

    AppData.addonDetailsSub$.subscribe((res) => {
      this.addonDetails = res;
    });
  }

  ngOnInit() {
    this.initForm();
    this.addonsPage = this.router.getCurrentNavigation().extras?.state.addonsPage;
  }

  initForm() {
    this.itemAddonsForm = this.fb.group({
      addonId: [''],
      addonName: ['', Validators.required],
      currentVariant: [false],
      isVariant: [false],
      minSelection: ['', Validators.required],
      maxSelection: ['', Validators.required],
      status: ['active'],
      options: []
    }
      , { validators: this.minMaxValidator.bind(this, 'minSelection', 'maxSelection') }
    );

    this.itemAddonsForm.controls.minSelection.valueChanges.subscribe(val => {
      this.changedControlName = 'minSelection';
    });

    this.itemAddonsForm.controls.maxSelection.valueChanges.subscribe(val => {
      this.changedControlName = 'maxSelection';
    });
    this.title = 'Add-on options';
  }

  minMaxValidator: any = (min: string, max: string, fg: FormGroup) => {
    const maxValueControl = fg.get(max);
    const maxValue = maxValueControl.value;
    const minimumValueControl = fg.get(min);
    const minimumValue = minimumValueControl.value;
    switch (this.changedControlName) {
      case max:
        if (maxValue && minimumValue && maxValue < minimumValue) {
          return { maxValueInvalid: true }
        }
        break;
      case min:
        if (minimumValue && maxValue && minimumValue > maxValue) {
          return { minValueInvalid: true }
        }
        break;
      default:
        return null;
    }
    return null;
  };

  async deleteAddonOptions(index) {
    let modal = await this.modalController.create({
      component: ConfirmationmodalPage,
      cssClass: 'Confirmationmodal',
      componentProps: {
        icon: CONFIRM_MODAL.switch_off_Icon,
        title: CONFIRM_MODAL.delete_variant,
        endMsg: CONFIRM_MODAL.save
      }
    });
    modal.onDidDismiss().then(async (res) => {
      if (res.data) {
        this.addonDetails.splice(index, 1);
        AppData.addonDetailsSub$.next(this.addonDetails);
      }
    })
    return await modal.present();
  }

  createAddonsFn() {
    this.title = 'Create Addon'
    this.addonsPage = true;
    this.initForm();
  }


  editAddonOptions(i) {
    this.addonsPage = true;
    this.editAddon = true;
    this.initForm();
    this.addonIndex = i;
    this.itemAddonsForm.controls.addonName.setValue(this.addonDetails[this.addonIndex].addonName, { emit: false });
    this.itemAddonsForm.controls.minSelection.setValue(this.addonDetails[this.addonIndex].minSelection);
    this.itemAddonsForm.controls.maxSelection.setValue(this.addonDetails[this.addonIndex].maxSelection);
    this.addonOptions = this.addonDetails[this.addonIndex].options;
  }

  async deleteOptionAddon(index) {
    let modal = await this.modalController.create({
      component: ConfirmationmodalPage,
      cssClass: 'Confirmationmodal',
      componentProps: {
        icon: CONFIRM_MODAL.switch_off_Icon,
        title: CONFIRM_MODAL.delete_variant,
        endMsg: CONFIRM_MODAL.save
      }
    });
    modal.onDidDismiss().then(async (res) => {
      if (res.data) {
        this.addonOptions.splice(index, 1);
      }
    })
    return await modal.present();
  }

  async editOptionsAddon(index) {
    let modal = await this.modalController.create({
      component: VariantModalPage,
      cssClass: 'itemViewModal',
      backdropDismiss: false,
      componentProps: {
        addonOption: this.addonOptions[index],
        index: index,
        type: 'addon',
        action: 'Edit'
      }
    });
    modal.onDidDismiss().then(async (res) => {
      if (res.data) {
        this.itemAddonsForm.controls.options.setValue(res.data['addonOptions']);
        this.addonOptions[res.data['index']] = res.data['addonOptions'];
      }
    })
    return await modal.present();
  }

  getVegNonVegItem(isVeg, containsEgg) {
    if (isVeg) {
      return containsEgg === true ? 'Egg' : 'Veg';
    }
    return 'Non-Veg';
  }

  async addOptionsAddon() {
    let modal = await this.modalController.create({
      component: VariantModalPage,
      cssClass: 'itemViewModal',
      backdropDismiss: false,
      componentProps: {
        type: 'addon',
        action: 'New'
      }
    });
    modal.onDidDismiss().then(async (res) => {
      if (res.data) {
        this.addonOptions.push(res.data['addonOptions']);
        this.itemAddonsForm.controls.options.setValue(this.addonOptions);
      }
    })
    return await modal.present();
  }

  onDirtyTouchInp(controlName: string) {
    return this.itemAddonsForm.controls[controlName].touched || this.itemAddonsForm.controls[controlName].dirty;
  }

  onAddonmax(event) {
    this.itemAddonsForm.controls.maxSelection.setValue(event.target.value);
    if (this.editAddon) {
      this.addonDetails[this.addonIndex].maxSelection = event.target.value;
    }
  }

  onAddonmin(event) {
    this.itemAddonsForm.controls.minSelection.setValue(event.target.value);
    if (this.editAddon) {
      this.addonDetails[this.addonIndex].minSelection = event.target.value;
    }
  }

  onAddonFormSubmit(event) {
    if (this.addonsPage) {
      this.itemAddonsForm.controls.addonName.setValue(this.itemAddonsForm.value.addonName);
      if (this.editAddon) {
        this.addonDetails[this.addonIndex].addonName = event.target.value;
      }
    }
  }

  backPage() {
    if (!this.editAddon && this.addonsPage) {
      if (this.itemAddonsForm.valid && this.addonOptions.length >= this.itemAddonsForm.value.minSelection && this.addonOptions.length !== 0) {
        this.itemAddonsForm.controls.options.setValue(this.addonOptions);
        let obj = { ...this.itemAddonsForm.value }
        this.addonDetails.push(obj)
        AppData.addonDetailsSub$.next(this.addonDetails);
        return this.navCtrl.back();
      }
      else if (this.itemAddonsForm.valid && this.addonOptions.length === 0) {
        this.toast.presentToast('Please add variant options to create variant.', 'toast-error');
        setTimeout(() => {
          return this.navCtrl.back();
        }, 2000);
      }
      else if (this.addonOptions.length < this.itemAddonsForm.value.minSelection) {
        this.toast.presentToast('Before adding new addon. In Addon ' + this.itemAddonsForm.value.addonName + '  you have Entered Min of '
          + this.itemAddonsForm.value.minSelection + ' addons limit , please add ' +
          (this.itemAddonsForm.value.minSelection - this.addonOptions.length) + ' more', 'toast-error');
        this.count = 1;
      }
      else {
        return this.navCtrl.back();
      }
    }
    else if (!this.addonsPage || this.editAddon) {
      return this.navCtrl.back();
    }
  }
}
