import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { environment } from 'src/environments/environment';
import { PROFILE_MENU_LIST } from 'src/app/core/constants/app-constants';
import { ApiRequestService } from 'src/app/shared/services/api-request.service';
import { AppData } from 'src/app/shared/services/app-data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private headers: HttpHeaders;
  selectedSubIndex = 0;
  selectedIndex = 0;
  public manageAddressFrom = new BehaviorSubject(null);
  profileMenuItem = PROFILE_MENU_LIST;

  constructor(
    private apiService: ApiRequestService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    this.headers = new HttpHeaders({
      'api-access-key': '5c164b7d-2957-44ad-bd8f-e81f4d9e2dd4',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    console.log('=======>Profile Service');
  }

  getCurrentAddress(lat, lng) {
    return this.apiService.get(
      'getCurrentAddress',
      '?latlng=' + lat + ',' + lng + '&key=' + environment.mapApiKey,
      ''
    );
  }

  saveAddressForm(data) {
    this.manageAddressFrom.next(data);
  }
  setOutletDataInLocalStorage(basicDetail, responseData) {
    const outlet = {
      available: 'off',
      displayName: basicDetail.displayName,
      outletId: AppData.outletId,
      outletName: basicDetail.outletName,
      status: responseData['newOutletStatus'],
      config: {
        notificationConfig: {
          onClickOrderAccept: false,
          soundUrl: '',
        },
        printConfig: {
          printKot: true,
        },
        businessType: basicDetail.businessType,
      },
    };
    const outletList = AppData.outletList;
    if (!outletList.some((ol) => ol.outletId === outlet.outletId)) {
      outletList.push(outlet);
    } else {
      outletList.forEach((outletDet, index) => {
        if (outletDet.outletId === outlet.outletId) {
          // to set the previos available status of outlet while modifying the details.
          outlet.available = outletDet.available;
          outletList[index] = outlet;
        }
      });
    }
    const obj = {
      changeIndex: false,
      outletList: outletList,
    };
    AppData.outletListSub$.next(obj);
  }

  saveOutletDetails(outletData) {
    return this.apiService.post('outlet', outletData);
  }

  // for getting outlet details data
  async getOutletData(outletId) {
    this.loaderService.show();
    this.apiService
      .get('fetchOutletDetails', '?outletId=' + outletId)
      .then((response) => {
        AppData.outletDetailsSub$.next(response['body']['data']);
        // this.outletDetails = response['data'];
        console.log('OUTLETS DATA', response);
        this.getuserList(outletId);
        this.loaderService.hide();
      });
  }
  getuserList(outletId) {
    this.apiService
      .get('viewUsers', '?outletId=' + outletId)
      .then((response) => {
        AppData.userListSub$.next(response['body']['data']);
      });
  }

	getCertificateLink(obj) {
		return this.apiService.post('fssaiCertificateLink', obj);
	}


	// for getting outlet details data


	// for setup fields navigation
	navigation(ind) {
		AppData.profileMenuSelectedSub$.next(ind);
		this.selectedIndex = ind;
		console.log(this.selectedIndex);

		// if (this.profileMenuItem[ind].subMenu) {
		// 	document.getElementById('configIcon').style.transform = 'rotate(180deg)';
		// } else {
		// 	document.getElementById('configIcon').style.transform = 'rotate(0deg)';
		// }
	}

	// for setting new outlet status
	setOutletStatus(outletId, newStatus) {
		const newOutletList = AppData.outletList;
		console.log(newOutletList);

		newOutletList.find(item => item.outletId === outletId).status = newStatus;
		const obj = {
			changeIndex: false,
			outletList: newOutletList
		};
		AppData.outletListSub$.next(obj);
	}

	onVerifyAccount(reqBody) {
		return this.apiService.post('verifyBankAccount', reqBody);
	}


	accountInitVerification(outletId) {
		return this.apiService.get('initVerification', '?outletId=' + outletId);
	}

}
