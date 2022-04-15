import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AppData } from 'src/app/shared/services/app-data.service';

@Component({
  selector: 'app-categories-modal',
  templateUrl: './categories-modal.page.html',
  styleUrls: ['./categories-modal.page.scss'],
})
export class CategoriesModalPage implements OnInit, AfterViewInit {

  selectedCategoryName: string;
  menuList = [];
  selectedOutlet: string;
  selectedOutletId: string;
  outletList = [];
  outletListSubscription = new Subscription();

  constructor(private modalctrl: ModalController) {
    this.outletListSubscription = AppData.outletListSub$.subscribe(res => {
      console.log(res);
      this.outletList = res?.outletList;
    })
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const myContent = document?.querySelector('#my-content');
    this.styleScrollbars(myContent);
  }

  onSelect() {
    this.modalctrl.dismiss({ name: this.selectedOutlet, id: this.selectedOutletId });
  }

  onChange(outletName, ID) {
    this.selectedOutlet = outletName;
    this.selectedOutletId = ID;
  }

  selectedCategory(name, id) {
    console.log('name', name, id);
    this.modalctrl.dismiss({ categoryName: name, cat_id: id });
  }

  dismiss() {
    this.modalctrl.dismiss();
  }

  styleScrollbars(elmt: any) {
    const stylesheet = `
      ::-webkit-scrollbar {
        width: 5px;
      }
       
      ::-webkit-scrollbar-track { 
        margin-top: 40px;
        margin-bottom: 40px;
        background: #DDDDDE;
        border-radius: 10px;
      }
       
       ::-webkit-scrollbar-thumb {
        background: #BDBBC1; 
        border-radius: 10px;
      }
    `;
    const styleElmt = elmt.shadowRoot?.querySelector('style');
    if (styleElmt) {
      styleElmt.append(stylesheet);
    } else {
      const barStyle = document.createElement('style');
      barStyle.append(stylesheet);
      elmt.shadowRoot.appendChild(barStyle);
    }
  }

  ngOnDestroy() {
    this.outletListSubscription.unsubscribe();
  }
}
