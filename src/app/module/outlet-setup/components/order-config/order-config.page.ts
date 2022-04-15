import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { COUNTRY_TYPE, ROUTES_STR } from 'src/app/core/constants/app-constants';
import { OrderService } from 'src/app/module/orders/services/order.service';
import { AppData } from 'src/app/shared/services/app-data.service';
import { getInputFieldValidation, getNestedGrpFieldValidation } from 'src/app/shared/utils/common-functions';
import { ConfigurationModel, OrderConfig } from '../../model/config.model';
import { OutletDetails } from '../../model/outlet-details.model';
import { ProfileService } from '../../services/profile.service';
import { OrderConfigService } from './service/order-config.service';

@Component({
  selector: 'app-order-config',
  templateUrl: './order-config.page.html',
  styleUrls: ['./order-config.page.scss'],
})
export class OrderConfigPage implements OnInit {

  orderForm: FormGroup;
  outletDetailsSubscription = new Subscription();
  configurationModel = new ConfigurationModel();
  formInit = false;
  submitted = false;
  minOrderCharge = false;
  outletModel = new OutletDetails();
  currency = '';

  constructor(private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private router: Router,
    private orderService: OrderConfigService) {
    this.currency = COUNTRY_TYPE[AppData.restData?.config.currency]?.name;

    this.outletDetailsSubscription = AppData.outletDetailsSub$.subscribe((outletData) => {
      console.log(outletData);

      this.outletModel = Object.assign(this.outletModel, outletData);

      if (outletData) {
        this.configurationModel = Object.assign(this.configurationModel, outletData['config']);
        this.initForm();
      }
    });
  }

  ngOnInit() {
    this.initForm();
  }


  initForm() {
    this.orderForm = this.formBuilder.group({
      'acceptanceMode': [this.configurationModel['order']['acceptanceMode'], Validators.required],
      'minOrderAmount': [this.configurationModel['order']['minOrderAmount']],
      'minOrderVal': [false],
      'packingCharges': this.formBuilder.group({
        'chargeOn': [this.configurationModel['order']['packingCharges']['chargeOn'], Validators.required],
        'charge': [this.configurationModel['order']['packingCharges']['charge'], Validators.required],
        // 'chargesPerAmount': [this.orderDetailsModel['order']['packingCharge']['chargesPerAmount'], Validators.required]
      }),
      'paymentMethods': this.formBuilder.group({
        'cod': [this.configurationModel['order']['paymentMethods']['cod'], Validators.required],
        'online': [this.configurationModel['order']['paymentMethods']['online'], Validators.required],
        // 'wallet': [this.configurationModel['order']['paymentMethods']['wallet'] || true, Validators.required]
      })
    })
    this.orderForm['controls']['minOrderVal'].setValue(this.configurationModel['order']['minOrderAmount'] ? true : false, { emit: false });
    this.formInit = true;
  }

  getValid(fieldName) {
    return getInputFieldValidation(this.orderForm, fieldName, this.submitted);
  }

  getPackingValid(grpFieldName, fieldName) {
    return getNestedGrpFieldValidation(this.orderForm, grpFieldName, fieldName, this.submitted);
  }

  onMinOrderPlacement(event) {
    let checked = event.target.checked;
    if (checked === true) {
      this.minOrderCharge = true;
      this.orderForm.controls.minOrderAmount.setValidators([Validators.required]);
      this.orderForm.updateValueAndValidity();
    } else {
      this.orderForm.controls.minOrderAmount.setValidators([]);
      this.orderForm.controls.minOrderAmount.reset();
      this.orderForm.updateValueAndValidity();
      this.minOrderCharge = false;
    }
  }

  onOrderLevel() {
    this.orderForm['controls']['packingCharges']['controls']['charge'].setValue(0);
  }

  onItemLevel() {
    this.orderForm['controls']['packingCharges']['controls']['charge'].setValue(0);
  }

  isEnabled() {
    return this.configurationModel['delivery']['provider'] !== 'self';
  }

  onSubmitOrderDetails() {
    console.log(this.orderForm)
    this.submitted = true;

    const formData = {};
    formData['order'] = this.orderForm.value;
    formData['order']['minOrderAmount'] = formData['order']['minOrderVal'] ? Number(formData['order']['minOrderAmount']) : 0;
    formData['step'] = 'config';
    formData['outletId'] = AppData.outletId;
    formData['order']['paymentMethods']['cod'] = this.configurationModel['delivery']['provider'] !== 'self' ? false : formData['order']['paymentMethods']['cod'];
    if (this.orderForm.valid) {
      this.submitted = false;
      this.orderService.saveSetupDetails(formData).then(async (res) => {
        Object.assign(this.configurationModel['order'], formData['order']);
        this.outletModel._config._order = Object.assign(new OrderConfig(), formData['order']);
        AppData.outletDetailsSub$.next(this.outletModel);
        setTimeout(() => {
          this.router.navigate([ROUTES_STR.dashboard]);
        }, 1000)

      })
    }
  }

  back() {

  }

  routeToDeliveryConfig() {
    setTimeout(() => {
      this.profileService.navigation(5);
    }, 300);
  }

  saveAndProceed() {
    this.submitted = true;
    this.onSubmitOrderDetails();
    console.log(this.orderForm);
    
  }

}
