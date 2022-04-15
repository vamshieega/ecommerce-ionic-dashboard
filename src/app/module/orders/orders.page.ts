/* eslint-disable quote-props */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable object-shorthand */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/dot-notation */
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit, ViewChild, ViewRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { INTERVAL_TIME_ONE_MIN, ORDER_PAGE_LIMIT, ORDER_STATUS, ORDER_STATUS_TYPE, PAGE_TITLE, ROUTES_STR } from 'src/app/core/constants/app-constants';
import { Order } from 'src/app/shared/models/order.model';
import { AppData } from 'src/app/shared/services/app-data.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { OrderService } from './services/order.service';
import { AudioService } from 'src/app/shared/services/audio.service';
import { IonContent, IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss']
})
export class OrdersPage implements OnInit, OnDestroy {

  @ViewChild(IonContent, { static: true }) content: IonContent;
  @ViewChild(IonSlides) slider: IonSlides;
  segment: number;
  setOrderListLength = false;
  orderTypeSubscription = new Subscription();

  searchControl: FormControl = new FormControl();
  orderObjSubscription = new Subscription();
  getNewOrderSubscription = new Subscription();
  orderStatusListSubscription = new Subscription();
  orderCancelFromSupportSubscription = new Subscription();
  receiveSubscription = new Subscription();
  order: Order = new Order();
  orderStatusList: any;
  orderList: any;
  modelKey: string;
  changeStatusSubscription = new Subscription();
  intervalTimeElapsed = 0;
  orderModel = new Order();
  orderModelKey: string;
  orderPageLimit = ORDER_PAGE_LIMIT;
  pageSkip = 0;
  visibilityChangeListner;
  tempData: any;
  orderStatus: any;
  outletList: any;
  rejectionType: string;
  listlength: number;
  orderCount = 0;

  constructor(
    private orderService: OrderService,
    private cd: ChangeDetectorRef,
    private loaderService: LoaderService,
    public commonService: CommonService,
    private router: Router,
    private audioService: AudioService,
    private ngZone: NgZone,
  ) {


    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(val => {
      this.searchOrder(val);
    })
    this.orderStatusList = ORDER_STATUS_TYPE[AppData.businessType];
    this.orderStatus = ORDER_STATUS_TYPE[''];
    this.visibilityChangeListner = () => {
      // if (!document.hidden) {
      //   this.getOrderList(ORDER_STATUS.acceptanceWait.keys, 'acceptanceWait', ORDER_STATUS.acceptanceWait.sort);
      // }
    }
    document.addEventListener('visibilitychange', this.visibilityChangeListner);

    // document.addEventListener('visibilitychange', (e) => { 
    //   if (!document.hidden && AppData.isAuthenticated) {
    //     this.getOrderList(ORDER_STATUS.acceptanceWait.keys, 'acceptanceWait', ORDER_STATUS.acceptanceWait.sort);
    //   }
    // });
    this.orderStatusListSubscription = this.orderService.orderStatusListModelKeySubject$.subscribe(modelKey => this.orderModelKey = modelKey);
    // subscribe for Change status
    this.getNewOrderSubscription = orderService.getNewOrderSubject$.subscribe((res) => {
      this.intervalTimeElapsed = 0;
    });
    this.changeStatusSubscription = orderService.changeStatusSubject$
      .pipe(debounceTime(500))
      .subscribe((response) => {
        if (response !== '') {
          this.callApiBaseOnStatus(response);
        }
      });

    this.orderApis();
    // mobile notifications
    // this.platform.ready().then(() =>{
    //   this.fcm.onNotification().subscribe((res) =>{
    //     console.log('orders notif',res);
    //   });
    // });

    AppData.notificationSub$.subscribe((res) => {
      if (res === 'orderReceived' && this.orderCount === 0) {
        this.orderCount = this.orderCount + 1;
        AppData.notificationSub$.next(null);
        this.intervalTimeElapsed = 0;
        this.orderService.orderStatusListModelKeySubject$.next('acceptanceWait');
        this.segment = 0;
        this.segmentChanged();
        this.audioService.stopNotificationSound();
        this.getOrderList(ORDER_STATUS.acceptanceWait.keys, 'acceptanceWait', ORDER_STATUS.acceptanceWait.sort);
        this.orderStatusListSubscription = this.orderService.orderStatusListModelKeySubject$.subscribe(modelKey => this.orderModelKey = modelKey);
      }
    });

  }


  ngOnInit() {


    //  calling FB token and checking notifications in backgroud or foreground
    // this.fcmMessagingService.tokenSubscribe();

    // this.fcm.onNotification()
    // .subscribe(async payLoad => {
    //   const notificationObj = payLoad;
    //   console.log('tapped -->', payLoad);
    //   if(payLoad.status === 'acceptanceWait'){
    //     if (payLoad.wasTapped) {
    //       console.log('Received in background orders -->');
    //       this.ngZone.run(() => this.router.navigate([ROUTES_STR.orders]));
    //       this.intervalTimeElapsed = 0;
    //       this.orderService.orderStatusListModelKeySubject$.next('acceptanceWait');
    //       this.audioService.stopNotificationSound();
    //       this.getOrderList(ORDER_STATUS.acceptanceWait.keys, 'acceptanceWait', ORDER_STATUS.acceptanceWait.sort);
    //       this.orderStatusListSubscription = this.orderService.orderStatusListModelKeySubject$.subscribe(modelKey => this.orderModelKey = modelKey);
    //     } else {
    //       console.log('Received in foreground');
    //       this.audioService.playNotification();
    //       setTimeout(() => {
    //         this.audioService.stopNotificationSound();
    //       }, 3000);
    //       this.localnotifications.schedule({
    //         title: 'New Order',
    //         text: FOREGROUND_MSG,
    //       });
    //       this.localnotifications.on('click').subscribe(notification => {
    //         this.ngZone.run(() => this.router.navigate([ROUTES_STR.orders]));
    //         this.intervalTimeElapsed = 0;
    //         this.orderService.orderStatusListModelKeySubject$.next('acceptanceWait');
    //         this.segment = 0;
    //         this.segmentChanged();
    //         this.getOrderList(ORDER_STATUS.acceptanceWait.keys, 'acceptanceWait', ORDER_STATUS.acceptanceWait.sort);
    //         this.audioService.stopNotificationSound();
    //       });
    //     }
    //   }
    // });

    AppData.pageTitleSub$.next(PAGE_TITLE.order);
    this.orderService.orderListIndexSubject$.next(0);

    this.getOrderDetails();
    // for update receive time every 1 minute
    this.receiveSubscription = interval(INTERVAL_TIME_ONE_MIN).subscribe((response) => {
      this.processTime('acceptanceWait');
      this.intervalTimeElapsed += 1;
      this.processTime('foodPreparation');
      this.orderService.orderItemClick();
    });

    AppData.outletListSub$.subscribe(res => {
      this.outletList = res['outletList'];
    });
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
    this.slider.update();
    this.segment = await this.slider.getActiveIndex();
    this.focusSegment(this.segment);
  }

  focusSegment(segmentId) {
    document.getElementById(segmentId).scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }

  pullToRefresh(event) {
    this.orderApis();
    event.target.complete();
  }

  orderApis() {
    //debouce calls when order change their stage in order details page 
    this.orderCancelFromSupportSubscription = this.orderService.orderCancelFromSupport$
      .pipe(debounceTime(1000))
      .subscribe(res => {
        if (res === '') {
          this.getOrderList(ORDER_STATUS.acceptanceWait.keys, 'acceptanceWait', ORDER_STATUS.acceptanceWait.sort);
          this.getOrderList(ORDER_STATUS.foodPreparation.keys, 'foodPreparation', ORDER_STATUS.foodPreparation.sort);
          this.getOrderList(ORDER_STATUS.foodReady.keys, 'foodReady', ORDER_STATUS.foodReady.sort);
          this.getOrderList(ORDER_STATUS.outForDelivery.keys, 'outForDelivery', ORDER_STATUS.outForDelivery.sort);
          this.getOrderList(ORDER_STATUS.pastOrders.keys, 'pastOrders', ORDER_STATUS.pastOrders.sort);
        }
      });
    this.orderObjSubscription = this.orderService.orderObjSubject$.subscribe((order) => Object.assign(this.order, order));
  }

  // for get order list based on order type
  async getOrderList(orderType, modelKey, sort) {
    this.loaderService.show();
    this.orderService.getOrders(orderType, this.orderPageLimit, this.pageSkip, sort).then((response) => {
      const orderObj = response['body']['data'];
      this.orderModel[modelKey] = orderObj;
      // if(modelKey=== 'foodPreparation'){
      //   localStorage.setItem('foodPreparationItems',this.orderModel[modelKey].length)
      // }
      // this.cd.detectChanges();
      this.loaderService.hide();
      this.orderService.ordersSubject$.next({ model: this.orderModel, modelKey: modelKey });
      // this.loaderService.hideLoader();
    }).catch(error => {
      this.loaderService.hide();
    });
  }

  // for call api base on status
  callApiBaseOnStatus(status) {
    if (status == "complete") {
      status = "outForDelivery";
    }
    if (status === 'rejected' || status === 'enforcedCancel') {
      this.getOrderList(ORDER_STATUS.pastOrders.keys, 'pastOrders', ORDER_STATUS.pastOrders.sort);
    } else if (status === 'outForDelivery') {
      this.getOrderList(ORDER_STATUS[status]['keys'], status, ORDER_STATUS[status]['sort']);
      this.getOrderList(ORDER_STATUS.pastOrders.keys, 'pastOrders', ORDER_STATUS.pastOrders.sort);
    } else {

      this.cd.detectChanges();
      this.getOrderList(ORDER_STATUS[status]['keys'], status, ORDER_STATUS[status]['sort']);
    }
  }

  // for get order data from behavior subject
  getOrderDetails() {
    this.orderService.ordersSubject$.subscribe((data) => {
      if (data) {
        this.orderModel = Object.assign(this.orderModel, data.model);
        if (this.orderModelKey === data.modelKey && data.modelKey === 'acceptanceWait') {
          this.orderList = JSON.parse(JSON.stringify(this.orderModel[data.modelKey]));
          this.listlength = this.orderList.length;
          this.segment = 0;
          if (this.cd && !(this.cd as ViewRef).destroyed) {
            this.cd.detectChanges();
          }
        } else if (this.orderModelKey === data.modelKey && data.modelKey === 'foodPreparation') {
          this.orderList = JSON.parse(JSON.stringify(this.orderModel[data.modelKey]));
          this.listlength = this.orderList.length;
          this.segment = 1;
        } else if (this.orderModelKey === data.modelKey && data.modelKey === 'foodReady') {
          this.orderList = JSON.parse(JSON.stringify(this.orderModel[data.modelKey]));
          this.listlength = this.orderList.length;
          this.segment = 2;
        } else if (this.orderModelKey === data.modelKey && data.modelKey === 'outForDelivery') {
          this.orderList = JSON.parse(JSON.stringify(this.orderModel[data.modelKey]));
          this.listlength = this.orderList.length;
          this.segment = 3;
        } else if (this.orderModelKey === data.modelKey && data.modelKey === 'pastOrders') {
          this.orderList = JSON.parse(JSON.stringify(this.orderModel[data.modelKey]));
          this.listlength = this.orderList.length;
          this.segment = 4;
        }
      }
    });
  }

  // for change order status
  onOrderStatusTypeChange(event) {
    this.setOrderListLength = false;
    this.modelKey = event;
    console.log('model Key  -->', this.modelKey);
    setTimeout(() => {
      this.searchControl.setValue('');
    }, 100);
    this.orderService.orderStatusListModelKeySubject$.next(this.modelKey);
    this.orderService.orderListIndexSubject$.next(0);
    if (this.orderModel[this.modelKey].length > 0) {
      this.orderList = this.orderModel[this.modelKey];
      this.listlength = this.orderList.length;
    } else {
      this.getOrderList(ORDER_STATUS[this.modelKey]['keys'], this.modelKey, ORDER_STATUS[this.modelKey]['sort']);
    }
  }

  searchOrder(data) {
    this.tempData = this.orderModel[this.orderModelKey];
    let searchStr = data;
    const tempList = JSON.parse(JSON.stringify(this.tempData));
    if (searchStr.length > 0 && this.tempData?.length > 0) {
      this.orderList = JSON.parse(JSON.stringify(this.orderService.filterOrderList(tempList, 'orderNum', searchStr.toLowerCase())));
      if (this.orderList.length === 0) {
        this.setOrderListLength = true;
      }
      else {
        this.setOrderListLength = false;
      }
    }
    else if (searchStr.length === 0 || data.detail.value === '') {
      this.orderList = JSON.parse(JSON.stringify(this.tempData));
      this.setOrderListLength = false;
    }
  }

  processTime(key) {
    this.orderModel[key].forEach((order) => {
      order.timeElapsed += 1;
    });
  }

  // for click on order list display order details
  onOrderItemClick(productDetail, i) {
    console.log('item click -->', productDetail, i);
    this.orderService.setOrderObject(this.orderList[i]);
    this.ngZone.run(() => this.router.navigate([ROUTES_STR.orderDetail], { queryParams: { orderId: productDetail.orderId } }));
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
        this.rejectionType = reason;
      }
      else {
        this.rejectionType = 'Others';
      }
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy(): void {
    console.log('destroyed-->');
    this.orderObjSubscription.unsubscribe();
    this.orderStatusListSubscription.unsubscribe();
    this.orderCancelFromSupportSubscription.unsubscribe();
    this.getNewOrderSubscription.unsubscribe();
    this.orderTypeSubscription.unsubscribe();
    this.changeStatusSubscription.unsubscribe();
  }
}
