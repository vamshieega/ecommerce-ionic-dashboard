/* eslint-disable object-shorthand */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/shared/models/order.model';
import { ApiRequestService } from 'src/app/shared/services/api-request.service';
import { AppData } from 'src/app/shared/services/app-data.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  orderObj = {};
  orderObjSubject$ = new BehaviorSubject({});

  orderModel = new Order();
  ordersSubject$ = new BehaviorSubject({ model: new Order(), modelKey: '' }); // it's contains all orders

  orderListIndex = 0;
  orderListIndexSubject$ = new BehaviorSubject(0); // it's contains order item index

  orderStatusListModelKey;
  orderStatusListModelKeySubject$ = new BehaviorSubject('acceptanceWait'); // it's contains order type model key

  changeStatusSubject$ = new BehaviorSubject(''); // it's contains order status
  orderFilterSubject$ = new BehaviorSubject(null);

  orderCancelFromSupport$ = new BehaviorSubject('');

  getNewOrderSubject$ = new BehaviorSubject(0);
  constructor(private apiService: ApiRequestService) {
    this.ordersSubject$.subscribe((data) => {
      this.orderModel = Object.assign(this.orderModel, data.model);
    });

    this.orderObjSubject$.subscribe((data) => {
      if (Object.keys(this.orderObj).length > 0) {
        this.orderObj = Object.assign(this.orderObj, data);
      }
    });

    this.orderListIndexSubject$.subscribe((data) => {
      this.orderListIndex = data;
    });

    this.orderStatusListModelKeySubject$.subscribe((data) => {
      this.orderStatusListModelKey = data;
    });
  }

  // for set Order object
  setOrderObject(obj) {
    this.orderObjSubject$.next(obj);
  }

  // for remove item from list
  removeItemFromOrderList(ind, modelKey) {
    this.orderModel[modelKey].splice(ind, 1);
    this.ordersSubject$.next({ model: this.orderModel, modelKey: modelKey });
  }

  filterOrderList(tempList, fieldName, searchStr) {
    return tempList.filter((inputObj) => {
      return inputObj[fieldName].toLowerCase().indexOf(searchStr) >= 0;
    });
  }

  // for change order status
  changeStatus(obj) {
    return this.apiService.put('changeStatus', '', obj);
  }

  // to get orders
  getOrders(orderType, orderPageLimit, pageSkip, sort) {
    return this.apiService.get('getOrders', '?status=' + orderType + '&sort=' + sort + '&skip=' + pageSkip + '&limit=' + orderPageLimit);
  }

  // for off menu item
  offMenuItems(obj) {
    return this.apiService.post('offMenuItem', obj);
  }

  // for outlet off
  setOnOff(reqData) {
    return this.apiService.put('setAvailability', '', reqData);
  }

  orderId(id) {
    return this.apiService.get('getOrderDetailsById', id);
  }

  updateVersion(id) {
    return this.apiService.get('updateApk', id);
  }

  orderItemClick(index = this.orderListIndex) {
    this.orderListIndexSubject$.next(index);
    // this.setOrderObject(this.orderModel[this.orderStatusListModelKey][index]);
  }

  orderDeliverInfo(orderId, outletId) {
    return this.apiService.get('deliveryInfo', '?orderId=' + orderId + '&outletId=' + outletId);
  }

  // for getting outlet details data
  //  getOutletData(outletId) { 
  // 	this.apiService.get('fetchOutletDetails', '?outletId=' + outletId);
  //   });
  // }

  getOutletData(outletId) {
    return this.apiService.get('fetchOutletDetails', '?outletId=' + outletId);
  }
}
//AppData.outletDetailsSub$.next(response['body']['data']);
