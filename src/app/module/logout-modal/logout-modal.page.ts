import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiRequestService } from 'src/app/shared/services/api-request.service';
import { AppData } from 'src/app/shared/services/app-data.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.page.html',
  styleUrls: ['./logout-modal.page.scss'],
})
export class LogoutModalPage implements OnInit {
  outletIds = [];
  constructor(
    private authService: AuthService,
    private modalctrl: ModalController,
    private apiService: ApiRequestService
  ) { }

  ngOnInit() { }

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

  dismiss() {
    this.modalctrl.dismiss();
  }
}
