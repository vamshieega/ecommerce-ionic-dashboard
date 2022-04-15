/* eslint-disable arrow-body-style */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/dot-notation */;
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiRequestService } from 'src/app/shared/services/api-request.service';
import { AppData } from 'src/app/shared/services/app-data.service';
import { FirebaseAnalysisService } from 'src/app/shared/services/firebase-analysis.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ManageOutletService } from './services/manage-outlet.service';
@Component({
  selector: 'app-manage-outlet',
  templateUrl: './manage-outlet.page.html',
  styleUrls: ['./manage-outlet.page.scss']
})
export class ManageOutletPage implements OnInit {

  modalObj: any;
  searchForm: FormGroup;
  outletList: any[] = [];
  copyOutletList = [];
  searchKey: string = '';
  filterOutletList = [];
  outletId: string;
  isViewType: string;
  buttonName = 'View';
  listLength: number;
  setOrderListLength = false;
  tempValue: any;
  search: FormControl = new FormControl();

  constructor(
    private apiService: ApiRequestService,
    private manageoutletService: ManageOutletService,
    private loaderService: LoaderService
  ) {

    this.search.valueChanges.pipe().subscribe(val => {
      let searchKey = val ? val.trim() : '';
      this.filterList(searchKey);
    });
    AppData.outletIdSub$.subscribe((outletId) => {
      this.outletId = outletId;
    });
  }

  ngOnInit() {
    this.loaderService.show();
    AppData.outletListSub$.subscribe(res => {
      this.modalObj = res;
    })
    this.getOutlets();
    this.displayType();
  }

  pullToRefresh(event) {
    this.getOutlets();
    event.target.complete();
  }

  getOutlets() {
    this.loaderService.show();
    this.apiService.get('outletList').then((response) => {
      const inputData = {
        displayType: 'MAIN_HEADER',
        outletList: response['body']['data']
      };
      this.loaderService.hide();
      this.outletList = inputData.outletList;
      AppData.outletListSub$.next({
        changeIndex: false,
        outletList: this.outletList
      });
      this.copyOutletList = JSON.parse(JSON.stringify(this.outletList));
      this.listLength = this.copyOutletList.length
    }).catch((err) => { });
  }

  displayType() {
    if (this.modalObj?.displayType === 'SUB_HEADER') {
      this.isViewType = 'SUB_HEADER';
    } else {
      this.isViewType = 'MAIN_HEADER';
    }
  }

  toggleButton(outlets, ind) {
    this.manageoutletService.getOutletDetails(outlets.outletId).then((res) => {
      const responseData = res['body']['data'];
      AppData.outletDetailsSub$.next(responseData);
    });
    AppData.outletIdSub$.next(outlets.outletId);
    AppData.outletNameSub$.next(outlets.displayName);
    AppData.selectedOutlet = ind;
    AppData.profileMenuSelectedSub$.next(0);
  }

  isActive(outletId) {
    if (outletId === this.outletId) {
      this.buttonName = 'Active';
    } else {
      this.buttonName = 'View';
    }
  }

  switchOnOff(outlets) {
    const reqData = {
      'outletId': outlets['outletId'],
      'available': outlets['available'] === 'on' ? 'off' : 'on'
    };
    //this.firebaseAnalysisService.logEvent('on_off', reqData); 

    this.manageoutletService.setOnOff(reqData).then((response) => {
      this.outletList.forEach((obj) => {
        this.tempValue = obj;
        if (obj.outletId === outlets.outletId) {
          obj['available'] = obj['available'] === 'on' ? 'off' : 'on';
        }
      });

      AppData.outletListSub$.next({
        changeIndex: false,
        outletList: this.outletList
      });

      this.copyOutletList = JSON.parse(JSON.stringify(this.outletList));
      if (this.searchKey != '') {
        this.filterList(this.searchKey);
      }
    });
  }

  filterList(searchKey) {
    this.searchKey = searchKey;
    if (searchKey !== '') {
      searchKey = searchKey.toLowerCase();
      this.filterOutletList = this.outletList.filter(item => {
        if (item['locality']) {
          return item['outletName'].toLowerCase().indexOf(searchKey) >= 0 || item['locality'].toLowerCase().indexOf(searchKey) >= 0;
        }
      });
      this.copyOutletList = JSON.parse(JSON.stringify(this.filterOutletList));
      if (this.copyOutletList.length === 0) {
        this.setOrderListLength = true;
      }
      else {
        this.setOrderListLength = false;
      }
    } else {
      this.setOrderListLength = false;
      this.copyOutletList = JSON.parse(JSON.stringify(this.outletList));
    }
  }

}
