import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ROUTES_STR } from 'src/app/core/constants/app-constants';
import { AppData } from 'src/app/shared/services/app-data.service';
import { Discount } from '../../models/discount';
import { OutletProductsAndCollectionsModalPage } from '../../models/outlet-products-and-collections-modal/outlet-products-and-collections-modal.page';

@Component({
  selector: 'app-discount-applies-to',
  templateUrl: './discount-applies-to.page.html',
  styleUrls: ['./discount-applies-to.page.scss'],
})
export class DiscountAppliesToPage implements OnInit {

  discountModel = new Discount();
  couponAlliesTo: String;
  outletIds = [];
  couponId: string;
  itemList = [];
  categoryList = [];


  discountAppliesForm: FormGroup;
  constructor(private modalController: ModalController, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.initForm();
    AppData.discountModelSub$.subscribe(async (res) => {
      if (res !== null) {
        this.discountModel = res;
        this.itemList = res['items'];
        this.couponId = res['couponId']
        this.categoryList = res['categories'];
        this.outletIds = res['outletIds'];
        this.type = this.discountModel['couponAppliesToV'] === 'items' ? 'products' : 'collections';
        console.log(res);
        this.initForm();
      }
    })
    console.log(this.discountModel);
  }


  initForm() {
    this.discountAppliesForm = this.fb.group({
      couponAppliesToV: [this.discountModel['outletIds'].length === 1 ? this.discountModel['couponAppliesToV'] : 'all'],
    });
    console.log(this.discountAppliesForm);
  }

  async productModal() {
    let modal = await this.modalController.create({
      component: OutletProductsAndCollectionsModalPage, cssClass: 'itemSearch-modal',
      componentProps: {
        outletIds: this.outletIds,
        requiredFor: this.discountModel['couponAppliesToV'],
        selectedItems: this.discountModel['couponAppliesToV'] === 'items' ? this.itemList : this.categoryList
      }
    });
    modal.onDidDismiss().then(async (res) => {
      console.log(res);
      if (res.data) {
        if (this.discountModel['couponAppliesToV'] === 'collection') {
          this.categoryList = res.data;
        }
        else if (this.discountModel['couponAppliesToV'] === 'items') {
          this.itemList = res.data;
        }
      }
      // else if (res.data['type'] === 'items') {
      // }
    })
    return await modal.present();
  }

  onSave() {
    console.log(this.categoryList);
    console.log(this.itemList);

    let obj = {
      categories: this.discountModel['couponAppliesToV'] !== 'items' ? this.categoryList : this.categoryList = [],
      items: this.discountModel['couponAppliesToV'] === 'items' ? this.itemList : this.itemList = [],
      type: 'discountApplies'
    }
    AppData.commonDiscountSub$.next(obj);

    if (this.couponId !== "") {
      this.router.navigate([ROUTES_STR.createOffer], { queryParams: { couponId: this.couponId } })
    }
    else {
      this.router.navigate([ROUTES_STR.createOffer]);
    }
  }

  type: String
  radioCheck(event) {
    this.discountModel['couponAppliesToV'] = event.detail.value;
    this.type = this.discountModel['couponAppliesToV'] === 'items' ? 'products' : 'collections';
  }

  removeProdCollection(index) {
    this.discountModel['couponAppliesToV'] === 'items' ? this.itemList.splice(index, 1) : this.categoryList.splice(index, 1);
  }
}
