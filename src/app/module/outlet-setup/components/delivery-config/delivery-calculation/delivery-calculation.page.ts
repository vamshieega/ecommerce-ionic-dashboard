import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppData } from 'src/app/shared/services/app-data.service';
import { maxNumToBeAllowed } from 'src/app/shared/utils/common-functions';
import { DeliveryConfig } from '../../../model/config.model';
import { OutletDetails } from '../../../model/outlet-details.model';
import { DeliveryPriceRangePage } from '../delivery-price-range/delivery-price-range.page';
import { DeliveryConfigService } from '../service/delivery-config.service';

@Component({
  selector: 'app-delivery-calculation',
  templateUrl: './delivery-calculation.page.html',
  styleUrls: ['./delivery-calculation.page.scss'],
})
export class DeliveryCalculationPage implements OnInit {
  @ViewChild(DeliveryPriceRangePage, { static: false }) deliveryPriceRangePage: DeliveryPriceRangePage;
  calculationType = 'cartValueLimit';
  range = 5;
  deliveryConfigModel = new DeliveryConfig();
  ranges: any;
  outletDetailsSubscription = new Subscription();
  chargeTypeV = 'cartValueLimit';
  outletChargeTypeV: string;
  myForm: FormGroup;
  outletModel = new OutletDetails();

  constructor(private location: Location,
    private deliveryConfigService: DeliveryConfigService,
    private fb: FormBuilder) {
      this.outletDetailsSubscription = AppData.outletDetailsSub$.subscribe(
        (outletData) => {
          if(outletData) {
            this.outletModel = outletData;
            this.deliveryConfigModel = Object.assign(this.deliveryConfigModel, this.outletModel['config']['delivery']);

            this.ranges = this.deliveryConfigModel['shareConfig']['ranges'];
            
            if (!this.deliveryConfigModel['chargeTypeV']) {
              this.deliveryConfigModel['chargeTypeV'] = 'cartValueLimit';
              this.chargeTypeV = 'cartValueLimit';
              this.outletChargeTypeV = this.chargeTypeV;
            } else {
              this.setFormValue();
            }
          }
        })        
    }

  ngOnInit() {
    this.initForm();
    
  }

  initForm() {
    this.myForm = this.fb.group({
      selectionType: [this.deliveryConfigModel['chargeTypeV'], [Validators.required],]
    })
  }

  onValueSwitched(event) {
    this.calculationType = event.target.value;
    this.chargeTypeV = event.target.value;
  }

  onKeyPress(event) {
		return maxNumToBeAllowed(event, 3);
	}

  setFormValue() {
    const key = this.deliveryConfigModel['chargeTypeV'];
    console.log(key);
    
    this.chargeTypeV = key;
    this.calculationType = key;
    this.outletChargeTypeV = key;
    switch (key) {
      case 'cartValueLimit':
        this.ranges = this.deliveryConfigModel['shareConfig']['ranges'];
        break;

      case 'byDistance':
        this.ranges = this.deliveryConfigModel['shareConfig']['ranges'];

      default:
        break;
    }    
  }


  onNavigateBack() {
    this.location.back();
  }

  onSubmit() {
    const data = {
      chargeType: this.chargeTypeV,
      ranges: this.deliveryPriceRangePage.generateDetails()
    }
    this.deliveryConfigService.saveDeliveryRanges(data);
    if(this.deliveryPriceRangePage.isValid()) {
      this.location.back();
    }
  }

}
