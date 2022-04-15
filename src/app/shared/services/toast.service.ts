import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async presentToast(mge, msgClr) {
    const toast = await this.toastController.create({
      message: mge,
      duration: 2000,
      position: 'top',
      cssClass: `${msgClr}`,
    });
    toast.present();
  }
}
