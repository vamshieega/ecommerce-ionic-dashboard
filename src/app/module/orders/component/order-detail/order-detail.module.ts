import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderDetailPageRoutingModule } from './order-detail-routing.module';

import { OrderDetailPage } from './order-detail.page';
import { ItemDetailsPage } from '../item-details/item-details.page';
import { OrderViewAndBillingPage } from '../order-view-and-billing/order-view-and-billing.page'; 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDetailPageRoutingModule,
  ],
  declarations: [OrderDetailPage, ItemDetailsPage,OrderViewAndBillingPage]
})
export class OrderDetailPageModule { }
