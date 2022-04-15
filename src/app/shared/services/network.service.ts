import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AppData } from './app-data.service';
import { ToastService } from './toast.service';
import { ROUTES_STR } from 'src/app/core/constants/app-constants';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private route: ActivatedRouteSnapshot;
  constructor(private network: Network,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: ToastService
  ) {
    this.networkConnection();
  }

  async networkConnection() {

    this.network.onConnect().subscribe(() => {
      if (AppData.isAuthenticated) {
        this.router.navigate([ROUTES_STR.orders]);
      } else {
        this.router.navigate([ROUTES_STR.login]);
      }
    });

    this.network.onDisconnect().subscribe(() => {
      this.router.navigate([ROUTES_STR.offline]);
      this.toast.presentToast('Network Disconnected', 'toast-error');
    });
  }

}
