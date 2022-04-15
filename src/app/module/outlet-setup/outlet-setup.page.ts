import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import {
  PROFILE_MENU_LIST,
  ROUTES_STR,
} from 'src/app/core/constants/app-constants';
import { AppData } from 'src/app/shared/services/app-data.service';
import { OutletModalPage } from '../outlet-modal/outlet-modal.page';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-outlet-setup',
  templateUrl: './outlet-setup.page.html',
  styleUrls: ['./outlet-setup.page.scss'],
})
export class OutletSetupPage implements OnInit {

  @ViewChild(IonSlides) slider: IonSlides;

  profileMenuItem = PROFILE_MENU_LIST;
  outletDataSubscription = new Subscription();
  outletDetailsSubscription = new Subscription();
  selectedIndex = 1;
  outletName = '';
  outletLocality = '';
  selectedType: number;
  headerText = 'Outlet info';
  constructor(private route: Router, private profileService: ProfileService,
    private modalController: ModalController) {
    this.outletDataSubscription = AppData.outletIdSub$.subscribe((outletId) => {
      if (outletId) {
        this.profileService.getOutletData(outletId);
      }
    });
    this.outletDetailsSubscription = AppData.outletDetailsSub$.subscribe((outletData) => {
      if (outletData) {
        console.log("called", outletData)
        this.outletName = outletData['basic']['outletName'];
        this.outletLocality = outletData['basic']['locality'];
        this.checkIonDisplay(outletData);
      }
    });
  }

  ngOnInit() {
    // this.selectedType = this.selectedIndex;
    AppData.profileMenuSelectedSub$.next(0);
    AppData.profileMenuSelectedSub$.subscribe((index) => {
      this.selectedIndex = index;
      this.selectedType = index;
    });
    AppData.outletNameSub$.subscribe((res) => {
      console.log('vdjsbukj', res);
    })
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
        selectedOutletName: this.outletName, locality: this.outletLocality,
        selectedOutletId: AppData.outletId
      }
    });
    modal.onDidDismiss().then(async (res) => {
      if (res.data) {
        this.outletName = res.data?.name;
      }
    })
    return await modal.present();
  }

  disabledList() {
    if (AppData.outletId) {
      return false;
    } else {
      return true;
    }
  }

  async ionSegmentChanged() {
    await this.slider.slideTo(this.selectedType);
    this.slider.update();
    this.selectedType = await this.slider.getActiveIndex();
    this.focusChangeSegment(this.selectedType);
  }

  focusChangeSegment(segmentId) {
    document.getElementById(segmentId).scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }

  onOrderStatusTypeChange(value, text) {
    this.selectedIndex = value;
    this.selectedType = value;
    this.headerText = text;
  }

  checkIonDisplay(outletData) {
    if (outletData['gstin']['status'] === 'complete') {
      this.profileMenuItem.find(item => item.name === 'Billing / Taxes').isCompleted = true;
    } else {
      this.profileMenuItem.find(item => item.name === 'Billing / Taxes').isCompleted = false;
    } if (outletData['fssai']['status'] === 'complete') {
      this.profileMenuItem.find(item => item.name === 'FSSAI').isCompleted = true;
    } else {
      this.profileMenuItem.find(item => item.name === 'FSSAI').isCompleted = false;
    }
    if (outletData['basic']['basicDetailsStatus'] === 'complete') {
      this.profileMenuItem.find(item => item.name === 'Basic Details').isCompleted = true;
    } else {
      this.profileMenuItem.find(item => item.name === 'Basic Details').isCompleted = false;
    }
    if (outletData['finance']['status'] === 'complete') {
      this.profileMenuItem.find(item => item.name === 'Bank Details').isCompleted = true;
    } else {
      this.profileMenuItem.find(item => item.name === 'Bank Details').isCompleted = false;
    }
    if (this.checkOpHours(outletData)) {
      this.profileMenuItem.find(item => item.name === 'Operational timings').isCompleted = true;
    } else {
      this.profileMenuItem.find(item => item.name === 'Operational timings').isCompleted = false;
    }
  }
  checkOpHours(outletData) {
    let returnVal = [];
    if (outletData.opHours && outletData.opSettingType !== undefined) {
      returnVal = outletData.opHours.filter((slot) => {
        return slot.operational
      });
      return returnVal.length > 0 ? true : false
    }
  }

  onBack() {
    this.route.navigate([ROUTES_STR.dashboard]);
  }
  ngOnDestroy() {
    this.outletDataSubscription.unsubscribe();
    this.outletDetailsSubscription.unsubscribe();
    console.log('PAGE INIT DESTROY: PROFILE');
  }
}
