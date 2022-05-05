import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonContent, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CONFIRM_MODAL, COUNTRY_TYPE, ROUTES_STR } from 'src/app/core/constants/app-constants';
import { OutletModalPage } from 'src/app/module/outlet-modal/outlet-modal.page';
import { OutletDetails } from 'src/app/module/outlet-setup/model/outlet-details.model';
import { ConfirmationmodalPage } from 'src/app/shared/component/confirmationmodal/confirmationmodal.page';
import { AppData } from 'src/app/shared/services/app-data.service';
import { getVegNonVegItemImg } from 'src/app/shared/utils/menu-cart-item-functions';
import { MenuItemService } from '../../services/menu-item.service';
import { CategoriesModalPage } from '../categories-modal/categories-modal.page';
import { ItemSearchModalPage } from '../item-search-modal/item-search-modal.page';
import { ItemViewModalPage } from '../item-view-modal/item-view-modal.page';
@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.page.html',
  styleUrls: ['./all-items.page.scss'],
})
export class AllItemsPage implements OnInit {

  @ViewChild(IonContent, { static: true }) content: IonContent;
  currency = COUNTRY_TYPE[AppData.restData?.config.currency];
  searchModal: boolean = false;
  outletDetailsSubscription = new Subscription();
  outletModel = new OutletDetails();
  outletName: string;
  outletId: string;
  locality: string;
  menuObj = {};
  menuListDisplay = [];
  menuListDisplayCopy = [];
  categoryDisplayListCopy = [];
  categoryDisplayList = [];
  categoryObj = [];
  isSearching = false;
  selectedCategoryName: string;
  itemCatPreSent: String;
  index: any;
  cancelModal: boolean = false;

  constructor(private modalController: ModalController,
    private menuService: MenuItemService,
    private router: Router) {

    AppData.resetArraySub$.subscribe((res) => {
      if (res === 'resetArray') {
        this.resetArray();
        AppData.resetArraySub$.next(null);
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.outletId = AppData.outletId;
    this.getMenuList();
    this.outletDetailsSubscription = AppData.outletDetailsSub$.subscribe((outletData) => {
      this.outletModel = Object.assign(this.outletModel, outletData);
      this.locality = this.outletModel['basic']['locality'];
      this.outletName = this.outletModel['basic']['outletName'];
    });
  }

  getOutletTotalCount() {
    if (AppData.outletList !== undefined) {
      return AppData.outletList.length;
    }
  }

  async searchOrder(ev) {
    this.searchModal = true;
    let modal = await this.modalController.create({
      component: ItemSearchModalPage,
      cssClass: 'itemSearch-modal',
      componentProps: {
        menuListDisplay: this.menuListDisplay, menuObj: this.menuObj
      }
    });
    modal.onDidDismiss().then(async (res) => {
      this.searchModal = false;
      if (res.data) {
        let yOffset = document.getElementById(res['data']['item_id']).offsetTop;
        this.content.scrollToPoint(100, yOffset, 1500);
        AppData.menuListDisplaySub$.subscribe((res) => {
          this.menuListDisplay = res;
        });
      }
      else {
        AppData.menuListDisplaySub$.subscribe((res) => {
          this.menuListDisplay = res;
        });
      }
    })
    return await modal.present();
  }

  search(data) {
    this.isSearching = true;
    const searchStr = data;
    const tempList1 = JSON.parse(JSON.stringify(Object.values(this.menuObj)));
    if (searchStr.length > 0) {
      const filteredData = JSON.parse(JSON.stringify(this.menuService.filterMenuList(tempList1, 'name', searchStr.toLowerCase())));
      const { tempList, tempCatList } = this.menuService.transformList(filteredData);
      this.menuListDisplay = tempList;
      this.categoryDisplayList = tempCatList;
    } else {
      this.menuListDisplay = JSON.parse(JSON.stringify(this.menuListDisplayCopy));
      this.categoryDisplayList = JSON.parse(JSON.stringify(this.categoryDisplayListCopy));
    }
    //  this.menuService.filterCategoryItemsChanged.next(this.categoryDisplayList);
  }

  async onChangeOutlet() {
    let modal = await this.modalController.create({
      component: OutletModalPage, cssClass: 'outlet-select-modal',
      componentProps: {
        selectedOutletName: this.outletName,
        selectedOutletId: this.outletId, locality: this.locality
      }
    });
    modal.onDidDismiss().then(async (res) => {
      if (res.data) {
        this.outletId = res.data?.id;
        this.locality = res.data?.locality;
        this.outletName = res.data?.name;
        AppData.outletIdSub$.next(this.outletId);
        this.getMenuList();
      }
    })
    return await modal.present();
  }

  async onChangeCategory() {
    let modal = await this.modalController.create({
      component: CategoriesModalPage,
      cssClass: 'categories-modal',
      componentProps: { selectedCategoryName: this.selectedCategoryName, menuList: this.categoryObj }
    });
    modal.onDidDismiss().then(async (res) => {
      if (res.data) {
        let yOffset = document.getElementById(res['data']['cat_id']).offsetTop;
        this.content.scrollToPoint(100, yOffset, 1500);
        this.locality = this.outletModel['basic']['locality'];
        this.selectedCategoryName = res['data']['categoryName'];
      }
    })
    return await modal.present();
  }

  async getMenuList() {
    this.menuService.menuListData(this.outletId).then(async (res) => {
      this.categoryObj = [];
      this.menuObj = res['body']['data'];
      const { tempList, tempCatList } = this.menuService.transformList(Object.values(this.menuObj));
      this.menuListDisplay = tempList;
      this.menuListDisplayCopy = JSON.parse(JSON.stringify(this.menuListDisplay));
      this.categoryDisplayList = tempCatList;
      this.content.scrollToTop();
      this.itemCatPreSent = this.menuListDisplay.length === 0 && this.categoryDisplayList.length === 0 ? 'NO' : 'YES';
      this.selectedCategoryName = this.itemCatPreSent === 'YES' ? this.categoryDisplayList[0]['cat_name'] : ''
      this.categoryDisplayList.forEach((res) => {
        let count = 0;
        this.menuListDisplay.forEach((data) => {
          if (data.cat_id === res.cat_id) {
            count = count + 1;
          }
        });
        let obj = {
          cat_id: res.cat_id,
          cat_name: res.cat_name,
          item_count: count
        }
        this.categoryObj.push(obj);
      });
    });
  }

  createObjForMenuOnOff(onOffStatus, id, menu_item) {
    console.log('menu_item', menu_item);
    this.menuListDisplay[this.index]['nextAvailable'] = '';
    const body = {
      itemId: id,
      outletId: AppData.outletId,
      status: onOffStatus,
      sub_cat_index: menu_item.sub_cat_index,
      menu_index: menu_item.menu_index,
    }
    return body;
  }

  switchOnOff(event, id: any, index, menu_item) {
    if (!this.searchModal) {
      this.index = index;
      if (event.detail.checked && this.cancelModal === false) {
        this.cancelModal = true;
        this.confirmModal(event.detail.checked, id, this.index, menu_item);
      }
      else if (event.detail.checked === false && this.cancelModal === false) {
        this.cancelModal = true;
        this.confirmModal(event.detail.checked, id, this.index, menu_item);
      }
      else {
        this.cancelModal = false;
      }
    }
  }

  async confirmModal(toggle, id, index, menu_item) {
    this.menuListDisplay[index]['availableForOrder'] = toggle;
    let modal = await this.modalController.create({
      component: ConfirmationmodalPage, cssClass: 'Confirmationmodal',
      componentProps: {
        icon: toggle === true ? CONFIRM_MODAL.switch_on_Icon : CONFIRM_MODAL.switch_off_Icon,
        title: toggle === true ? CONFIRM_MODAL.switch_on_title : CONFIRM_MODAL.switch_off_title, endMsg: CONFIRM_MODAL.save
      }
    });
    modal.onDidDismiss().then(async (res) => {
      if (res.data) {
        this.cancelModal = false;
        toggle === true ? this.menuService.offMenuItems(this.createObjForMenuOnOff('active', id, menu_item)) : this.switchOff(id, menu_item);
      }
      else {
        this.menuListDisplay[index]['availableForOrder'] = !toggle;
      }
    });
    return await modal.present()
  }

  switchOff(id, menu_item) {
    let time = new Date();
    time.setDate(time.getDate() + 1)
    time.setHours(2);
    time.setMinutes(0);
    const reqBody = this.createObjForMenuOnOff('inactive', id, menu_item);
    reqBody['nextAvailable'] = time.toISOString();
    this.menuListDisplay[this.index]['nextAvailable'] = time.toISOString();
    this.menuService.offMenuItems(reqBody);
  }

  getVegNonVegItem(isVeg, containsEgg) {
    return getVegNonVegItemImg(isVeg, containsEgg);
  }

  async itemView(id) {
    let modal = await this.modalController.create({
      component: ItemViewModalPage,
      cssClass: 'itemViewModal',
      backdropDismiss: true,
      componentProps: {
        item_id: id
      }
    });
    modal.onDidDismiss().then(async (res) => {
      if (res.data === 'delete Item') {
        for (var i = 0; i < this.menuListDisplay.length; i++) {
          if (this.menuListDisplay[i].id === res['role']['id']) {
            this.menuListDisplay.splice(i, 1);
            this.menuListDisplayCopy = JSON.parse(JSON.stringify(this.menuListDisplay));
            break;
          }
        }
      }
    });
    return await modal.present()
  }
  // on menu item edit
  editMenuItem(item) {
    this.resetArray();
    this.menuService.transformList(null);
    const obj = {
      id: item.id,
    }
    const navigationExtras: NavigationExtras = { queryParams: obj }
    setTimeout(() => {
      this.router.navigate([ROUTES_STR.newItem], navigationExtras);
    }, 50);
  }

  addNewItem() {
    this.resetArray();
    this.menuService.transformList(null);
    setTimeout(() => {
      this.router.navigate([ROUTES_STR.newItem]);
    }, 50);
  }

  resetArray() {
    this.menuListDisplay = [];
    this.menuListDisplayCopy = [];
    this.categoryDisplayList = [];
  }

  MoreText(desc) {
    return desc.slice(0, 36);
  }

  getVegNosnVegItemImg(isVeg, containsEgg) {
    if (isVeg) {
      return containsEgg === true ? 'pending-color' : 'success-color';
    }
    return 'error-color';
  }

  checkImage(image) {
    if (image > 40) {
      return 6.2;
    }
    else {
      return 8.9;
    }
  }

  ionViewWillLeave() {
    this.menuService.transformList(null);
    this.resetArray();
  }

  ngOnDestroy() {
    this.outletDetailsSubscription && this.outletDetailsSubscription.unsubscribe();
  }
}
