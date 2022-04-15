import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppData } from 'src/app/shared/services/app-data.service';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.page.html',
  styleUrls: ['./merchant.page.scss'],
})
export class MerchantPage implements OnInit {

  userForm: FormGroup;
  userInfo: any;

  constructor(private fb: FormBuilder) {
    AppData.userDataSub$.subscribe((userData) => {
      this.userInfo = userData;
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      userName: [this.userInfo?.userName],
      mobile: [this.userInfo?.mobile],
      email: [this.userInfo?.email],
      numberOfOutlets: [AppData.outletList?.length],
    });
  }
}
