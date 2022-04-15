import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { CALL_PERMISSION, CALL_PERMISSION_MSG, ROUTES_STR } from 'src/app/core/constants/app-constants';
import { OrderService } from '../../services/order.service';
import { processTimeString } from 'src/app/shared/utils/common-functions';
import { AlertController } from '@ionic/angular';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
@Component({
  selector: 'app-order-view-and-billing',
  templateUrl: './order-view-and-billing.page.html',
  styleUrls: ['./order-view-and-billing.page.scss'],
})
export class OrderViewAndBillingPage implements OnInit {

  @Input() orderObj: any;
  @Input() orderId: string;
  riderDetails = true;
  customerInfo = true;
  orderDetailInfo: boolean = true;
  orderModelKey: string = 'acceptanceWait';
  rejectionType: string;
  rejectionReason: string = null;

  constructor(
    private callNumber: CallNumber,
    private router: Router,
    private alertController: AlertController,
    private openNativeSettings: OpenNativeSettings,
    private orderService: OrderService) {
  }

  ngOnInit() {
    console.log('order obj -->', this.orderObj);
    this.orderService.orderStatusListModelKeySubject$.subscribe(modelKey => this.orderModelKey = modelKey);
  }

  // Using for toggling the stages
  accordion(index) {
    if (index === '0') {
      this.riderDetails = !this.riderDetails;
    }
    if (index === '1') {
      this.customerInfo = !this.customerInfo;
    }
    if (index === '2') {
      this.orderDetailInfo = !this.orderDetailInfo;
    }
  }

  isScheduled(order) {
    if (order && order.deliveryInfo && order.deliveryInfo.slotInfo && order.deliveryInfo.slotInfo.date
      && order.deliveryInfo.slotInfo.endTime && order.deliveryInfo.slotInfo.startTime && !order.deliveryInfo.selfPickup) {
      return true;
    }
    else if (order && order.deliveryInfo && order.deliveryInfo.slotInfo && order.deliveryInfo.slotInfo.date
      && order.deliveryInfo.slotInfo.endTime && order.deliveryInfo.slotInfo.startTime && order.deliveryInfo.selfPickup) {
      return true;
    }
    else {
      return false;
    }
  }

  isSelfPickup(order) {
    if (order && order.deliveryInfo && order.deliveryInfo.selfPickup && order.deliveryInfo.slotInfo
      && !order.deliveryInfo.slotInfo.date &&
      !order.deliveryInfo.slotInfo.endTime && !order.deliveryInfo.slotInfo.startTime &&
      order && order.config && order.config.delivery.canSelfPickup) {
      return true;
    }
    return false;
  }

  processTimeString(time) {
    return processTimeString(time);
  }

  dailerPad(mobNo) {
    this.callNumber.callNumber(mobNo, true).then(data => {
      console.log('accept', data);
    }).catch(err => {
      this.managePermissions();
      console.log(err);
    });
  }

  openNative(type) {
    this.openNativeSettings.open(type).then(val => {
      console.log('opened', val);
    }).catch(err => {
      console.log('native err', err);
    })
  }

  async managePermissions() {
    const alert = await this.alertController.create({
      header: CALL_PERMISSION,
      message: CALL_PERMISSION_MSG,
      buttons: [
        {
          text: 'close',
        }, {
          text: 'App settings',
          handler: () => {
            this.openNative('application_details');
          }
        }]
    });
    await alert.present();
  }

  getCompletedOrderStatus(orderData) {
    const status = orderData['status']['value'];
    if (status === 'outForDelivery' || status === 'delivered' || status === 'complete') {
      return true;
    } else {
      return false;
    }
  }

  getRejectOrderStatus(orderData) {
    const status = orderData['status']['value'];
    const reason = orderData['status']['reason'];
    if (status === 'cancelled' || status === 'rejected' || status === 'inDispute' || status === 'enforcedCancel') {
      if (reason === 'Outlet Close') {
        this.rejectionType = reason;
      }
      else if (reason === 'Item Out Of Stock') {
        this.rejectionType = reason
      }
      else {
        this.rejectionType = 'Others'
        this.rejectionReason = reason;
      }
      return true;
    } else {
      return false;
    }
  }

  onCancelOrder() {
    this.router.navigate([ROUTES_STR.orderCancel], { queryParams: { orderId: this.orderId } });
  }
}
