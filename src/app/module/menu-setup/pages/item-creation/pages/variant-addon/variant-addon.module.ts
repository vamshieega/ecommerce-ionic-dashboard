import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VariantAddonPageRoutingModule } from './variant-addon-routing.module';

import { VariantAddonPage } from './variant-addon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VariantAddonPageRoutingModule
  ],
  declarations: [VariantAddonPage]
})
export class VariantAddonPageModule {}
