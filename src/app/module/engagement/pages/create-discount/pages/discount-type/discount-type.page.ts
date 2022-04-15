import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ROUTES_STR } from 'src/app/core/constants/app-constants';
import { AppData } from 'src/app/shared/services/app-data.service';
import { getInputFieldValidation, getNestedGrpFieldValidation } from 'src/app/shared/utils/common-functions';
import { Discount } from '../../models/discount';
import { OutletProductsAndCollectionsModalPage } from '../../models/outlet-products-and-collections-modal/outlet-products-and-collections-modal.page';

@Component({
  selector: 'app-discount-type',
  templateUrl: './discount-type.page.html',
  styleUrls: ['./discount-type.page.scss'],
})
export class DiscountTypePage implements OnInit {


  buyX: boolean = false;
  percentage: boolean = false;
  fixed: boolean = false;
  freeShipping: boolean = false;
  discountModel = new Discount();

  isSubmitted: boolean = false;
  discountTypeForm: FormGroup;
  couponId: string;

  constructor(private fb: FormBuilder, private router: Router, private modalController: ModalController, private route: ActivatedRoute) {

    this.initForm();


    this.route.queryParams.subscribe(res => {
      this.couponId = res['couponId'];
    });

    //   this.discountTypeForm["discountType"].valueChanges
    // .debounceTime(400)
    // .switchMap(term => this.discountTypeForm['discountType'](term))
    // .subscribe(
    //    async data => {
    //     await this.addDisplayTypeFrmKey(this.discountTypeForm['discountType'])
    //    },
    //    () => {this.completeAnimation()}
    // );


  }

  getData() {
    this.discountTypeForm.get("discountType").valueChanges.subscribe(async (val) => {
      console.log('vfuidhj', val)
      if (val !== null) {
        await this.addDisplayTypeFrmKey(val);
      }
    });
  }

  ngOnInit() {
    AppData.discountModelSub$.subscribe(async (res) => {
      if (res !== null) {
        this.discountModel = res;
        this.couponId = this.discountModel['couponId'];
        this.initForm();
        await this.addDisplayTypeFrmKey(this.discountModel['discountType']);
      }
    })
  }

  initForm() {
    this.discountTypeForm = this.fb.group({
      discountType: [this.discountModel['discountType']],
      percentage: this.fb.group({
        discountValue: [this.discountModel['percentage']['discountValue'], [Validators.required, Validators.min(1), Validators.max(100)]],
        maxDiscountOptedV: [this.discountModel['percentage']['maxDiscountOptedV']],
        maxDiscount: [this.discountModel['percentage']['maxDiscount']],
      })
    });
    console.log(this.discountTypeForm);
  }


  async addDisplayTypeFrmKey(val) {
    this.isSubmitted = false;
    if (val === 'percentage') {
      this.discountTypeForm.addControl('percentage', this.fb.group({
        'discountValue': [this.discountModel['percentage']['discountValue'], [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
        'maxDiscountOptedV': [this.discountModel['percentage']['maxDiscountOptedV']],
        'maxDiscount': [this.discountModel['percentage']['maxDiscount']],
      }));
      this.discountTypeForm.removeControl('net');

    }

    else if (val === 'net') {
      this.discountTypeForm.removeControl('percentage');
      this.discountTypeForm.addControl('net', this.fb.group({
        'discountValue': [this.discountModel['net']['discountValue'], [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      }));
    }
    else if (val === 'freeDelivery') {
      this.discountTypeForm.removeControl('percentage');
      this.discountTypeForm.removeControl('net');
    }
    else if (val === 'bogo') {
      this.discountTypeForm.removeControl('percentage');
      this.discountTypeForm.removeControl('net');
      this.discountTypeForm.addControl('bogo', this.fb.group({
        satisfies: this.fb.group({
          'buysV': [this.discountModel['bogo']['satisfies']['buysV']],
          'itemSelectionV': [this.discountModel['bogo']['satisfies']['itemSelectionV']],
          'items': []
        }),
        gets: this.fb.group({
          'qty': [this.discountModel['bogo']['gets']['qty'], [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
          'atDiscountedValueV': [this.discountModel['bogo']['gets']['atDiscountedValueV']],
          'maxPerOrderV': [this.discountModel['bogo']['gets']['maxPerOrderV']],
          'items': [],
          'itemSelectionV': [this.discountModel['bogo']['gets']['itemSelectionV']]
        })
      }));
    }
  }


  switchdisc(event) {
    if (event.detail.checked) {
      (this.discountTypeForm.get("percentage") as FormGroup).addControl('maxDiscount',
        this.fb.control(this.discountModel['percentage']['maxDiscount']));
    }
    else {
      (this.discountTypeForm.get("percentage") as FormGroup).removeControl('maxDiscount');
    }
  }

  completeAnimation() {
    console.log('completed form')
  }

  onSaveOffer() {

    this.isSubmitted = true;
    console.log(this.discountTypeForm.value);
    if (this.discountTypeForm.valid) {
      this.discountTypeForm.value['key'] = function (n) { return this[Object.keys(this)[n]]; }
      AppData.commonDiscountSub$.next(this.discountTypeForm.value);
      if (this.couponId !== "") {
        this.router.navigate([ROUTES_STR.createOffer], { queryParams: { couponId: this.couponId } })
      }
      else {
        this.router.navigate([ROUTES_STR.createOffer]);
      }
    }
  }

  getValid(fieldName) {
    return getInputFieldValidation(this.discountTypeForm, fieldName, this.isSubmitted);
  }

  fstLevelForm(firstGrpFieldName, fieldName) {
    return getNestedGrpFieldValidation(this.discountTypeForm, firstGrpFieldName, fieldName, this.isSubmitted);
  }

  async productModal() {
    let modal = await this.modalController.create({
      component: OutletProductsAndCollectionsModalPage, cssClass: 'itemSearch-modal',
      componentProps: {
        outletIds: this.discountModel['outletIds'],
        requiredFor: 'items',
        // selectedItems: this.discountModel['couponAppliesToV'] === 'items' ? this.itemList : this.categoryList
      }
    });
    modal.onDidDismiss().then(async (res) => {
      console.log(res);
      if (res.data) {
        if (this.discountModel['couponAppliesToV'] === 'collection') {
          // this.categoryList = res.data;
        }
        else if (this.discountModel['couponAppliesToV'] === 'items') {
          // this.itemList = res.data;
        }
      }
      // else if (res.data['type'] === 'items') {
      // }
    })
    return await modal.present();
  }

  get offerFormGrp() { return this.discountTypeForm.controls; } // getting parent form group control
  get percentageFormGrp() { return this.offerFormGrp.percentage['controls'] } // getting percentage form group control
  get netFormGrp() { return this.offerFormGrp.net['controls'] } // getting percentage form group control
  get bogoFormGrp() { return this.offerFormGrp.bogo['controls'] } // getting percentage form group control

}
