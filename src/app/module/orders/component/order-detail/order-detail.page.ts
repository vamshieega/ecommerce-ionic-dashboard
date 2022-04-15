import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ORDER_STATUS_BTN_TEXT, ROUTES_STR } from 'src/app/core/constants/app-constants';
import { Order } from 'src/app/shared/models/order.model';
import { AppData } from 'src/app/shared/services/app-data.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { OrderService } from '../../services/order.service';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  orderModel = new Order();
  orderModelKey = 'acceptanceWait';
  btnName: string = '';
  deliverInfoObj: any;
  orderObj: any;
  orderId: string = '';

  constructor(
    private orderService: OrderService,
    public loaderService: LoaderService,
    private toast: ToastService,
    public location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.route.queryParams.subscribe(res => {
      this.orderId = res['orderId'];
    });
    this.orderService.orderStatusListModelKeySubject$.subscribe(modelKey => this.orderModelKey = modelKey);
  }

  ngOnInit() {
    this.getOrderDetailsById(this.orderId);
  }

  getOrderDetailsById(orderId: any) {
    this.orderService.orderId(orderId).then(async response => {
      console.log('get id details -->', response);
      this.orderObj = response['body']['data'];
      //this.orderModelKey = this.orderObj['status']['value'];
      this.btnName = 'MORE ACTIONS';
    }).catch((err) =>{ });
  }

  scheduleOrder(order) {
    if (order && order.deliveryInfo && order.deliveryInfo.slotInfo && order.deliveryInfo.slotInfo.date
      && order.deliveryInfo.slotInfo.endTime && order.deliveryInfo.slotInfo.startTime && !order.deliveryInfo.selfPickup) {
      return true
    }
    return false;
  }

  isSelfPickupOrder(order) {
    if (order && order.deliveryInfo && order.deliveryInfo.selfPickup && order.deliveryInfo.slotInfo
      && !order.deliveryInfo.slotInfo.date &&
      !order.deliveryInfo.slotInfo.endTime && !order.deliveryInfo.slotInfo.startTime &&
      order && order.config && order.config.delivery.canSelfPickup) {
      return true;
    }
    return false;
  }

  changeStatusApiCall(obj) {
    this.orderModel = Object.assign(this.orderModel, this.orderService.orderModel);
    const newOrderIndex = this.orderModel[this.orderModelKey].
      findIndex(item => item.orderId === this.orderObj['orderId']);
    this.orderService.changeStatus(obj).then((response) => {
      this.orderService.removeItemFromOrderList(newOrderIndex, this.orderModelKey);
      this.orderService.changeStatusSubject$.next(obj.status);
      this.orderService.orderListIndexSubject$.next(0);
      setTimeout(() => {
        if (response['body']['type'] === 'success') {
          this.router.navigate([ROUTES_STR.orders]);
        }
        this.loaderService.hide();
      }, 500);
    });
  }


  async onChangeStatus(status) {
    await this.loaderService.show();
    const body = {
      'orderId': this.orderObj['orderId'],
      'status': status,
      'reason': '',
      'outletId': this.orderObj['outletId']
    };
    //  const obj = AppData.outletList.find(item => item.outletId === this.orderObj['outletId']);
    if (status === 'outForDelivery') {
      await this.orderService.orderDeliverInfo(this.orderObj['orderId'], this.orderObj['outletId']).then((response) => {
        this.deliverInfoObj = response['body'].data;
        console.warn(" delivery data ", this.deliverInfoObj);
        console.warn(response);
      });
      if (this.deliverInfoObj['state'] === 'pickup_complete'
        || this.deliverInfoObj['state'] === 'started_for_delivery'
        || this.deliverInfoObj['state'] === 'reached_for_delivery') {
        this.changeStatusApiCall(body);
      } else {
        this.loaderService.hide();
        this.toast.presentToast('  Please mark pickup once order is pickup.', 'Error');
      }
    } else if (status === 'foodPreparation' || status === 'foodReady') {
      this.changeStatusApiCall(body);
    } else {
      this.changeStatusApiCall(body);
    }
  }

  getBtnText(modelKey) {
    const selectedOutlet = AppData.outletList.find(list => list.outletId === AppData.outletId);
    if (ORDER_STATUS_BTN_TEXT[selectedOutlet?.config.businessType]) {
      return ORDER_STATUS_BTN_TEXT[selectedOutlet?.config.businessType][modelKey];
    } else {
      return ORDER_STATUS_BTN_TEXT['food'][modelKey];
    }
  }

  switchBtn() {
    this.btnName = this.btnName === 'MORE ACTIONS' ? 'VIEW ITEMS' : 'MORE ACTIONS';
  }

  backpage() {
    if (this.btnName === 'VIEW ITEMS') {
      this.btnName = 'MORE ACTIONS';
    }
    else {
      this.location.back();
    }
  }
}
