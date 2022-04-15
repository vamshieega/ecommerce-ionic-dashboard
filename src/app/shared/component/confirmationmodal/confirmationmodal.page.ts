import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-confirmationmodal',
  templateUrl: './confirmationmodal.page.html',
  styleUrls: ['./confirmationmodal.page.scss'],
})
export class ConfirmationmodalPage implements OnInit {

  icon: string;
  title: string;
  status: any;
  endMsg:any;
  
  constructor(private router: Router, private modalctrl: ModalController) { }

  ngOnInit() { }

  cancel() {
    this.modalctrl.dismiss();
  }

  confirm() {
    this.status = 'confirm';
    this.modalctrl.dismiss({ status: this.status });
  }
}
