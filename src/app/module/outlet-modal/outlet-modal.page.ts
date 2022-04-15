import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AppData } from 'src/app/shared/services/app-data.service';
import { ManageOutletService } from '../manage-outlet/services/manage-outlet.service';

@Component({
  selector: 'app-outlet-modal',
  templateUrl: './outlet-modal.page.html',
  styleUrls: ['./outlet-modal.page.scss'],
})
export class OutletModalPage implements OnInit, OnDestroy, AfterViewInit {
  // selectedOutletName getting value from reports page, on modal create
  @ViewChild(IonContent, { static: true }) content: IonContent;

  selectedOutletName: string;
  outletId: string;
  selectedOutlet: string;
  selectedOutletId: string;
  locality: string;
  outletList = [];
  outletListSubscription = new Subscription();

  constructor(
    private modalctrl: ModalController,
    private manageoutletService: ManageOutletService) {
    this.outletListSubscription = AppData.outletListSub$.subscribe(res => {
      this.outletList = res?.outletList;
    })
  }

  ngOnInit() {

  }

  onSelect() {
    this.manageoutletService.getOutletDetails(this.selectedOutletId).then((res) => {
      const responseData = res['body']['data'];
      AppData.outletDetailsSub$.next(responseData);
    });
    AppData.outletIdSub$.next(this.selectedOutletId);
    AppData.outletNameSub$.next(this.selectedOutletName);
    this.modalctrl.dismiss({ name: this.selectedOutletName, id: this.selectedOutletId, locality: this.locality });
  }

  outletDetails(name, id, locality) {
    this.selectedOutletName = name;
    this.selectedOutletId = id;
    this.locality = locality;
  }

  dismiss() {
    this.modalctrl.dismiss();
  }

  ngOnDestroy() {
    this.outletListSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      let yOffset = document.getElementById(this.selectedOutletId)?.offsetTop;
      this.content.scrollToPoint(100, yOffset, 1500);
    }, 100);
    const myContent = document.querySelector('#my-content');
    this.styleScrollbars(myContent);
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

    const styleElmt = elmt.shadowRoot.querySelector('style');
    if (styleElmt) {
      styleElmt.append(stylesheet);
    } else {
      const barStyle = document.createElement('style');
      barStyle.append(stylesheet);
      elmt.shadowRoot.appendChild(barStyle);
    }
  }
}
