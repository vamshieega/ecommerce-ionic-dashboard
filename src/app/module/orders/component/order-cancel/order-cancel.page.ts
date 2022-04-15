import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { IonDatetime, ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AppData } from 'src/app/shared/services/app-data.service';
import { ErrorMessage } from 'src/app/core/constants/validation-msg-constants';
import { ROUTES_STR } from 'src/app/core/constants/app-constants';
import { ActivatedRoute, ChildActivationEnd, Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Order } from 'src/app/shared/models/order.model';
import { ItemTimeDateModalComponent } from '../item-time-date-modal/item-time-date-modal.component';


@Component({
  selector: 'app-order-cancel',
  templateUrl: './order-cancel.page.html',
  styleUrls: ['./order-cancel.page.scss'],
})
export class OrderCancelPage implements OnInit {

  // @ViewChildren(IonDatetime) datePicker: QueryList<IonDatetime>;
  cancelChoice = 'OTHER';
  nextAvailable = new Date().toISOString();
  rejectReasonForm: FormGroup;
  itemsList = [];
  itemNextAvailableList = [];
  reason: string;
  selectedValue = '';
  other = 'OTHER';
  options=  'COMMENT';
  comment = ''; 
  outletId: string;
  orderModel = new Order();
  orderModelKey = 'acceptanceWait';
  orderObj: any;
  itemId: string;
  wordCount = 120;
  orderStatus: string;
  orderId = '';


  constructor(private orderService: OrderService,
    private location: Location, private fb: FormBuilder,
    private toast: ToastService,
    private router: Router,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private modalctrl: ModalController) {
    this.route.queryParams.subscribe(res => {
      this.orderId = res['orderId'];
    });
  }

  ngOnInit() {
    this.orderService.orderStatusListModelKeySubject$.subscribe(modelKey => this.orderModelKey = modelKey);
    this.getOrderDetailsById(this.orderId);
  }
  
  getOrderDetailsById(orderId: any) {
    this.orderService.orderId(orderId).then(async response => {
      this.orderObj = await response['body']['data'];
      this.itemsList = this.orderObj['items'];
      this.outletId = this.orderObj['outletId'];
      this.orderStatus = this.orderObj["status"]["value"];
      
      this.initForm();
    }).catch((err)=>{ });
  }

  initForm() {
    const itemGroupControls = this.itemsList?.map(item => new FormControl(false));
    this.rejectReasonForm = this.fb.group({
      items: new FormArray(itemGroupControls),
    });
  }

  async onMenuItemChange(event, itemId, id) {
    event.preventDefault();
    this.itemId = itemId;
    const menuItemValue = event.target.checked;
    if (menuItemValue === true) {

      let time = new Date();
      time.setDate(time.getDate() + 1)
      time.setHours(2);
      time.setMinutes(0);
      
      let nextAvailableDate = time.toISOString();      
      
      this.itemNextAvailableList.push({
        itemId: itemId,
        nextAvailable: nextAvailableDate
      });
      
      
      // let modal = await this.modalctrl.create({
      //   component: ItemTimeDateModalComponent, cssClass: 'modal-component-css'
      // });
      // modal.onDidDismiss().then((res: any) => {
      //   let resData = res.data.data
      //   if (res.data.data) {
        //     this.nextAvailable = resData.save; 
      //     let year = resData.save.date.slice(0, 4);
      //     let month = resData.save.date.slice(5, 7);
      //     let day = resData.save.date.slice(8, 10);
      //     let time = resData.save.startTime;
      //     let hour = time.slice(0, 2);
      //     let minute = time.slice(2);
      //     let nextAvailableDate = new Date(year, month - 1, day, hour, minute);
      //     console.log(nextAvailableDate.toISOString());
      //     // let isoDateTime = new Date(nextAvailableDate.getTime() - (nextAvailableDate.getTimezoneOffset() * 60000)).toISOString();
      
      //     // for pushing next available time in next available item list
      //     this.itemNextAvailableList.push({
      //       itemId: itemId,
      //       nextAvailable: nextAvailableDate
      //     });
      //   } else {
        //     const newItemsArr = this.rejectReasonForm.controls['items'].value;
        //     newItemsArr[id] = false;
      //     this.rejectReasonForm.controls['items'].setValue(newItemsArr, { emitEvent: false });
      //   }
      // });
      // return await modal.present();
    } else {
      const index = this.itemNextAvailableList.findIndex(item => item.itemId === itemId);
      this.itemNextAvailableList.splice(index, 1);
    }
  }

  onChangeOptions(value) {
    this.options = value;
    if (this.options === 'OUTLET_CLOSE') {
      this.options = value;
      this.itemNextAvailableList = [];
      this.rejectReasonForm.controls['items'].setValue(this.clearItems(), { emitEvent: false });
      this.comment = '';

    } else if (this.options === 'ITEM_OUT_OF_STOCK' || this.options === 'ITEM') {
      this.options = value;
      this.comment = '';

    } else if (this.options === 'OTHER' || this.options === 'COMMENT') {
      this.itemNextAvailableList = [];
      this.rejectReasonForm.controls['items'].setValue(this.clearItems(), { emitEvent: false });
      this.selectedValue = this.other;
      this.options = value;
    }
  }

  getCount() {
    // ng two way binding for variable comment is slow compared to ionInput function
    setTimeout(() => {
      this.wordCount = 120 - this.comment.length;
    }, 100);
  }

  clearItems() {
    const items = this.rejectReasonForm?.controls['items'].value;
    const newItems = [];
    items?.forEach((val, ind) => {
      if (val === true) {
        val = false;
        newItems.push(val);
      } else {
        newItems.push(val);
      }
    });
    return newItems;
  }

  backpage() {
    this.location.back();
  }


  dismiss() {
    this.location.back();
  }

  onReasonSubmit() {
    if (this.options === 'OUTLET_CLOSE') {
      this.setOutletOff();
    } else if (this.options === 'ITEM_OUT_OF_STOCK' || this.options === 'ITEM') {
      console.log(this.itemNextAvailableList);
      if (this.itemNextAvailableList.length > 0) {
        this.nextAvailableItem();
        this.reason = 'Item Out Of Stock';
        this.saveReason(this.reason);
      } else {
        this.toast.presentToast(ErrorMessage.SELECT_OUT_OF_STOCK_MSG, 'toast-error');
      }
    } else if (this.options === 'OTHER' || this.options === 'COMMENT') {
      if (this.comment !== '' && this.comment.trim().length > 0) {
        this.saveReason(this.comment);
      } else {
        this.toast.presentToast(ErrorMessage.FILL_OTHER_REASON_MSG, 'toast-error');
      }
    } else {
      this.toast.presentToast(ErrorMessage.SELECT_REASON_MSG, 'toast-error');
    }
  }

  setOutletOff() {
    const body = {
      outletId: this.outletId,
      available: 'off'
    };

    this.orderService.setOnOff(body).then(response => {
      const outletList = JSON.parse(JSON.stringify(AppData.outletList));
      outletList.find(item => item.outletId === this.outletId).available = 'off';
      const obj = {
        changeIndex: false,
        outletList: outletList
      };
      AppData.outletListSub$.next(obj);
      this.reason = 'Outlet Close';
      this.saveReason(this.reason);
    });
  }

  nextAvailableItem() {
    this.itemNextAvailableList?.forEach((item) => {
      // console.log(item.nextAvailable);
      const body = {
        itemId: this.itemId,
        nextAvailable: item.nextAvailable,
        outletId: this.outletId,
        status: 'inactive'
      };
      this.orderService.offMenuItems(body).then((response) => {
        console.log(response);
      });
    });
  }

  async saveReason(reasons) {
    const cancelOrderStatus = this.orderObj['status']['value'] === 'acceptanceWait' ? 'rejected' : 'enforcedCancel';
    const body = {
      orderId: this.orderObj['orderId'],
      status: cancelOrderStatus,
      reason: reasons,
      outletId: this.orderObj['outletId']
    };
    await this.loaderService.show();
    this.changeStatusApiCall(body);
    this.router.navigate([ROUTES_STR.orders]);
  }

  changeStatusApiCall(obj) {
    this.orderModel = Object.assign(this.orderModel, this.orderService.orderModel);
    const newOrderIndex = this.orderModel[this.orderModelKey].
      findIndex(item => item.orderId === this.orderObj['orderId']);
    this.orderService.changeStatus(obj).then((response) => {
      if (response['body']['type'] === 'success') {
        this.router.navigate([ROUTES_STR.orders]);
      }
      this.orderService.removeItemFromOrderList(newOrderIndex, this.orderModelKey);
      this.orderService.changeStatusSubject$.next(obj.status);
      this.orderService.orderListIndexSubject$.next(0);
      setTimeout(() => {
        this.loaderService.hide();
      }, 3000);
    }).catch(error => {
      this.loaderService.hide();
    });
  }

}
