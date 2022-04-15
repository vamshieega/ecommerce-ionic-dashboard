import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ErrorMessage } from 'src/app/core/constants/validation-msg-constants';
import { AppData } from 'src/app/shared/services/app-data.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { OrderService } from '../../services/order.service';
import { ItemTimeDateModalComponent } from '../item-time-date-modal/item-time-date-modal.component';

@Component({
  selector: 'app-order-reject-modal',
  templateUrl: './order-reject-modal.component.html',
  styleUrls: ['./order-reject-modal.component.scss'],
})
export class OrderRejectModalComponent implements OnInit {



  @Input() modalObj;
  nextAvailable = new Date().toISOString();
  rejectReasonForm: FormGroup;
  itemsList = [];
  itemNextAvailableList = [];
  reason: string;
  outletClose = 'OUTLET_CLOSE';
  itemOutOfStock = 'ITEM_OUT_OF_STOCK';
  selected_value = '';
  other = 'OTHER';
  options: string;
  comment = '';

  outletId: string;
  constructor(private modalctrl: ModalController,
    private fb: FormBuilder,
    // private dateTimeService: DateTimeService,
    private toast: ToastService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.itemsList = this.modalObj?.orderObj['items'];
    this.outletId = this.modalObj?.orderObj['outletId'];
    this.initForm();
  }

  initForm() {
    // temp commented code
    
    // const itemGroupControls = this.itemsList?.map(item => new FormControl(false));
    // this.rejectReasonForm = this.fb.group({
    //   'items': new FormArray(itemGroupControls),
    // });
  }

  async onMenuItemChange(event, ind, itemId) {
    this.selected_value = this.itemOutOfStock
    event.preventDefault();
    const menuItemValue = event.target.checked;
    if (menuItemValue === true) {
      let modal = await this.modalctrl.create({
        component: ItemTimeDateModalComponent, cssClass: 'modal-component-css'
      });
      modal.onDidDismiss().then((res: any) => {
        let resData = res.data.data
        if (res.data.data) {
          this.nextAvailable = resData.save; 
          let year = resData.save.date.slice(0, 4);
          let month = resData.save.date.slice(5, 7);
          let day = resData.save.date.slice(8, 10);
          let time = resData.save.startTime;
          let hour = time.slice(0, 2);
          let minute = time.slice(2);
          let nextAvailableDate = new Date(year, month - 1, day, hour, minute);
          let isoDateTime = new Date(nextAvailableDate.getTime() - (nextAvailableDate.getTimezoneOffset() * 60000)).toISOString();
          if (resData.isChange === true) {
            let body = {
              itemId: itemId,
              nextAvailable: isoDateTime,
              outletId: this.outletId,
              status: 'inactive'
            };
            this.orderService.offMenuItems(body).then((response) => {
            });
          }
          // for pushing next available time in next available item list
          this.itemNextAvailableList.push({
            itemId: itemId,
            nextAvailable: isoDateTime
          });
        } else {
          const newItemsArr = this.rejectReasonForm.controls['items'].value;
          newItemsArr[ind] = false;
          this.rejectReasonForm.controls['items'].setValue(newItemsArr, { emitEvent: false });
        }
      });
      return await modal.present();
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
      this.selected_value = this.other;
      this.options = value;
    }
  }

  // Clear item list when change the reason
  clearItems() {
    const items = this.rejectReasonForm.controls['items'].value;
    const newItems = [];

//    temporary commented

    // items?.forEach((val, ind) => {
    //   if (val === true) {
    //     val = false;
    //     newItems.push(val);
    //   } else {
    //     newItems.push(val);
    //   }
    // })
    return newItems;
  }

  onReasonSubmit() {
    if (this.options === 'OUTLET_CLOSE') {
      this.setOutletOff();
    } else if (this.options === 'ITEM_OUT_OF_STOCK' || this.options === 'on') {
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
  // for off outlet when user click on outlet close
  setOutletOff() {
    const body = {
      outletId: this.outletId,
      available: 'off'
    };
    const outletList = JSON.parse(JSON.stringify(AppData.outletList));
    outletList.find(item => item.outletId === this.outletId).available = 'off';
    const obj = {
      changeIndex: false,
      outletList: outletList
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
  // setting date and time for next available item
  nextAvailableItem() {

    //    temporary commented

    // this.itemNextAvailableList?.forEach((item) => {
    //   const body = {
    //     itemId: item.itemId,
    //     nextAvailable: item.nextAvailable,
    //     outletId: this.outletId,
    //     status: 'inactive'
    //   };
    //   this.orderService.offMenuItems(body).then((response) => { });
    // })
  }

  saveReason(reason) {
    this.modalctrl.dismiss({
      isClose: true, data: {
        'reason': reason,
        'isReasonFill': true
      }
    });
  }

  dismiss() {
    this.modalctrl.dismiss({
      isClose: true, data: {
        'isReasonFill': false
      }
    });
  }
}
