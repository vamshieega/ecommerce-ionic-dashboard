import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { debounceTime } from 'rxjs/operators';
import { CONFIRM_MODAL, COUNTRY_TYPE } from 'src/app/core/constants/app-constants';
import { ConfirmationmodalPage } from 'src/app/shared/component/confirmationmodal/confirmationmodal.page';
import { AppData } from 'src/app/shared/services/app-data.service';
import { getVegNonVegItemImg } from 'src/app/shared/utils/menu-cart-item-functions';
import { MenuItemService } from '../../services/menu-item.service';

@Component({
  selector: 'app-item-search-modal',
  templateUrl: './item-search-modal.page.html',
  styleUrls: ['./item-search-modal.page.scss'],
})
export class ItemSearchModalPage implements OnInit {

  menuItemSearch: FormControl = new FormControl();
  // @ViewChild('autofocus', { static: false }) searchbar: IonSearchbar;
  currency = COUNTRY_TYPE[AppData.restData?.config.currency];
  cancelModal: boolean = false;
  menuListDisplay = [];
  index: any;
  menuListDisplayCopy = [];
  menuObj: any;
  isSearching: boolean = false;

  constructor(private modalctrl: ModalController, private menuService: MenuItemService,
    private modalController: ModalController) { }

  ngOnInit() {
    //  setTimeout(() => this.searchbar.setFocus(), 500);
    this.menuListDisplayCopy = this.menuListDisplay;
    AppData.menuListDisplaySub$.next(this.menuListDisplayCopy);
    this.searchOrder();
    this.menuListDisplay = [];
  }

  sendmenuId(id: any) {
    this.modalctrl.dismiss({ item_id: id });
  }

  searchOrder() {
    this.menuItemSearch.valueChanges.pipe(debounceTime(300)).subscribe(value => { this.search(value); });
  }

  getVegNonVegItem(isVeg, containsEgg) {
    return  getVegNonVegItemImg(isVeg, containsEgg);
  }

  search(data) {
    this.isSearching = true;
    const searchStr = data.toLowerCase();
    if (searchStr.length > 0) {
      this.menuListDisplay = this.menuListDisplayCopy.filter(item => {
        return item['name'].toLowerCase().indexOf(searchStr) >= 0;
      });
      this.menuListDisplay = JSON.parse(JSON.stringify(this.menuListDisplay));
    } else {
      this.isSearching = false;
      this.menuListDisplay = JSON.parse(JSON.stringify(this.menuListDisplayCopy));
      console.log('menuListDisplayCopy', this.menuListDisplayCopy);
      this.menuListDisplay = [];
    }
  }

  async confirmModal(toggle, id) {
    this.menuListDisplay[this.index]['availableForOrder'] = toggle;
    let modal = await this.modalController.create({
      component: ConfirmationmodalPage, cssClass: 'Confirmationmodal',
      componentProps: {
        icon: toggle === true ? CONFIRM_MODAL.switch_on_Icon : CONFIRM_MODAL.switch_off_Icon,
        title: toggle === true ? CONFIRM_MODAL.switch_on_title : CONFIRM_MODAL.switch_off_title, endMsg: CONFIRM_MODAL.save
      }
    });
    modal.onDidDismiss().then(async (res) => {
      if (res.data) {
        if (!this.isSearching) {
          this.menuListDisplayCopy = JSON.parse(JSON.stringify(this.menuListDisplay));
        }
        else {
          this.menuListDisplayCopy.forEach((obj) => {
            if (obj['id'] === id) {
              obj['availableForOrder'] = obj['availableForOrder'] === true ? false : true;
            }
          });
        }
        setTimeout(() => { this.cancelModal = false; }, 1);
        toggle === true ? this.menuService.offMenuItems(this.createObjForMenuOnOff('active', id)) : this.switchOff(id);
        AppData.menuListDisplaySub$.next(this.menuListDisplayCopy);
      }
      else {
        this.menuListDisplay[this.index]['availableForOrder'] = !toggle;
      }
    });
    return await modal.present()
  }

  createObjForMenuOnOff(onOffStatus, id) {
    const body = {
      itemId: id,
      outletId: AppData.outletId,
      status: onOffStatus
    }
    return body;
  }

  switchOff(id) {
    let time = new Date();
    time.setDate(time.getDate() + 1)
    time.setHours(2);
    time.setMinutes(0);
    const reqBody = this.createObjForMenuOnOff('inactive', id);
    reqBody['nextAvailable'] = time.toISOString();
    this.menuService.offMenuItems(reqBody);
  }

  switchOnOff(event, id: any, index) {
    this.index = index;
    if (event.detail.checked && this.cancelModal === false) {
      this.cancelModal = true;
      this.confirmModal(event.detail.checked, id);
    }
    else if (event.detail.checked === false && this.cancelModal === false) {
      this.cancelModal = true;
      this.confirmModal(event.detail.checked, id);
    }
    else {
      this.cancelModal = false;
    }
  }
}
