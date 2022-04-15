import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_STR } from 'src/app/core/constants/app-constants';
import { MenuItem } from 'src/app/shared/models/menu-item.modal';
import { AppData } from 'src/app/shared/services/app-data.service';
import { MenuItemService } from '../../services/menu-item.service';
import { BasicDetailsPage } from './pages/basic-details/basic-details.page';
import { ChargesPage } from './pages/charges/charges.page';
import { MenuTimingsPage } from './pages/menu-timings/menu-timings.page';
import { VariantAddonPage } from './pages/variant-addon/variant-addon.page';

@Component({
  selector: 'app-item-creation',
  templateUrl: './item-creation.page.html',
  styleUrls: ['./item-creation.page.scss'],
})
export class ItemCreationPage implements OnInit {

  @ViewChild(BasicDetailsPage, { static: false }) basicDetailsPage: BasicDetailsPage;
  @ViewChild(ChargesPage, { static: false }) chargesPage: ChargesPage;
  @ViewChild(VariantAddonPage, { static: true }) variantaddonPage: VariantAddonPage;
  @ViewChild(MenuTimingsPage, { static: false }) menuTimingsPage: MenuTimingsPage;
  billingObj: any;
  itemId: string = '';
  outletId: string = '';
  outletName: string = '';
  menuItemModel = new MenuItem();
  itemDetails: any;
  addonsDetails = [];
  title: any;
  advanceOptions: boolean = true;

  constructor(private menuItemService: MenuItemService,
    private activeRoute: ActivatedRoute,
    private router: Router) {
    this.activeRoute.queryParams.subscribe(res => {
      this.itemId = res.id;
    })
  }

  ngOnInit() {
    if (this.itemId) {
      this.getItemDetails();
      this.title = 'Edit Item';
    }
    else {
      this.title = 'Create Item';
    }
  }

  onChangeBilling(obj) {
    this.billingObj = obj;
  }

  getItemDetails() {
    this.menuItemService.menuItemById(this.itemId).then((res) => {
      const responseData = res['body']['data'];
      console.log('responseData ->', responseData);
      this.itemDetails = { ...responseData['item'] };
      this.addonsDetails = { ...responseData };
      this.outletId = this.itemDetails['outletId'];
      this.outletName = this.itemDetails['outletName'];
      this.menuItemModel = Object.assign(this.menuItemModel, responseData['item']);
    });
  }

  async save() {
    const basicDetails = await this.basicDetailsPage.getDetails();  //fixed
    const chargesDetails = await this.chargesPage.getChargeDetails(); //fixed
    const variantDetails = await this.variantaddonPage.getVariantData(); //fixed
    const addonDetails = await this.variantaddonPage.getAddonsDetails();
    const menuTimingDetails = await this.menuTimingsPage.getMenuTimingDetails();// fixed

    console.log('BASIC DETAILS-------->', basicDetails);
    console.log('CHARGES DETAILS-------->', chargesDetails);
    console.log('VARIANT DETAILS-------->', variantDetails);
    console.log('ADDONS DETAILS-------->', addonDetails);
    console.log('MENU TIMING DETAILS-------->', menuTimingDetails);
    if (basicDetails && chargesDetails && variantDetails && addonDetails && menuTimingDetails) {
      const basicAndCharges = { ...basicDetails, ...chargesDetails, ...menuTimingDetails };
      basicAndCharges['variantAdded'] = variantDetails.variantAdded;
      basicAndCharges['addonAdded'] = addonDetails.addonAdded;
      basicAndCharges['itemId'] = this.itemId;
      basicAndCharges['outletId'] = AppData.outletId;
      basicAndCharges['outletName'] = this.outletName;
      basicAndCharges['opTimeUpdated'] = true;
      const addonAndVariant = [...variantDetails['variants'], ...addonDetails['addons']];
      const finalObj = {};
      finalObj['addons'] = [...addonAndVariant];
      finalObj['item'] = { ...basicAndCharges };
      if (this.itemId) {
        this.menuItemService.menuUpdateBasicDetails(finalObj).then((res: any) => {
          console.log(res);
          this.router.navigate([ROUTES_STR.allItems]);
          AppData.addonDetailsSub$.next([]);
          AppData.variantDetailsSub$.next([]);
        });
      } else {
        this.menuItemService.menuCreateBasicDetails(finalObj).then(res => {
          console.log(res);
          this.router.navigate([ROUTES_STR.allItems]);
        });
      }
    } else {

    }
  }

  back() {
    this.router.navigate([ROUTES_STR.allItems]);
    AppData.addonDetailsSub$.next([]);
    AppData.variantDetailsSub$.next([]);
  }

  backToAllItem() {
    this.router.navigate([ROUTES_STR.allItems]);
  }

  advanceFilters(event) {
    event.detail.checked === false ? this.advanceOptions = false : this.advanceOptions = true;
  }
}
