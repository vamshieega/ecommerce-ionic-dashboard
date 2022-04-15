import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { CONFIRM_MODAL, COUNTRY_TYPE } from 'src/app/core/constants/app-constants';
import { ConfirmationmodalPage } from 'src/app/shared/component/confirmationmodal/confirmationmodal.page';
import { AppData } from 'src/app/shared/services/app-data.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { VariantModalPage } from '../variant-modal/variant-modal.page';
@Component({
  selector: 'app-add-variant',
  templateUrl: './add-variant.page.html',
  styleUrls: ['./add-variant.page.scss'],
})
export class AddVariantPage implements OnInit {

  variantDetails = [];
  currency = COUNTRY_TYPE[AppData.restData?.config.currency];
  itemVariantForm: FormGroup;
  variantOptions = [];
  count = 1;

  constructor(private fb: FormBuilder, private navCtrl: NavController,
    private toast: ToastService, private modalController: ModalController) {
    AppData.navigationSub$.subscribe((res) => {
      console.log('appData variant back btn', res);
      if (res === 'addVariant' && this.count === 1) {
        this.count = this.count + 1;
        this.backPage();
        AppData.navigationSub$.next('');
      }
    });
  }

  ngOnInit() {
    this.initForm();
    AppData.variantDetailsSub$.subscribe((res) => {
      this.variantDetails = res;
    });
    this.initForm();
    this.setFormValue();
  }

  initForm() {
    this.itemVariantForm = this.fb.group({
      addonId: [''],
      addonName: ['', Validators.required],
      currentVariant: [false],
      isVariant: [true],
      minSelection: [1],
      maxSelection: [1],
      status: ['active'], //last 
      options: []
    });
  }

  onAddonFormSubmit(event) {
    this.itemVariantForm.controls.addonName.setValue(this.itemVariantForm.value.addonName);
  }

  setFormValue() {
    if (this.variantDetails.length > 0) {
      this.itemVariantForm.controls.addonName.setValue(this.variantDetails[0].addonName, { emit: false });
      this.itemVariantForm.controls.addonId.setValue(this.variantDetails[0].addonId, { emit: false });
      this.itemVariantForm.controls.options.setValue(this.variantDetails[0].options);
      this.variantOptions = this.variantDetails[0].options;
    }
  }

  getVegNonVegItem(isVeg, containsEgg) {
    if (isVeg) {
      return containsEgg === true ? 'Egg' : 'Veg';
    }
    return 'Non-Veg';
  }

  async addOptions() {
    let modal = await this.modalController.create({
      component: VariantModalPage,
      cssClass: 'itemViewModal',
      backdropDismiss: false,
      componentProps: {
        type: 'variant',
        action: 'New'
      }
    });
    modal.onDidDismiss().then(async (res) => {
      if (res.data) {
        this.itemVariantForm.controls.options.setValue(res.data['variantOptions']);
        this.variantOptions.push(res.data['variantOptions']);
      }
    })
    return await modal.present();
  }

  async editOptions(index) {
    let modal = await this.modalController.create({
      component: VariantModalPage,
      cssClass: 'itemViewModal',
      backdropDismiss: false,
      componentProps: {
        variantOption: this.variantOptions[index],
        index: index,
        type: 'variant',
        action: 'Edit'
      }
    });
    modal.onDidDismiss().then(async (res) => {
      if (res.data) {
        this.itemVariantForm.controls.options.setValue(res.data['variantOptions']);
        this.variantOptions[res.data['index']] = res.data['variantOptions'];
      }
    })
    return await modal.present();
  }

  async deleteOption(index) {
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
        this.variantOptions.splice(index, 1);
      }
    })
    return await modal.present();
  }

  backPage() {
    if (this.itemVariantForm.valid && this.variantOptions.length !== 0) {
      this.itemVariantForm.controls.options.setValue(this.variantOptions)
      AppData.variantDetailsSub$.next([this.itemVariantForm.value]);
      return this.navCtrl.back();
    }
    else if (this.itemVariantForm.valid && this.variantOptions.length === 0) {
      this.toast.presentToast('Please add variant options to create variant.', 'toast-error');
      setTimeout(() => {
        return this.navCtrl.back();
      }, 2000);
    }
    else {
      return this.navCtrl.back();
    }
  }

}