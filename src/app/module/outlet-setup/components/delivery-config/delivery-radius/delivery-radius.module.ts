import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryRadiusPageRoutingModule } from './delivery-radius-routing.module';

import { DeliveryRadiusPage } from './delivery-radius.page';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryRadiusPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapApiKey,
      libraries: ["places", "geometry"]
    }),
  ],
  declarations: [DeliveryRadiusPage]
})
export class DeliveryRadiusPageModule {}
