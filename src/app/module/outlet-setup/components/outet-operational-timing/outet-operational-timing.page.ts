import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorMessage } from 'src/app/core/constants/validation-msg-constants';
import { DaywiseOphoursPage } from 'src/app/shared/component/daywise-ophours/daywise-ophours.page';
import { AppData } from 'src/app/shared/services/app-data.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { OutletDetails } from '../../model/outlet-details.model';
import { ProfileService } from '../../services/profile.service';
import { OperationalTimingPage } from '../operational-timing/operational-timing.page';
import { OperationalTimingService } from '../operational-timing/services/operational-timing.service';

@Component({
  selector: 'app-outet-operational-timing',
  templateUrl: './outet-operational-timing.page.html',
  styleUrls: ['./outet-operational-timing.page.scss'],
})
export class OutetOperationalTimingPage implements OnInit, OnDestroy {
  @ViewChild(OperationalTimingPage, { static: false })
  opTimePage: OperationalTimingPage;
  @ViewChild(DaywiseOphoursPage, { static: false })
  dayWiseOphoursPage: DaywiseOphoursPage;
  setTimeFor='outlet';
  opTimeForm: FormGroup;
  opSettingType = 'dayWise';
  outletDetailsSubscription: Subscription;
  outletModel = new OutletDetails();
  existingTime = [];
  defaultTime = [{ startTime: '0700', endTime: '2300' }];

  constructor(
    public fb: FormBuilder,
    private toast: ToastService,
    private operationalService: OperationalTimingService,
    private location: Location,
    private profileService: ProfileService
  ) {
    this.outletDetailsSubscription = AppData.outletDetailsSub$.subscribe(
      (outletsData) => {
        if (outletsData) {
          this.outletModel = Object.assign(this.outletModel, outletsData);
          this.existingTime = this.outletModel._opHours;
          this.opSettingType = outletsData.opSettingType
            ? outletsData.opSettingType
            : 'dayWise';
        }
      }
    );
  }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.opTimeForm = this.fb.group({
      opSettingType: [this.opSettingType, [Validators.required]],
    });
  }
  slotsGroup(slot?): FormGroup {
    if (slot && slot.startTime === '0000') {
      return this.fb.group({
        startTime: ['24Hours', [Validators.required]],
        endTime: [''],
      });
    } else {
      return this.fb.group({
        startTime: [slot.startTime || '', [Validators.required]],
        endTime: [slot.endTime || '', [Validators.required]],
      });
    }
  }
  createObjForOpTiming() {
    const formData = this.opTimeForm.value;
    const body = {
      outletId: AppData.outletId,
      step: 'opHours',
      opSettingType: formData.opSettingType,
      data: {},
    };
    return body;
  }
  async onOpTimingSave() {
    const reqBody = await this.createObjForOpTiming();
    switch (reqBody['opSettingType']) {
      case 'allday':
        reqBody['data'] = this.getAllTimeObj();
        this.createOpHoursTime(reqBody);
        break;
      case 'dayWise':
        const dayWiseValue = this.dayWiseOphoursPage.generateDayWiseData();
        reqBody['data'] = dayWiseValue;
        if (
          !Object.values(dayWiseValue).every((itm) => itm.operational === false)
        ) {
          if (Object.values(dayWiseValue).some((itm) => itm.slots.length > 0)) {
            this.createOpHoursTime(reqBody);
          } else {
            this.toast.presentToast(
              ErrorMessage.OPERATION_TIME_SELECT_MSG,
              'error'
            );
          }
        } else {
          this.toast.presentToast(
            ErrorMessage.OPERATION_DAYS_SELECT_MSG,
            'error'
          );
        }
        break;

      default:
        const value = this.opTimePage.onOpHoursSubmit();
        reqBody['data'] = value;
        if (
          reqBody['data'] &&
          !Object.values(reqBody['data']).every(
            (itm) => itm['operational'] === false
          )
        ) {
          this.createOpHoursTime(reqBody);
        } else {
          this.toast.presentToast(
            ErrorMessage.OPERATION_DAY_TIME_SELECT_MSG,
            'error'
          );
        }
        break;
    }
  }
  createOpHoursTime(reqBody) {
    this.operationalService.opHoursSubmit(reqBody).then((response) => {
      this.outletModel._opHours = Object.values(reqBody.data);
      this.outletModel._opSettingType = reqBody['opSettingType'];
      AppData.outletDetailsSub$.next(this.outletModel);
      setTimeout(() => {
        this.profileService.navigation(2);
      }, 300);
      // setTimeout(() => { this.profileService.navigation(2); }, 500);
    });
  }
  getAllTimeObj() {
    return {
      '0': { operational: true, slots: this.defaultTime },
      '1': { operational: true, slots: this.defaultTime },
      '2': { operational: true, slots: this.defaultTime },
      '3': { operational: true, slots: this.defaultTime },
      '4': { operational: true, slots: this.defaultTime },
      '5': { operational: true, slots: this.defaultTime },
      '6': { operational: true, slots: this.defaultTime },
    };
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.outletDetailsSubscription)
      this.outletDetailsSubscription.unsubscribe();
  }

  back() {
    this.location.back();
  }
}
