import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, ModalController } from '@ionic/angular';
import { ROUTES_STR } from 'src/app/core/constants/app-constants';
import { AppData } from 'src/app/shared/services/app-data.service';
import { generateDiscountCode, getIdsFromCats, getIdsFromItems, getInputFieldValidation, getNestedGrpFieldValidation } from 'src/app/shared/utils/common-functions';
import { CreateOfferService } from '../discount/service/create-offer.service';
import { Discount } from './models/discount';
import { DiscountCodeModalPage } from './models/discount-code-modal/discount-code-modal.page';
import { OutletProductsAndCollectionsModalPage } from './models/outlet-products-and-collections-modal/outlet-products-and-collections-modal.page';
import { SummaryModalPage } from './models/summary-modal/summary-modal.page';

@Component({
  selector: 'app-create-discount',
  templateUrl: './create-discount.page.html',
  styleUrls: ['./create-discount.page.scss'],
})
export class CreateDiscountPage implements OnInit {

  @ViewChild(IonContent, { static: true }) content: IonContent;

  couponId = '';
  discountModel = new Discount();
  tempDiscountModel: any;
  terms = [];
  isSubmitted: boolean = false;
  discountTypeForm: FormGroup;
  outletList = [];
  tempOutletList = [];
  collectionList = [];
  productList = [];

  constructor(private router: Router, private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private createOfferService: CreateOfferService) {
    this.route.queryParams.subscribe(res => {
      this.couponId = res['couponId'];
      console.log('this.couponId', this.couponId);
    });
  }

  ionViewWillEnter() {

    AppData.commonDiscountSub$.subscribe((data) => {
      console.log(data);
      if (data !== null && data['key']) {
        this.discountModel['discountType'] = data['discountType'];
        this.discountModel[Object.keys(data)[1]] = data.key(1);
        this.init();
        AppData.commonDiscountSub$.next(null);
      }
      else if (data !== null && data['type'] === 'discountApplies') {
        console.log('applies to', data)
        this.discountModel['categories'] = data['categories']
        this.discountModel['items'] = data['items']
        this.productList = data['items']
        this.collectionList = data['categories']
        AppData.commonDiscountSub$.next(null);
      }
      // else if (data !== null && data['type'] === 'discountApplies') {
      //   console.log('applies to', data)
      //   this.discountModel['categories'] = data['categories']
      //   this.discountModel['items'] = data['items']
      //   this.productList = data['items']
      //   this.collectionList = data['categories']
      //   AppData.commonDiscountSub$.next(null);
      // }
    })
  }

  ngOnInit() {
    this.init();
    if (this.couponId) {
      this.getCouponById(this.couponId);
    }

    this.tempOutletList = AppData.outletList.filter(itm => itm.status == 'active');
    this.outletList = this.tempOutletList;
    console.log('tempOutletList', this.tempOutletList);
  }

  init() {
    this.discountTypeForm = this.fb.group({
      outletSelectionTypeV: [this.selectedOutlets, Validators.required],
      couponCode: [this.discountModel['couponCode'], Validators.required],
      discountType: [this.discountModel['discountType'], Validators.required],
      cart: this.fb.group({
        minRequirementV: [this.discountModel['cart']['minRequirementV']],
        minQty: [this.discountModel['cart']['minQty']],
        minAmount: [this.discountModel['cart']['minAmount']],
      }),
    });

    this.addRemoveCartKey('none');
  }
  selectedOutlets = [];

  getCouponById(couponId) {
    this.createOfferService.getDiscountById(couponId).then(async (res) => {
      const responseData = res['body']['data'];
      this.discountModel = Object.assign(this.discountModel, responseData);
      console.log('this.discountModel', this.discountModel);
      this.productList = this.discountModel['items'];
      this.collectionList = this.discountModel['categories'];
      // delete this.discountModel['appNames']
      // delete this.discountModel['createdAt']
      // delete this.discountModel['createdBy']
      // delete this.discountModel['description']
      // delete this.discountModel['isSharing']
      // delete this.discountModel['lastModifiedDate']
      // delete this.discountModel['shareConfig']
      // delete this.discountModel['showToClient']
      // delete this.discountModel['updatedAt']
      // delete this.discountModel['usedBudget']

      this.tempDiscountModel = this.discountModel;
      this.selectedOutlets = this.discountModel['outletIds'];
      this.discountTypeForm.controls['outletSelectionTypeV'].setValue(this.selectedOutlets);
      this.init();
      //  this.addRemoveCartFrmKey();
      console.log('discountModel', this.discountModel);
      AppData.discountModelSub$.next(this.discountModel);
      console.log(this.discountModel);
    });
  }
  onSaveOffer() {
    console.log(this.discountTypeForm.value);
  }

  // Add and remove cart form group keys
  async addRemoveCartFrmKey() {
    this.discountTypeForm.addControl('cart', this.fb.group({ minRequirementV: [this.discountModel['cart']['minRequirementV']] }));
    //  await this.createOfferService.getMiniReqDiscountTerms(this.discountTypeForm);

    await this.addRemoveCartKey(this.discountModel['cart']['minRequirementV']);

    this.discountTypeForm.get('cart').get('minRequirementV').valueChanges.subscribe(async (val) => {
      await this.addRemoveCartKey(val);
    });
  }

  addRemoveCartKey(val) {
    console.log('chdbskjnlm;,.', val);
    if (val === 'none') {
      (this.discountTypeForm.get("cart") as FormGroup).removeControl('minQty');
      (this.discountTypeForm.get("cart") as FormGroup).removeControl('minAmount');
    }
    else if (val === 'amount') {
      (this.discountTypeForm.get("cart") as FormGroup).addControl('minAmount',
        this.fb.control(this.discountModel['cart']['minAmount'], [Validators.required, Validators.min(1), Validators.minLength(1), Validators.maxLength(2)]));
      (this.discountTypeForm.get("cart") as FormGroup).removeControl('minQty');
    } else if (val === 'quantity') {
      (this.discountTypeForm.get("cart") as FormGroup).addControl('minQty',
        this.fb.control(this.discountModel['cart']['minQty'], [Validators.required, Validators.min(1), Validators.minLength(1), Validators.maxLength(2)]));
      (this.discountTypeForm.get("cart") as FormGroup).removeControl('minAmount');
    }
  }


  discountType() {
    AppData.discountModelSub$.next(this.discountModel)
    this.router.navigate([ROUTES_STR.discountType]);
  }

  discountAppliesTo() {
    this.router.navigate([ROUTES_STR.discountAppliesTo]);
  }

  checked: string;
  requirements(event) {
    this.addRemoveCartKey(event.detail.value);
    console.log(this.discountTypeForm.value.cart);
    console.log(this.discountModel);
    // if(this.cartFormGrp.minRequirementV.value === 'amount'){
    // }
    // else if(this.cartFormGrp.minRequirementV.value === 'quantity'){
    // }
  }

  get offerFormGrp() { return this.discountTypeForm.controls; } // getting parent form group control
  get cartFormGrp() { return this.offerFormGrp.cart['controls'] }


  async onChangeOutlet() {
    let modal = await this.modalController.create({
      component: OutletProductsAndCollectionsModalPage, cssClass: 'itemSearch-modal',
      componentProps: {
        outletIds: this.discountModel['outletIds'],
        requiredFor: 'outlets'
      }
    });
    modal.onDidDismiss().then(async (res) => {
      if (res.data) {
        this.discountModel['outletIds'] = res.data;
        this.discountTypeForm.controls['outletSelectionTypeV'].setValue(res.data);
      }
    })
    return await modal.present();
  }

  onGenerateCode() {
    const code = generateDiscountCode(12);
    this.discountModel['couponCode'] = code.toUpperCase();
    this.discountTypeForm.controls['couponCode'].setValue(code.toUpperCase());
  }

  async changeDiscountCode() {
    let modal = await this.modalController.create({
      component: DiscountCodeModalPage, cssClass: 'discountCode-modal',
      componentProps: {
        discountCode: this.discountModel['couponCode']
      }
    });
    modal.onDidDismiss().then(async (res) => {
      if (res.data) {
        this.discountModel['couponCode'] = res.data.toUpperCase();
        this.discountTypeForm.controls.couponCode.setValue(res.data.toUpperCase(), { emit: false });
      }
    })
    return await modal.present();
  }


  async viewDetails() {
    let modal = await this.modalController.create({
      component: SummaryModalPage, cssClass: 'itemViewModal'
    });
    modal.onDidDismiss().then(async (res) => {
      if (res.data) {
        this.discountTypeForm.controls.couponCode.setValue(res.data.toUpperCase(), { emit: false });
      }
    })
    return await modal.present();
  }


  async onSave() {
    this.isSubmitted = true;
    console.log(this.discountModel);
    setTimeout(() => { this.scrollToFirstInvalidControl() }, 100);
    if (this.discountTypeForm.valid) {

      this.discountModel['cart'] = this.discountTypeForm.value.cart;
      this.discountModel['terms'] = ["Available on online sales channels", "50% off all products"]
      // AppData.discountTypeSub$.subscribe((res) => {
      //   if (res !== null) {
      //     this.discountModel['discountType'] = res['discountType'];
      //     this.discountModel[res['discountType']] = res['percentage'] || res['net'] || res['percentage'];
      //   }
      // });

      if (this.couponId) {

        await this.getProAndCollIds();

        this.createOfferService.updateCoupon(this.discountModel)
          .then((res) => {

            this.router.navigate([ROUTES_STR.discount]);
          })
          .catch((err) => { })
      }
      else {
        this.createOfferService.createCoupon(this.discountModel)
          .then((res) => {
            this.router.navigate([ROUTES_STR.discount]);

          })
          .catch((err) => { })
      }

    }
    console.log(this.discountModel);
    console.log(this.discountTypeForm);


  }

  async getProAndCollIds() {
    if (this.discountModel['couponAppliesToV'] === 'collection') {
      this.discountModel['categories'] = getIdsFromCats(this.collectionList)
    }
    else if (this.discountModel['couponAppliesToV'] === 'items') {
      this.discountModel['items'] = getIdsFromItems(this.productList)
    }
  }
  onGetDiscountTerms(term) {
    if (Object.keys(term).length > 1) {
      this.terms = Object.values(JSON.parse(JSON.stringify(term)));
    } else {
      this.terms = [];
    }
  }


  scrollToFirstInvalidControl() {
    // let yOffset = document.getElementById('is-inp-invalid').offsetTop;
    // this.content.scrollToPoint(100, yOffset, 500);
    const firstElementWithError: HTMLElement = document.getElementById('is-inp-invalid');
    if (firstElementWithError) {
      firstElementWithError.scrollIntoView({ behavior: 'smooth', block: "center" });
    }
  }

  getValid(fieldName) {
    return getInputFieldValidation(this.discountTypeForm, fieldName, this.isSubmitted);
  }

  // for checking valid fields
  fstLevelForm(firstGrpFieldName, fieldName) {
    return getNestedGrpFieldValidation(this.discountTypeForm, firstGrpFieldName, fieldName, this.isSubmitted);
  }

  settingsValue(event) {
    if (event['type'] === 'usage') {
      this.discountModel['usage'] = event['value']
    }
    else if (event['type'] === 'dateSpan') {
      this.discountModel['activeSlots']['dateSpan'] = event['value']
    }
    console.log('vhfdknl;', event);
  }

  dismiss() {
    this.router.navigate([ROUTES_STR.discount]);
  }
}
