import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AGM_MAP_CUSTOM_STYLES, DELIVERY_PROVIDERS } from 'src/app/core/constants/app-constants';
import { AppData } from 'src/app/shared/services/app-data.service';
import { ConfigurationModel } from '../../../model/config.model';
import { OutletDetails } from '../../../model/outlet-details.model';
import { DeliveryConfigService } from '../service/delivery-config.service';

@Component({
  selector: 'app-delivery-radius',
  templateUrl: './delivery-radius.page.html',
  styleUrls: ['./delivery-radius.page.scss'],
})
export class DeliveryRadiusPage implements OnInit, OnDestroy {
  outletlat;
  outletlng;
  rangeInKM = 5000;
  range = 5;
  lat1 = 17.43761777183681;
  long1 = 78.37600466773682;

  positions = [{
    "post_country": "Vietnam",
    "post_latitude": 17.603262891765574,
    "post_longitude": 80.00348252778831
  }, {
    "post_country": "Kyrgyzstan",
    "post_latitude": 17.600148907576237,
    "post_longitude": 80.00152017208225
  }, {
    "post_country": "China",
    "post_latitude": 17.603833911088586,
    "post_longitude": 80.00440297272414
  }, {
    "post_country": "China",
    "post_latitude": 17.603064622015854,
    "post_longitude": 80.00348541665157

  }
  ]
  lat2: 17.2124;
  long2: 78.3368;
  configurationModel = new ConfigurationModel();
  outletDetailsSubscription = new Subscription();
  outletModel = new OutletDetails();
  deliveryProvider = DELIVERY_PROVIDERS;
  customStyle: any = AGM_MAP_CUSTOM_STYLES;


  constructor(private location: Location,
    private dlService: DeliveryConfigService) {
    this.outletDetailsSubscription = AppData.outletDetailsSub$.subscribe((outletData) => {
      this.outletModel = Object.assign(this.outletModel, outletData);

      this.outletlng = this.outletModel['basic']['longLat'][0];
      this.outletlat = this.outletModel['basic']['longLat'][1];

      if (outletData) {
        this.configurationModel = Object.assign(this.configurationModel, outletData['config'])
        if (this.configurationModel['deliveryException']) {
          this.rangeInKM = Number(this.configurationModel['deliveryException']['exceptionValue']);
          this.range = this.rangeInKM / 1000;

        }
      }
    })
    console.log(this.outletlat, this.outletlng)

  }

  ngOnInit() {
  }

  updateRange(event) {
    this.range = event.target.value;
    this.rangeInKM = this.range * 1000;
    this.deliveryProvider = DELIVERY_PROVIDERS.filter((provider) => {
      return provider.maxDistance > event.target.value;
    })
    console.log(this.range, this.rangeInKM);

  }

  onNavigateBack() {
    this.location.back();
  }

  onSubmit() {
    console.log('saved')
    this.dlService.saveDeliveryRadius({ range: this.range, rangeInKM: this.rangeInKM });
    this.location.back();
  }

  ngOnDestroy() {
    this.outletDetailsSubscription.unsubscribe();
  }

}
