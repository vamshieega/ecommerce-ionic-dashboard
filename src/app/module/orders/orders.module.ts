import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Vibration } from '@ionic-native/vibration/ngx';
import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { OrderRejectModalComponent } from './component/order-reject-modal/order-reject-modal.component';
import { ItemTimeDateModalComponent } from './component/item-time-date-modal/item-time-date-modal.component';
import { OrderCancelPage } from './component/order-cancel/order-cancel.page';
import { OrderService } from './services/order.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule,
    ReactiveFormsModule
    ],
  declarations: [OrdersPage,OrderRejectModalComponent,ItemTimeDateModalComponent, OrderCancelPage],
  exports : [FormsModule, ReactiveFormsModule],
  providers:[Vibration,OrderService],
  entryComponents:[OrderRejectModalComponent]

})
export class OrdersPageModule {}
