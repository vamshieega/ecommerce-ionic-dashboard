import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { COUNTRY_TYPE } from 'src/app/core/constants/app-constants';
import { AppData } from 'src/app/shared/services/app-data.service';
import { getInputFieldValidation } from 'src/app/shared/utils/common-functions';

@Component({
  selector: 'app-variant-modal',
  templateUrl: './variant-modal.page.html',
  styleUrls: ['./variant-modal.page.scss'],
})
export class VariantModalPage implements OnInit {

  variantForm: FormGroup;
  index: any;
  type: any;
  action: any;
  variantOption: any;
  addonOption: any;
  tempOrigin = 0;
  tempCost = 0;
  minMaxDiscount = false;
  isSubmitted: any;
  priceName: string;
  currency = COUNTRY_TYPE[AppData.restData?.config.currency];

  constructor(private fb: FormBuilder, private modalController: ModalController) { }

  ngOnInit() {
    this.initForm();
    if (this.type === 'variant' && this.action === 'Edit') {
      this.variantForm.controls.optionName.setValue(this.variantOption.optionName, { emit: false });
      this.variantForm.controls.type.setValue(this.getVegNonVegItem(this.variantOption.isVeg, this.variantOption.containsEgg), { emit: false });
      this.variantForm.controls.originalCost.setValue(this.variantOption.originalCost, { emit: false });
      if (this.variantOption.cost === '' || this.variantOption.cost === null) {
        this.variantForm.controls.cost.setValue(this.variantOption.originalCost, { emit: false });
      } else {
        this.variantForm.controls.cost.setValue(this.variantOption.cost, { emit: false });
      }
    }
    else if (this.type === 'addon' && this.action === 'Edit') {
      this.variantForm.controls.optionName.setValue(this.addonOption.optionName, { emit: false });
      this.variantForm.controls.type.setValue(this.getVegNonVegItem(this.addonOption.isVeg, this.addonOption.containsEgg), { emit: false });
      this.variantForm.controls.cost.setValue(this.addonOption.cost, { emit: false });
    }
    if (this.type === 'variant') {
      this.priceName = 'Discount';
    }
    if (this.type === 'addon') {
      this.variantForm.controls['cost'].setValidators([Validators.required, Validators.pattern(/^[1-9]\d*$/), Validators.min(1)]);
    }
  }

  getVegNonVegItem(isVeg, containsEgg) {
    if (isVeg) {
      return containsEgg === true ? 'Egg' : 'Veg';
    }
    return 'Non-Veg';
  }

  initForm() {
    this.variantForm = this.fb.group({
      optionName: ['', [Validators.required, Validators.maxLength(30)]],
      type: ['', [Validators.required]],
      originalCost: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/), Validators.min(1)]],
      // cost: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/), Validators.min(1)]],
      cost: [''],
    });

  }

  getValid(fieldName) {
    return getInputFieldValidation(this.variantForm, fieldName, this.isSubmitted);
  }

  cancel() {
    this.modalController.dismiss();
  }

  onEnter() {
    if (this.type === 'variant') {
      this.minMaxValidator(this.variantForm.value['originalCost'], this.variantForm.value['cost']);
      this.minMaxDiscount = this.minMaxValidator(this.variantForm.value['originalCost'], this.variantForm.value['cost']);
    }
  }

  minMaxValidator(originalCost, cost) {
    const originalCostVal = Number(originalCost);
    const costVal = Number(cost);
    if (originalCostVal < costVal) {
      return true;
    }
    return false;
  }

  submit() {
    this.isSubmitted = true;
    if (this.variantForm.valid && !this.minMaxDiscount) {
      if (this.type === 'variant' && this.action === 'Edit') {
        this.variantForm.value['containsEgg'] = this.variantForm.value['type'] === 'Egg' ? true : false;
        this.variantForm.value['isVeg'] = this.variantForm.value['type'] !== 'Non-Veg' ? true : false;
        delete this.variantForm.value['type'];
        let obj = {
          variantOptions: this.variantForm.value,
          index: this.index,
        }
        this.modalController.dismiss(obj);
      }
      else if (this.type === 'variant') {
        this.variantForm.value['containsEgg'] = this.variantForm.value['type'] === 'Egg' ? true : false;
        this.variantForm.value['isVeg'] = this.variantForm.value['type'] !== 'Non-Veg' ? true : false;
        delete this.variantForm.value['type'];
        let obj = {
          variantOptions: this.variantForm.value,
          index: this.index,
        }
        this.modalController.dismiss(obj);
      }
    }

    if (this.type === 'addon' && this.action === 'Edit') {
      this.variantForm.removeControl('originalCost');
      if (this.variantForm.valid) {
        this.variantForm.value['containsEgg'] = this.variantForm.value['type'] === 'Egg' ? true : false;
        this.variantForm.value['isVeg'] = this.variantForm.value['type'] !== 'Non-Veg' ? true : false;
        delete this.variantForm.value['type'];
        let obj = {
          addonOptions: this.variantForm.value,
          index: this.index,
        }
        this.modalController.dismiss(obj);
      }
    }
    else if (this.type === 'addon') {
      this.variantForm.removeControl('originalCost');
      if (this.variantForm.valid) {
        this.variantForm.value['containsEgg'] = this.variantForm.value['type'] === 'Egg' ? true : false;
        this.variantForm.value['isVeg'] = this.variantForm.value['type'] !== 'Non-Veg' ? true : false;
        delete this.variantForm.value['type'];
        let obj = {
          addonOptions: this.variantForm.value,
          index: this.index,
        }
        this.modalController.dismiss(obj);
      }
    }
  }

}
