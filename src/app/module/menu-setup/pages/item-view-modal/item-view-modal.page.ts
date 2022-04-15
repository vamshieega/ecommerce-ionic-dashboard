import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CONFIRM_MODAL, COUNTRY_TYPE, ROUTES_STR } from 'src/app/core/constants/app-constants';
import { ErrorMessage } from 'src/app/core/constants/validation-msg-constants';
import { ConfirmationmodalPage } from 'src/app/shared/component/confirmationmodal/confirmationmodal.page';
import { AppData } from 'src/app/shared/services/app-data.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { getVegNonVegItemImg } from 'src/app/shared/utils/menu-cart-item-functions';
import { MenuItemService } from '../../services/menu-item.service';

@Component({
  selector: 'app-item-view-modal',
  templateUrl: './item-view-modal.page.html',
  styleUrls: ['./item-view-modal.page.scss'],
})
export class ItemViewModalPage implements OnInit {

  item_id;
  menuListDisplay;
  currency = COUNTRY_TYPE[AppData.restData?.config.currency];

  constructor(private router: Router, private commonService: CommonService,
    private toast: ToastService,
    private menuItemService: MenuItemService, private modalController: ModalController) { }

  ngOnInit() {
  }


  async removeMenuItem(menuItemId) {
    if (await this.commonService.isOutletOnOff()) {
      let modal = await this.modalController.create({
        component: ConfirmationmodalPage, cssClass: 'Confirmationmodal',
        componentProps: {
          icon: CONFIRM_MODAL.delete_Icon,
          title: CONFIRM_MODAL.switch_off_title, endMsg: CONFIRM_MODAL.save
        }
      });
      modal.onDidDismiss().then(async (res) => {
        if (res.data) {
          this.menuItemService.menuItemDelete(menuItemId.id).then((response) => {
            if (response['body'].type !== 'error') {
              console.log("delete api response ", response);
              this.modalController.dismiss("delete Item", menuItemId);
            }
          });
        }
      });
      return await modal.present();
    } else {
      this.toast.presentToast(ErrorMessage.OUTLET_OFF_BEFORE_DELETE_ITEM_MSG, 'toast-error');
    }
  }

  getVegNonVegItem(isVeg, containsEgg) {
    return getVegNonVegItemImg(isVeg, containsEgg);
  }

  editMenuItem(item) {
    AppData.resetArraySub$.next('resetArray');
    this.menuItemService.transformList(null);
    const obj = {
      id: item.id,
    }
    const navigationExtras: NavigationExtras = { queryParams: obj }
    this.modalController.dismiss();
    setTimeout(() => {
      this.router.navigate([ROUTES_STR.newItem], navigationExtras);
    }, 50);

  }

  getAddonVariantCount(addonList) {
    let addonsCount = [];
    let variantsCount = [];
    addonsCount = addonList?.filter(itm => itm.isVariant === false).length;
    variantsCount = addonList?.filter(itm => itm.isVariant === true).length;
    return { addon: addonsCount, variant: variantsCount };
  }
}
