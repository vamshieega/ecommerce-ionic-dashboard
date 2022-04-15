import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-outlet-close-modal',
  templateUrl: './outlet-close-modal.page.html',
  styleUrls: ['./outlet-close-modal.page.scss'],
})
export class OutletCloseModalPage implements OnInit {

  constructor(private modalctrl: ModalController) {}

  ngOnInit() {
  }

  onCloseOutlet() {
    this.modalctrl.dismiss({close: true});
  }

  dismiss() {
    this.modalctrl.dismiss({close: false});
  }

}
