import { Component, OnInit, ViewChild } from '@angular/core';
import { AppData } from './shared/services/app-data.service';
import { AuthService } from './shared/services/auth.service';
import { Platform, NavController, AlertController } from '@ionic/angular';
import { FcmMessagingService } from './shared/services/fcm-messaging.service';
import { ApiRequestService } from './shared/services/api-request.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { EXIT_MSG, PLAYSTORE_URL, ROUTES_STR } from './core/constants/app-constants';
import { Network } from '@ionic-native/network/ngx';
import { NetworkService } from './shared/services/network.service';
import { HttpResponse } from '@angular/common/http';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  backCount = 1;
  forceUpdate: boolean;
  versionModal = 1;
  loggedDay = 1;

  constructor(
    private appData: AppData,
    private authService: AuthService,
    private platform: Platform,
    private navController: NavController,
    private alertController: AlertController,
    private fcmMessagingService: FcmMessagingService,
    private appVersion: AppVersion,
    private apiRequest: ApiRequestService,
    public network: Network,
    private networkService: NetworkService,
    private router: Router,
    private splashScreen: SplashScreen

  ) {

    this.initializeApp();

    this.platform.resume.subscribe(() => {
      window['paused'] = 0;
      this.versionAPI();
    });
  }

  ngOnInit(): void {

  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.splashScreen.hide();
      this.versionAPI();
      this.fcmMessagingService.tokenSubscribe();
      this.fcmMessagingService.onNotifiction();
      this.networkService.networkConnection();
    });

    this.platform.backButton.subscribeWithPriority(10, () => {
      const currentUrl = window.location.pathname;
      console.log('current pathname ', currentUrl);
      if (currentUrl === ROUTES_STR.login) {
        navigator['app'].exitApp();
      }
      else if (currentUrl === ROUTES_STR.dashboard && AppData.isAuthenticated) {
        if (this.backCount === 1) {
          this.onExit();
        }
        this.backCount++;
      }
      else if (currentUrl === ROUTES_STR.orderDetail) {
        this.router.navigate([ROUTES_STR.orders]);
      }
      else if (currentUrl === ROUTES_STR.newItem) {
        this.router.navigate([ROUTES_STR.allItems]);
      }
      else if (currentUrl === ROUTES_STR.addAddon) {
        AppData.navigationSub$.next('addAddon');
      }
      else if (currentUrl === ROUTES_STR.addVariant) {
        AppData.navigationSub$.next('addVariant');
      }
      else if (AppData.isAuthenticated && currentUrl !== ROUTES_STR.orderDetail) {
        this.router.navigate([ROUTES_STR.dashboard]);
      }
      else {
        this.router.navigate([ROUTES_STR.login]);
      }
    });
  }

  async onExit() {
    const alert = await this.alertController.create({
      message: EXIT_MSG,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.backCount = 1;
          }
        }, {
          text: 'Yes',
          handler: () => {
            navigator['app'].exitApp();
          }
        }]
    });
    await alert.present();
  }

  async versionAPI() {
    // 0.2.3 : Current  : forceupdate false
    // 0.1.0 : dep : forceupdate true
    // 1.0.0 : latest : no options 
    console.log('version number');
    this.appVersion.getVersionNumber().then((version) => {
      console.log('version number', version);
      AppData.versionSub$.next(version);
      this.apiRequest.get('updateApk', `?id=${version}`).then((res: HttpResponse<any>) => {
        if (this.versionModal === 1) {
          this.forceUpdate = res.body.data.forceUpdate;
          this.versionAlert(res.body.data);
        }
        this.versionModal++;
      });
    });
  }

  async versionAlert(versionObj) {
    if (AppData.userLoginDay === '' || this.forceUpdate === true) {
      AppData.userLoginDaySub$.next('currentTime');
      if (versionObj.showModal) {
        const buttonsAct = [];
        versionObj.buttons.forEach((button) => {
          if (button.action === 'cancel') {
            buttonsAct.push({
              text: button.text,
              cssClass: button.color,
            });
          } else {
            buttonsAct.push({
              text: button.text,
              cssClass: button.color,
              handler: () => {
                this.versionModal = 1;
                if (button.action === 'playstore') {
                  window.open(PLAYSTORE_URL, '_system');
                }
                else {
                  // Itunes URL
                }
              }
            });
          }
        });
        const alert = await this.alertController.create({
          backdropDismiss: false,
          header: versionObj.title,
          message: versionObj.description,
          buttons: buttonsAct,
        });
        await alert.present();
      }
    }
  }

  getDate(datetime) {
    datetime = new Date(datetime).getTime();
    let now = new Date().getTime();
    if (isNaN(datetime)) {
      return "";
    }
    if (datetime < now) {
      var milisec_diff = now - datetime;
    } else {
      var milisec_diff = datetime - now;
    }
    let days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
    //let  date_diff = new Date( milisec_diff );
    //console.log('check data val-->',days + " Days "+ (date_diff.getHours()) + " Hours " + (date_diff.getMinutes()) + " Minutes " + date_diff.getSeconds() + " Seconds");
    if (this.loggedDay <= days) {
      AppData.userLoginDaySub$.next('');
      this.versionAPI();
    }
  }
}
