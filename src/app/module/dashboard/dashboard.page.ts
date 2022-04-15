import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  DashboardStepStatus,
  GETTING_STARTED_STEPS,
  PAGE_TITLE,
  ROUTES_STR,
  TUTORIAL_URL,
} from 'src/app/core/constants/app-constants';
import { AppData } from 'src/app/shared/services/app-data.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ErrorMessage } from 'src/app/core/constants/validation-msg-constants';
import { DashboardStep } from './getting-start.model';
import { Router } from '@angular/router';
import { MerchantService } from '../merchant/services/merchant.service';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';

  dashboardStepsList = GETTING_STARTED_STEPS;
  restData;

  restDataSubscption: Subscription;

 // stepDetails: any;
  todoStep: any;
  selectedIndex = 0;

  constructor(
    private toast: ToastService,
    private route: Router,
    private merchantService: MerchantService,
    private youtube: YoutubeVideoPlayer
  ) {}

  ngOnInit() {
    this.initData();
  }
  initData() {
    AppData.pageTitleSub$.next(PAGE_TITLE.dashboard);
    this.merchantService.getRestData().then((data) => {
      console.log(data);
      this.restData = data;
      this.initDashboardStep();
      this.dashboardStepsList.some((step, index) => {
        if (step.status == 'incomplete') {
          this.selectedIndex = index;
          this.todoStep = index;
          return true;
        }
      });
  //    this.stepDetails = this.dashboardStepsList[this.selectedIndex];
    });
  }

  onClickButton(step) {
    console.log(step);

    if (!this.isAllPreviousStepsAreCompleted(step)) {
      this.toast.presentToast(
        ErrorMessage.COMPLETE_PREVOUS_OUTLET,
        'toast-error'
      );
    } else {
      if (step.key === 'outletCreation' && step.status === 'incomplete') {
        this.route.navigate([ROUTES_STR.createOutlet]);
      } else if (step.key === 'deploy') {
        this.route.navigate([step.path]);
        //     // this.route.navigate([ROUTES_STR.settings]);
        //     // const modalref = this.modalService.open(DashboardStepModalComponent, getConfig('COMMON_CSS_STATIC_MODAL_CONFIG'))
        //     // modalref.result.then((res) => {
        //     //   if (res) {
        //     //     this.initData();  // refreshing rest data
        //     //   }
        //     //   console.log(res)
        //     // });
        // this.route.navigate([ROUTES_STR.settings]);
        //     // this.accountConfigService.domainSave.subscribe(
        //     //   (domainResponseData: any) =>{
        //     //     if( domainResponseData){
        //           // this.initData();  // refreshing rest data
        //     //     }
        //     //   }
      } else if (step.key === 'categoryCreation') {
        // this.route.navigate([ROUTES_STR.categories]);
      } else if (step.key === 'menuCreation') {
        // this.route.navigate([ROUTES_STR.allItem]);
      }
    }
  }

  isAllPreviousStepsAreCompleted(step: DashboardStep) {
    let completed = true;
    let index = this.dashboardStepsList.findIndex(
      (element) => element.key == step.key
    );
    if (index > 0) {
      let item = this.dashboardStepsList.slice(0, index);
      completed = item.every((p) => p.status == DashboardStepStatus.complete);
    }
    return completed;
  }

  openVideoPlayer(url = TUTORIAL_URL) {
    console.log(url);
    this.youtube.openVideo(url);
    // this.videoPlayer
    //   .play(url)
    //   .then(() => {})
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  // creating dynamic multiple steps and pushing into variables
  initDashboardStep() {
    this.dashboardStepsList = GETTING_STARTED_STEPS;
    if (this.restData && this.restData.firstOutlet) {
      this.restData.firstOutlet.forEach((value) => {
        this.dashboardStepsList.forEach((step, i) => {
          if (step.key === value.step) {
            this.dashboardStepsList[i].status = value.status;
            // console.log(this.dashboardStepsList[i])
          }
        });
      });
    }
  }

  openFileUpload() {
    // this.modalService.open(FileUploadComponent, getConfig('FILE_UPLOAD_MODAL'))
  }

  // unsubscribing subscribed function
  ngOnDestroy(): void {
    if (this.restDataSubscption) {
      this.restDataSubscption.unsubscribe();
    }
  }
}
