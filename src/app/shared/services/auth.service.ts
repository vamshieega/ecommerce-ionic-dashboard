import { AppData } from './app-data.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './../../core/services/storage.service';
import { Injectable, NgZone } from '@angular/core';
import { IdsService } from './ids.service';
import { ROUTES_STR } from 'src/app/core/constants/app-constants';
import { OrderService } from 'src/app/module/orders/services/order.service';
import { ApiRequestService } from './api-request.service';
import { OutletDetails } from 'src/app/module/outlet-setup/model/outlet-details.model';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/module/login/services/login.service';
import { Order } from '../models/order.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  outletIds = [];
  private state: RouterStateSnapshot;

  constructor(
    private storageService: StorageService,
    private idsService: IdsService,
    private router: Router,
    private orderService: OrderService,
    private apiService: ApiRequestService,
    private navctrl: NavController,
    private ngZone: NgZone,
    private loginService: LoginService
  ) {
    this.state = router.routerState.snapshot;
    if (this.isAuthenticated()) {
      this.reInitializeAppData();
      AppData.token$.next(this.storageService.getItem('token'));
      AppData.isAuthenticated = true;
    } else {
      console.log('inside initApp');
      this.initializeAppData();
    }

    this.getDeviceId();
  }

  getDeviceId() {
    const deviceId = this.storageService.getItem('deviceId');
    console.log(deviceId);

    if (deviceId === null || deviceId === '') {
      AppData.deviceIdSub$.next(this.idsService.generate());
    }
  }

  isAuthenticated() {
    return AppData.isAuthenticated;
  }

  initializeAppData() {
    AppData.userDataSub$.next(null);
    AppData.restDataSub$.next(null);
    AppData.token$.next(null);
    AppData.isAuthenticated = false;
  }

  reInitializeAppData() {
    console.log('re-init called');
    AppData.token$.next(this.storageService.getItem('token'));
    AppData.userDataSub$.next(this.storageService.getItem('userData'));

    AppData.isAuthenticated = true;

    const currentUrlTree = this.router['location']['_platformLocation']['location']['pathname'];
    const routeItem = this.router['location']['_platformLocation']['location']['search'];
    if (AppData.isAuthenticated) {
      if (currentUrlTree === '/login' || currentUrlTree === '/') {
        this.router.navigate([ROUTES_STR.orders]);
      }
       else {
        this.router.navigateByUrl(currentUrlTree + routeItem);
      }
    } else {
      this.router.navigate([ROUTES_STR.login]);
    }
  }

  logOut() {
    return new Promise((resolve, reject) => {
      this.apiService.post('logout', {}).then((res) => {
        this.storageService.clearStorage();
        this.initializeAppData();
        this.orderService.orderListIndexSubject$.next(0);
        this.orderService.orderCancelFromSupport$.next(null);
        this.orderService.orderStatusListModelKeySubject$.next('acceptanceWait');
        this.orderService.orderFilterSubject$.next(null);
        AppData.selectedIndexSub$.next(-1);
        AppData.outletDetailsSub$.next(null);
        AppData.customerDetailsSub$.next(null);
        AppData.selectedOrderItemSub$.next([]);
        AppData.posOutletsSub$.next([]);
        AppData.userLoginDaySub$.next('');
        //AppData.businessTypeSub$.next(null);
        AppData.posSelectedOutletSub$.next({ selectedOutletId: '', selectedOutletName: '' });
        AppData.outletIdSub$.next('');
        AppData.outletListSub$.next([]);
        //this.router.navigate([ROUTES_STR.login]);
        this.navctrl.navigateBack([ROUTES_STR.login]);
        // this.ngZone.run(() => this.router.navigate(['login']));
        this.orderService.ordersSubject$.next({ model: new Order(), modelKey: 'acceptanceWait' });
        this.orderService.ordersSubject$.subscribe(data => {
        })
        resolve(res);
      });
    });
  }

}
