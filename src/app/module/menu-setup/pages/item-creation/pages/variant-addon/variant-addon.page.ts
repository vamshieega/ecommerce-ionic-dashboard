import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES_STR } from 'src/app/core/constants/app-constants';
import { AppData } from 'src/app/shared/services/app-data.service';

@Component({
  selector: 'app-variant-addon',
  templateUrl: './variant-addon.page.html',
  styleUrls: ['./variant-addon.page.scss'],
})
export class VariantAddonPage implements OnInit {

  itemVariantForm: FormGroup;
  @Input() itemAddonsDetails: any;
  variantDetails = [];
  addonsCount: number = 0;
  variantsCount: number = 0;
  finalObj: any;
  finalObj2: any;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentItem: SimpleChange = changes.itemAddonsDetails;
    if (currentItem.currentValue) {

      if (currentItem.currentValue && currentItem.currentValue['addons']) {
        AppData.addonDetailsSub$.next(currentItem.currentValue['addons'].filter(item => { if (!item.isVariant) { return item.options } }));
        AppData.variantDetailsSub$.next(currentItem.currentValue['addons'].filter(itm => { if (itm.isVariant) { return itm.options } }));
        this.setFormValue();
      }
    }

    AppData.addonDetailsSub$.subscribe((res) => {
      this.addonsCount = res.length
    })
    AppData.variantDetailsSub$.subscribe((res) => {
      this.variantsCount = res.length;
    })
  }

  itemVariant() {
    this.router.navigate([ROUTES_STR.addVariant]);
  }

  addAddons(addons) {
    this.router.navigate([ROUTES_STR.addAddon], {
      state: {
        addonsPage: addons,
      }
    });
  }

  async getVariantData() {
    if (this.itemVariantForm.value.variantAdded && this.variantsCount > 0) {
      if (this.variantsCount > 0) {
        AppData.variantDetailsSub$.subscribe((res) => {
          this.finalObj = {
            variantAdded: true,
            variants: res
          }
        });
        console.log({ ...this.finalObj });
        return { ...this.finalObj };
      }
    }
    else if (!this.itemVariantForm.value.variantAdded || this.variantsCount === 0) {
      let finalObj = {
        variantAdded: false,
        variants: []
      }
      return { ...finalObj }
    }
  }

  getAddonsDetails() {
    if (this.itemVariantForm.value.addonAdded && this.addonsCount > 0) {
      AppData.addonDetailsSub$.subscribe((res) => {
        res.forEach(obj => {
          obj['displayName'] = obj.addonName;
          obj['currentAddon'] = false;
          obj['addonAvailable'] = true;
          delete obj['selectType'];
          delete obj['integrationId'];
          delete obj['description'];
          delete obj['currentVariant'];

          this.finalObj2 = {
            addonAdded: true,
            addons: res
          }
        });
      });
      return { ...this.finalObj2 }
    }
    else if (!this.itemVariantForm.value.addonAdded || this.addonsCount === 0) {
      let finalObj = {
        addonAdded: false,
        addons: []
      }
      return { ...finalObj }
    }
  }

  initForm() {
    this.itemVariantForm = this.fb.group({
      variantAdded: [false],
      addonAdded: [false]
    });
  }

  setFormValue() {
    if (this.variantsCount > 0) {
      this.itemVariantForm.controls.variantAdded.setValue(true, { emit: false });
    }
    if (this.addonsCount > 0) {
      this.itemVariantForm.controls.addonAdded.setValue(true, { emit: false });
    }
  }

}

