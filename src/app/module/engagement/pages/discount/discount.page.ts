import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable, of, Subscription } from 'rxjs';
import { CONFIRM_MODAL, PAGE_TITLE, ROUTES_STR } from 'src/app/core/constants/app-constants';
import { IMAGE_URLS } from 'src/app/core/constants/image-constants';
import { OutletModalPage } from 'src/app/module/outlet-modal/outlet-modal.page';
import { OutletDetails } from 'src/app/module/outlet-setup/model/outlet-details.model';
import { ConfirmationmodalPage } from 'src/app/shared/component/confirmationmodal/confirmationmodal.page';
import { AppData } from 'src/app/shared/services/app-data.service';
import { ImageService } from 'src/app/shared/services/cache-image.service';
import { processTimeString } from 'src/app/shared/utils/common-functions';
import { CreateOfferService } from './service/create-offer.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.page.html',
  styleUrls: ['./discount.page.scss'],
})
export class DiscountPage implements OnInit, AfterViewInit {

  outletDetailsSubscription = new Subscription();
  comingSoon = IMAGE_URLS['discountIllustration'];
  public backgroundImageURL$: Observable<string>;
  outletName: string;
  outletId: string;
  locality: string;
  outletModel = new OutletDetails();

  emptyDisImg = IMAGE_URLS.discountIllustration;
  createDisRouteUrl = ROUTES_STR.createOffer;
  selectedValue: any = 0;
  couponList = [];
  allCouponList = [];
  activeCouponList = [];
  expiredCouponList = [];

  couponStatusList = ['all', 'active', 'expired'];
  selectedIndex;
  discountPresent: string = '';
  outletLocality: string = '';
  tabStatus: string = 'all';
  offerType = '';

  constructor(private modalController: ModalController, private router: Router,
    private createOfferService: CreateOfferService, private imageservice: ImageService) {
    const image: Observable<Blob> = imageservice.fetchImage(this.comingSoon);
    image.subscribe(b => {
      imageservice.saveImageToDatabase(this.comingSoon, b);
    });
  }

  ngOnInit() {
    this.outletDetailsSubscription = AppData.outletDetailsSub$.subscribe((outletData) => {
      if (outletData) { this.outletLocality = outletData['basic']['locality']; }
    });
    AppData.pageTitleSub$.next(PAGE_TITLE.discount);
    this.getAllDiscounts();
  }

  async ngAfterViewInit() {
    this.backgroundImageURL$ = of(
      await this.imageservice.getCSSBackgroundImageURL(this.comingSoon)
    );
  }

  ionViewWillEnter() {
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
        this.getAllDiscounts();
      }
    })
    return await modal.present();
  }

  //Getting coupon list
  getAllDiscounts() {
    this.createOfferService.getCoupons().then((res) => {
      const responseData = res['body']['data'];
      this.couponList = responseData;
      this.discountPresent = this.couponList.length > 0 ? 'YES' : 'NO';
      this.allCouponList = responseData;
      this.activeCouponList = responseData.filter(res => res.status === 'active');
      this.expiredCouponList = responseData.filter(res => res.status === 'expired');
      Object.values(this.couponList).forEach((res) => { res['copEditDelete'] = false; });
    });
  }

  onEditCoupon(obj) {
    console.log(obj);
    this.router.navigate([ROUTES_STR.createOffer], { queryParams: { couponId: obj.couponId } })
  }

  async onNavigate(status, index) {
    this.selectedValue = index;
    this.tabStatus = status;
    await this.setListBasedOnStatus(status);
  }

  setListBasedOnStatus(status) {
    if (status === 'all' || status === 'inactive') {
      this.couponList = this.allCouponList;
    } else if (status === 'active') {
      this.offerType = 'active';
      this.couponList = this.activeCouponList;
    } else if (status === 'expired') {
      this.offerType = 'expire';
      this.couponList = this.expiredCouponList;
    }
  }

  // for convert start and end time into 12 hours formate (AM/PM)
  getSlotsTime(copObj) {
    const slots = copObj.activeSlots.slots;
    return processTimeString(slots.startTime) + ' - ' + processTimeString(slots.endTime);
  }

  // for delete coupon
  onDeleteCoupon(i, obj) {
    // this.couponList[i].copEditDelete = false;
    // const mObj = getMessages('COUPON_DELETE_MSG');
    // const confirmModalRef = this.modalService.open(ConfimationModalComponent, getConfig('COMMON_CSS_MODAL_CONFIG'));
    // confirmModalRef.componentInstance.modalObj = mObj;
    // confirmModalRef.result.then((res) => {
    //   this.createOfferService.deleteCoupon(obj.couponId).then(async (res) => {
    //     this.couponList.splice(i, 1);
    //     this.allCouponList = this.couponList;
    //     this.activeCouponList = this.couponList.filter(res => res.status === 'active');
    //     this.expiredCouponList = this.couponList.filter(res => res.status === 'expired');
    //   });
    // });
  }



  cancelModal: boolean = false;
  

  async switch(obj, index, event) {
    console.log(event.detail.checked);
    if (event.detail.checked === true && this.cancelModal === false) {
      this.onChangeCouponStatus(obj, index, event.detail.checked);
    }
    else if (event.detail.checked === false && this.cancelModal === false) {
      this.onChangeCouponStatus(obj, index, event.detail.checked);
    }
    else {
      this.cancelModal = false;
    }
  }

  // for changing coupon status
  async onChangeCouponStatus(obj, index, event) {
    console.log(obj);
    this.couponList[index]['status'] = event ? 'active' : 'inactive';
    this.cancelModal = true;
    let modal = await this.modalController.create({
      component: ConfirmationmodalPage, cssClass: 'Confirmationmodal',
      componentProps: {
        icon: CONFIRM_MODAL.switch_on_Icon,
        title: CONFIRM_MODAL.switch_on_title
      }
    });
    modal.onDidDismiss().then(async (res) => {
      if (res.data) {
        this.cancelModal = false;
        this.createOfferService.changeCouponStatus(obj);
      }
      else {
        this.cancelModal = true;
        this.couponList[index]['status'] = event ? 'inactive' : 'active';
      }
    });
    return await modal.present()
  }


  // change status color 
  getStatusClr(status) {
    // return DISCOUNT_STATUS_CLR[status];
  }

  ngOnDestroy(): void {
    this.outletDetailsSubscription && this.outletDetailsSubscription.unsubscribe();
  }
}
