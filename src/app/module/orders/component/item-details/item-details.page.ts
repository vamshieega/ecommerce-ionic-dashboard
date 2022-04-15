import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { IonContent } from '@ionic/angular';
import { getVegNonVegItemImg } from 'src/app/shared/utils/menu-cart-item-functions';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {

  @ViewChild(IonContent, { static: true }) content: IonContent;
  @Input() orderObj;
  orderModelKey: any;
  Items = false;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.orderStatusListModelKeySubject$.subscribe(modelKey => {
      this.orderModelKey = modelKey;
    });
    this.listLength();
  }

  getVegNonVegItem(isVeg, containsEgg) {
    return  getVegNonVegItemImg(isVeg, containsEgg);
  }

  listLength() {
    if (this.orderObj?.items.length > 8) {
      this.Items = true;
    }
  }

  scrollDown() {
    this.content.scrollToBottom(1500);
  }
}
