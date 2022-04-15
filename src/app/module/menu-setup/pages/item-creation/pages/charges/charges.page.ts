import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COUNTRY_TYPE } from 'src/app/core/constants/app-constants';
import { MenuItem } from 'src/app/module/menu-setup/models/menu-item';
import { AppData } from 'src/app/shared/services/app-data.service';
import { getInputFieldValidation, getNestedGrpFieldValidation } from 'src/app/shared/utils/common-functions';

@Component({
  selector: 'app-charges',
  templateUrl: './charges.page.html',
  styleUrls: ['./charges.page.scss'],
})
export class ChargesPage implements OnInit {

  menuItemModel = new MenuItem();
  @Input() menuItemDetails: any;

  @Input()
  set billingData(obj: any) {
    if (obj) {
      this.discountPrice = obj.discountPrice;
      this.gst = obj.gst
      this.getFinalPrice();
    }
  }
  discountPrice: Number = 0;
  gst: Number = 0;
  currency = COUNTRY_TYPE[AppData.restData?.config.currency];
  itemChargeForm: FormGroup;
  formInit: boolean = false;
  submitted: boolean = false;;
  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges) {
    const currentItem: SimpleChange = changes.menuItemDetails;
    if (currentItem && currentItem.currentValue) {
      this.menuItemModel = { ...currentItem.currentValue };
      this.initForm();
      this.setFormVal();
      this.discountPrice = this.menuItemModel['price'];
      this.gst = this.menuItemModel['gst'];
      this.finalPriceCal(this.menuItemModel['packingCharges']['charge'], this.menuItemModel['price'], this.menuItemModel['gst']);
    }
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.itemChargeForm = this.fb.group({
      packingChargesAdded: [this.menuItemModel['packingChargesAdded']],
      packingCharges: this.fb.group({
        chargesPer: [this.menuItemModel['packingCharges']['chargesPer']],
        charge: [this.menuItemModel['packingCharges']['charge']]
      }),
      finalPrice: [0],

    });
    if (!this.menuItemDetails)
      this.setAddItemVal();

    this.onFormValueChange();
    this.formInit = true;
  }

  setFormVal() {
    this.itemChargeForm.controls.packingChargesAdded.setValue(true, { emit: false });
  }

  setAddItemVal() {
    if (AppData.outletDetails?.config.order.packingCharges.chargeOn == 'order') {
      this.itemChargeForm['controls']['packingCharges']['controls']['charge'].setValidators([]);
      this.itemChargeForm['controls']['packingCharges']['controls']['charge'].updateValueAndValidity();
      this.itemChargeForm.controls.packingChargesAdded.setValue(true, { emit: false });
      this.nestedGrpControl.chargesPer.setValue('qty', { emit: false });
      this.nestedGrpControl.charge.setValue(AppData.outletDetails?.config.order.packingCharges.charge, { emit: false });
      this.nestedGrpControl.charge.disable();
    } else {
      this.itemChargeForm['controls']['packingCharges']['controls']['charge'].setValidators([Validators.required]);
      this.itemChargeForm['controls']['packingCharges']['controls']['charge'].updateValueAndValidity();
      this.nestedGrpControl.chargesPer.setValue('item', { emit: false });
      this.nestedGrpControl.charge.enable();
      this.itemChargeForm.controls.packingChargesAdded.setValue(true, { emit: false });
      this.nestedGrpControl.charge.setValue(this.menuItemModel['packingCharges']['charge'], { emit: false });
    }
  }

  async getFinalPrice() {
    const pChanges = Number(this.nestedGrpControl.charge.value);
    this.itemChargeForm.controls.finalPrice.setValue(await this.calFinalPrice(pChanges));
  }

  onFormValueChange() {
    this.itemChargeForm.get('packingCharges').get('charge').valueChanges.subscribe(async (val) => {
      this.itemChargeForm.controls.finalPrice.setValue(await this.calFinalPrice(Number(val)));
    });
  }

  calFinalPrice(pChanges) {
    const fPrice = (Number(this.discountPrice) + Number(pChanges) + (((Number(this.discountPrice) * Number(this.gst))) / 100)).toFixed(2);
    return fPrice;
  }

  finalPriceCal(pChange, disPrice, gst) {
    const fPrice = (Number(disPrice) + Number(pChange) + (((Number(disPrice) * Number(gst))) / 100)).toFixed(2);
    this.itemChargeForm.controls.finalPrice.setValue(fPrice, { emit: false });
  }

  onDisableFields() {
    if (AppData.outletDetails)
      return AppData.outletDetails?.config.order.packingCharges.chargeOn !== 'menu';
  }

  // for checking valid fields
  getGrpValid(fieldName) {
    return getInputFieldValidation(this.itemChargeForm, fieldName, this.submitted);
  }

  // for checking valid fields
  getNextGrpValid(grpFieldName, fieldName) {
    return getNestedGrpFieldValidation(this.itemChargeForm, grpFieldName, fieldName, this.submitted);
  }

  get firstGrpControl() { return this.itemChargeForm.controls; }
  get nestedGrpControl() { return this.itemChargeForm.controls.packingCharges['controls']; }

  getChargeDetails() {
    this.submitted = true;
    const formObj = { ...this.itemChargeForm.value };
    if (this.itemChargeForm.valid) {
      return { ...formObj };
    } else {
      return;
    }
  }

}
