import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FIRST_OUTLET_COMPLETE, SIDE_MENU_LIST } from 'src/app/core/constants/app-constants';
import { ApiRequestService } from 'src/app/shared/services/api-request.service';
import { AppData } from 'src/app/shared/services/app-data.service';
import { BehaviorSubject } from 'rxjs';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
import { ConfirmationmodalPage } from 'src/app/shared/component/confirmationmodal/confirmationmodal.page';
import { AuthService } from 'src/app/shared/services/auth.service';

export class Menu {
  collapsed: boolean
}
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  @ViewChild(RouterOutlet) outlet: RouterOutlet;


  public sideMenuList = SIDE_MENU_LIST;
  public firstOutletComplete = FIRST_OUTLET_COMPLETE;
  isOpen = false;
  openHeight = 0;
  sidebarItems = [];
  isFirstOutletComplete = false;
  selectedIndex = 0;
  selectedSubIndex = 0;
  isCollapsed = false;
  orderFilterSubject$ = new BehaviorSubject(null);
  outletsList: any;
  outletsAvailableCount = 0;
  userDetails: any;
  outletIds = [];
  logoutOpen = false;
  version: string;

  constructor(
    private apiService: ApiRequestService,
    private modalController: ModalController,
    private router: Router,
    private authService: AuthService) {

    this.sidebarItems = SIDE_MENU_LIST;


    AppData.selectedIndexSub$.subscribe((index) => {
      this.selectedIndex = index;
    });

    // AppData.selectedSubIndexSub$.subscribe((index) => {
    //   this.selectedSubIndex = index;
    //   var menu = new Menu();
    //   menu = this.sidebarItems[this.selectedIndex];
    //   menu.collapsed = true;
    //   this.changeCollapse(menu, this.selectedIndex, false);
    // });

    AppData.userDataSub$.subscribe((userData) => {
      this.userDetails = userData;
    });

    AppData.versionSub$.subscribe((res) => {
      if (res !== '' && res !== null) {
        this.version = res;
      }
    })
  }

  ngOnInit(): void {
    this.getOutlets();
    const outletObj = AppData.outletList.length > 0 ? AppData.outletList[0] : '';
    this.isFirstOutletComplete = outletObj && outletObj['status'] === 'active' ? true : false;


    // this.router.events.subscribe(e => {
    //   console.log('app component console',e);
    //   console.log('app component console',e instanceof ActivationStart && e.snapshot.outlet);
    //   if (e instanceof ActivationStart && e.snapshot.outlet === "/home/dashboard"){
    //     console.log('app component console',this.outlet);
    //     this.outlet.deactivate();
    //   }
    // });
  }

  getOutlets() {
    this.apiService.get('outletList').then((response) => {
      this.outletsList = response['body']['data'];
      const obj = {
        changeIndex: false,
        outletList: this.outletsList
      };
      AppData.outletListSub$.next(JSON.parse(JSON.stringify(obj)));
      this.outletsAvailableCount = this.outletsList.filter(itm => itm.available === 'on').length;
    }).catch((err) => { });
  }

  async onLogout() {
    let modal = await this.modalController.create({
      component: ConfirmationmodalPage, cssClass: 'Confirmationmodal',
      componentProps: { icon: 'icon-logout', title: 'Do you want to logout?', endMsg: 'Exit' }
    });
    modal.onDidDismiss().then(async (res) => {
      if (res.data) {
        this.logOut();
      }
    })
    return await modal.present();
  }

  async logOut() {
    this.forUnsubscribeFCM();
    await this.authService.logOut();
  }

  forUnsubscribeFCM() {
    AppData.outletListSub$.subscribe((data) => {
      this.outletIds = data.outletList.map((item) => item.outletId);
      const outletIds = this.outletIds;
      AppData.outletListSub$.next([]);
      const body = {
        token: AppData.fcmToken,
        outletIds,
        action: 'unsubscribe',
      };
      this.apiService.post('newOrderSubscription', body);
    });
  }
  getOutletOnCount() {
    if (AppData.outletList !== undefined) {
      return AppData.outletList.filter(itm => itm.available === 'on').length;
    }
    if (AppData.outletList.length === undefined) {
      return 0
    }
  }

  getOutletTotalCount() {
    if (AppData.outletList !== undefined) {
      return AppData.outletList.length;
    }
  }

  getFirstChar(name) {
    return name?.charAt(0);
  }

  // onSubMenuNavigate(index, event,menu?:any) {
  //   event.stopPropagation();
  //   event.preventDefault();
  //   this.router.navigate([menu.subMenu[index].url]);
  // }


  // onMenuItemNavigate(menuObj, index) {
  //    console.log('menuObj',menuObj); 
  //       this.router.navigate([menuObj.url]);
  // }

  changeCollapse(menu, index, isManuallyClicked: boolean) {

    if (isManuallyClicked) {

      menu.collapsed = !menu.collapsed;
      this.sidebarItems.forEach(
        value => {
          if (value != menu) {
            value.collapsed = true;
          }
        }
      )
    } else {
      this.selectedIndex = index;
      menu.collapsed = !menu.collapsed;
      this.sidebarItems.forEach(
        value => {
          if (value != menu) {
            value.collapsed = true;
          }
        }
      )
    }

  }
}
