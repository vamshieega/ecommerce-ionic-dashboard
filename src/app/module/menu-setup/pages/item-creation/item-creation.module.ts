import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemCreationPageRoutingModule } from './item-creation-routing.module';

import { ItemCreationPage } from './item-creation.page';
import { BasicDetailsPage } from './pages/basic-details/basic-details.page';
import { ChargesPage } from './pages/charges/charges.page';
import { MenuTimingsPage } from './pages/menu-timings/menu-timings.page';
import { OperationalTimingModule } from 'src/app/module/outlet-setup/components/operational-timing/operational-timing.module';
import { AddVariantPageRoutingModule } from './pages/add-variant/add-variant-routing.module';
import { VariantModalPage } from './pages/variant-modal/variant-modal.page';
import { VariantAddonPage } from './pages/variant-addon/variant-addon.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ItemCreationPageRoutingModule,
    OperationalTimingModule,
    AddVariantPageRoutingModule
  ],
  declarations: [ItemCreationPage,BasicDetailsPage,ChargesPage,MenuTimingsPage,VariantModalPage,VariantAddonPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ] 
})
export class ItemCreationPageModule {}