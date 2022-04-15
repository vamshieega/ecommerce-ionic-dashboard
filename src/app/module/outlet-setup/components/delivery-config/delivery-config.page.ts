import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { range, Subscription } from 'rxjs';
import {
  AGM_MAP_CUSTOM_STYLES,
  DAYS_HALF,
  ROUTES_STR,
  SLOT_TIME,
} from 'src/app/core/constants/app-constants';
import { ErrorMessage } from 'src/app/core/constants/validation-msg-constants';
import { DaywiseOphoursPage } from 'src/app/shared/component/daywise-ophours/daywise-ophours.page';
import { AppData } from 'src/app/shared/services/app-data.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import {
  ConfigurationModel,
  DeliveryConfig,
  DeliveryExceptionConfig,
  ShareConfig,
} from '../../model/config.model';
import { OutletDetails } from '../../model/outlet-details.model';
import { ProfileService } from '../../services/profile.service';
import { CustomTimingPage } from '../custom-timing/custom-timing.page';
import { OperationalTimingService } from '../operational-timing/services/operational-timing.service';
import { OutletCloseModalPage } from './outlet-close-modal/outlet-close-modal.page';
import { DeliveryConfigService } from './service/delivery-config.service';

@Component({
  selector: 'app-delivery-config',
  templateUrl: './delivery-config.page.html',
  styleUrls: ['./delivery-config.page.scss'],
})
export class DeliveryConfigPage implements OnInit, OnDestroy {
  @ViewChild(DaywiseOphoursPage, { static: false })
  dayWiseOphoursPage: DaywiseOphoursPage;
  @ViewChild(CustomTimingPage, { static: false })
  customTimingPage: CustomTimingPage;

  days = DAYS_HALF;
  customTiming;
  operatonalFormSubscription = new Subscription();
  deliveryTypeSubscription = new Subscription();
  deliveryRangeSubscription = new Subscription();
  outletDetailsSubscription = new Subscription();
  deliveryRadiusSubscription = new Subscription();
  configurationModel = new ConfigurationModel();
  mySlotsTime = SLOT_TIME;
  scheduleOrdersV = 'dayWise';
  deliveryForm: FormGroup;
  submitted = false;

  myObj = {
    scheduled: {
      val: 'scheduled',
      icon: 'icon-calendar',
      title: 'Scheduled',
      desc: 'Scheduled based delivery',
    },
    onDemand: {
      val: 'onDemand',
      icon: 'icon-timer',
      title: 'On Demand',
      desc: 'Users pick up orders in real time',
    },
    self: {
      val: 'self',
      icon: '',
      title: 'Self-Pickup',
      desc: 'Customers will pick up the orders',
    },
  };
  deliveryCalobj = {
    cartValueLimit: {
      title: 'On Cart Value',
      class: 'icon-timer',
      desc: 'Charges to be calculated based on cart value.',
    },
    byDistance: {
      title: 'Delivery Distance',
      class: 'icon-calendar',
      desc: 'Charges to be calculated based on the delivery distance.',
    },
  };
  deliveryType = Object.assign(this.myObj);
  formInit = false;
  advanceOrdering = false;
  selectedServices = {
    onDemand: this.configurationModel['delivery']['types']['onDemand'],
    scheduled: this.configurationModel['delivery']['types']['scheduled'],
    self: this.configurationModel['delivery']['canSelfPickup']
  };
  servicesCount = 0;
  rangeDetails;
  outletModel = new OutletDetails();
  outletChargeTypeV = '';
  chargeTypeV = 'cartValueLimit';
  existingTime: any;
  existingTimeSlots: any;
  deliveryFormControls;
  range = 5;
  rangeInKM = 5000;
  customStyle: any = AGM_MAP_CUSTOM_STYLES;
  outletlat;
  outletlng;
  radiusMarked = false;
  operationtiming = [];
  opTimingDetails;

  constructor(
    private router: Router,
    private operationalTimingService: OperationalTimingService,
    private deliveryConfigService: DeliveryConfigService,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private toast: ToastService,
    private modalController: ModalController
  ) {

    console.log(this.configurationModel);
    
    this.operatonalFormSubscription =
    this.operationalTimingService.operationalFrom.subscribe((data) => {
        this.customTiming = data;
        console.log(this.customTiming);
        
    });
    
    this.deliveryTypeSubscription =
      this.deliveryConfigService.deliveryServiceSub$.subscribe(
        (data) => {
          console.log(data);
          
          this.selectedServices = Object.assign(this.selectedServices, data);
          this.servicesCount = this.getCount(data);
          const temp = Object.keys(this.selectedServices).find((val) => {
            if(this.selectedServices[val] == true) {
              return val;
            }
          })
          this.deliveryType = Object.assign(this.deliveryType, this.myObj[temp]);
          this.deliveryForm.controls['types']['controls']['onDemand'].setValue(this.selectedServices['onDemand']);
          this.deliveryForm.controls['types']['controls']['scheduled'].setValue(this.selectedServices['scheduled']);
          this.deliveryForm.controls['canSelfPickup'].setValue(this.selectedServices['self']);
          console.log(this.deliveryForm);
          
        }
      );
    this.deliveryRangeSubscription =
      this.deliveryConfigService.deliveryRangesSub$.subscribe((res) => {
        this.deliveryForm.controls['chargeTypeV'].setValue(res['chargeType']);
        this.chargeTypeV = res['chargeType'];
        this.rangeDetails = res['ranges'];
      });

      this.outletDetailsSubscription = AppData.outletDetailsSub$.subscribe(
      (outletData) => {
        console.log(outletData);
        console.log(this.outletModel);
        
        this.outletModel = Object.assign(this.outletModel, outletData);
        console.log(this.outletModel);
        // console.log(outletData);
        
        if(this.outletModel['config']['delivery']) {
          this.customTiming = this.outletModel['config']['delivery']['slots'];
          this.chargeTypeV = this.outletModel['config']['delivery']['chargeTypeV'];
          this.rangeDetails = this.outletModel['config']['delivery']['shareConfig']['ranges'];
        }

        if (
          this.outletModel['config']['delivery'] &&
          this.outletModel['config']['delivery']['slots']?.length > 0
        ) {
          var opHoursGrp = [];

          Object.values(
            this.outletModel['config']['delivery']['slots']
          ).forEach((obj) => {
            const modal = {
              operational: obj['slots'].length > 0 ? true : false,
              slots: [],
            };
            modal.slots = obj['slots'];
            opHoursGrp.push(modal);
          });
          if (outletData['config']['delivery']['scheduleOrders'] === 'custom') {
            this.existingTimeSlots = opHoursGrp;
            this.existingTime = Object.values(this.getAllTimeObj());
          } else {
            this.existingTime = opHoursGrp;
          }
        } else {
          this.existingTime = Object.values(this.getAllTimeObj());
          // this.existingTimeSlots = Object.values(this.getAllTimeObj());
        }

        // if(outletData['config']['delivery'][''])

        if (outletData) {
          this.configurationModel = Object.assign(
            this.configurationModel,
            outletData['config']
          );
          this.configurationModel._delivery = Object.assign(
            new DeliveryConfig(),
            outletData['config']['delivery']
          );
          if (!this.configurationModel._delivery._chargeTypeV) {
            this.configurationModel['delivery']['chargeTypeV'] =
              'cartValueLimit';
            this.chargeTypeV = 'cartValueLimit';
            this.outletChargeTypeV = this.chargeTypeV;
          }
          if (this.configurationModel['deliveryException']) {
            this.range =
              Number(
                this.configurationModel['deliveryException']['exceptionValue']
              ) / 1000;
            this.rangeInKM = Number(
              this.configurationModel['deliveryException']['exceptionValue']
            );
          }
          this.selectedServices.onDemand = this.configurationModel['delivery']['types']['onDemand']
          this.selectedServices.scheduled = this.configurationModel['delivery']['types']['scheduled']
          this.selectedServices.self = this.configurationModel['delivery']['canSelfPickup']
          const temp = Object.keys(this.selectedServices).find((val) => {
            if(this.selectedServices[val] == true) {
              return val;
            }
          })
          this.deliveryType = Object.assign(this.deliveryType, this.myObj[temp]);
          this.servicesCount = this.getCount(this.selectedServices);
          if(this.configurationModel['deliveryException']['exceptionValue']) {
            this.radiusMarked = true;
          }
          
          this.outletlng = this.outletModel['basic']['longLat'][0];
          this.outletlat = this.outletModel['basic']['longLat'][1];
          this.initForm();
          this.deliveryFormControls = this.deliveryForm['controls'];
          if (this.configurationModel['delivery']['scheduleOrders']) {
            this.scheduleOrdersV =
            this.configurationModel['delivery']['scheduleOrders'];
            this.deliveryForm['controls'].scheduleOrdersV.setValue(
              this.scheduleOrdersV
            );
          } else {
            this.scheduleOrdersV = 'dayWise';
            this.deliveryForm['controls'].scheduleOrdersV.setValue(
              this.scheduleOrdersV
            );
          }
        }
      }
    );
    this.deliveryRadiusSubscription =
      deliveryConfigService.deliveryRadiusSub$.subscribe((res) => {
        this.range = res['range'];
        this.rangeInKM = res['rangeInKM'];
      });
      console.log(this.customTiming);
      
  }
  getCount(obj) {
    let count = 0;
    Object.keys(obj).forEach((key) => {
      if (obj[key] === true) {
        count++;
      }
    })
    return count;
  }

  ngOnInit() { }


  checkForinput(event, str) {    
    if(str == "services") {
      if(this.servicesCount == 0) {
        event.preventDefault();
        event.target.checked = false;
      }
    }
    else {
      console.log(this.rangeDetails);
      
      if(this.rangeDetails.length == 0) {
        event.preventDefault();
        event.target.checked = false;
      }
    }
  }

  initForm() {
    this.deliveryForm = this.fb.group({
      exceptionValue: [this.range, [Validators.required]],
      provider: [
        this.configurationModel['delivery']['provider'],
        [Validators.required],
      ],
      canSelfPickup: [
        this.configurationModel['delivery']['canSelfPickup'],
        [Validators.required],
      ],
      chargeTypeV: [
        this.configurationModel['delivery']['chargeTypeV'],
        [Validators.required],
      ],

      // scheduleOrders: [this.configurationModel['delivery']['scheduleOrders'], [Validators.required]],
      scheduleOrdersV: [{ value: this.scheduleOrdersV, disabled: this.scheduleOrdersV === 'dayWise'}, [Validators.required]],
      minCharge: [this.configurationModel['delivery']['minCharge']],
      orderAmountThreshold: [
        this.configurationModel['delivery']['orderAmountThreshold'],
      ],
      minimalCartValue: [
        this.configurationModel['delivery']['minimalCartValue'],
      ],

      selectCurrency: ['INR', [Validators.required]],
      slotConfig: this.fb.group({
        maxOrdersPerSlot: [10, [Validators.required]],
        advanceDays: [
          this.configurationModel['delivery']['slotConfig']['advanceDays'],
        ],
        minDurationHr: [2, [Validators.required]],
      }),
      types: this.fb.group({
        onDemand: [
          this.configurationModel['delivery']['types']['onDemand'],
          [Validators.required],
        ],
        scheduled: [
          this.configurationModel['delivery']['types']['scheduled'],
          [Validators.required],
        ],
      }),
    });
    this.formInit = true;
  }

  getDay(val) {
    return this.days[val];
  }

  async toggleOutlet(event, idx) {
    const checkbox = event.target.checked;
    if (checkbox) {
      this.onEditTiming(idx);
    } else {
      let modal = await this.modalController.create({
        component: OutletCloseModalPage,
        cssClass: 'Confirmationmodal',
        backdropDismiss: false,
      });
      modal.onDidDismiss().then(async (response) => {
        if (response.data.close) {
          this.customTiming[idx].operational = false;
        } else {
          event.target.checked = true;
        }
      });
      return await modal.present();
    }
  }

  getTime(time: string) {
    return this.mySlotsTime.find((val) => val.key === time).value;
  }

  getAllTimeObj() {
    return {
      '0': {
        operational: true,
        slots: [{ startTime: '0600', endTime: '0700' }],
      },
      '1': { operational: true, slots: [{ startTime: '', endTime: '' }] },
      '2': { operational: true, slots: [{ startTime: '', endTime: '' }] },
      '3': { operational: true, slots: [{ startTime: '', endTime: '' }] },
      '4': { operational: true, slots: [{ startTime: '', endTime: '' }] },
      '5': { operational: true, slots: [{ startTime: '', endTime: '' }] },
      '6': { operational: true, slots: [{ startTime: '', endTime: '' }] },
    };
  }

  onEditTiming(idx = 0) {
    this.router.navigate([ROUTES_STR.customTiming], {
      queryParams: { idx: idx },
    });
  }

  onSelectService() {
    this.router.navigate([ROUTES_STR.deliveryService], {
      queryParams: {
        type: this.deliveryForm.controls['provider'].value,
        onDemand: this.selectedServices.onDemand,
        scheduled: this.selectedServices.scheduled,
        self: this.selectedServices.self,
      },
    });
  }

  onSelectCartValue() {
    this.router.navigate([ROUTES_STR.deliveryCalculation]);
  }

  getShareConfig(formData) {
    let shareConfig = new ShareConfig();
    shareConfig._ranges = Object.assign(shareConfig._ranges, this.rangeDetails);
    const key = this.chargeTypeV  
    console.log(this.chargeTypeV);
    
    switch (key) {
      case "cartValueLimit":
        shareConfig._method = 'cartValueLimit';
        shareConfig._unit = 'amount';
        shareConfig._ranges = this.rangeDetails;

        break;

      case 'byDistance':
        shareConfig._method = 'byDistance';
        shareConfig._unit = 'amount';
        shareConfig._ranges = this.rangeDetails;
        break;

      case 'share':
        shareConfig._method = 'share';
        shareConfig._unit = 'percent';
        shareConfig._customer = 50;
        shareConfig._partner = 50;
        break;

      default:
        break;
    }
    return shareConfig;
  }

  back() { }

  onMarkRadius() {
    this.radiusMarked = true;
    this.router.navigate([ROUTES_STR.deliveryRadius]);
  }

  saveAndProceed() {
    this.deliveryForm.controls['exceptionValue'].setValue(this.range);

    if (this.selectedServices) {
      this.deliveryForm.controls['types']['controls']['onDemand'].setValue(
        this.selectedServices['onDemand']
      );
      this.deliveryForm.controls['types']['controls']['scheduled'].setValue(
        this.selectedServices['scheduled']
      );
      this.deliveryForm.controls['canSelfPickup'].setValue(
        this.selectedServices['self']
      );
    }

    console.log(this.deliveryForm);


    const formData = this.deliveryForm.value;
    const shareConfig = this.getShareConfig(formData);
    this.submitted = true;

    // this.childComponent.onOpHoursSubmit();
    

    formData['opTiming'] = this.customTiming;

    if (
      this.deliveryForm.controls.types['controls']['onDemand'].value ===
      false &&
      this.deliveryForm.controls.types['controls']['scheduled'].value ===
      false &&
      this.deliveryForm['controls']['canSelfPickup'].value === false
    ) {
      return;
    }

    if (this.deliveryForm.valid) {
      // console.log(this.childComponent.submitted);
      if (formData.types.scheduled) {
        let data;
        console.log(formData.scheduleOrdersV);
        
        if (formData.scheduleOrdersV === 'dayWise') {
          data = this.dayWiseOphoursPage.generateDayWiseData();
        } else {
          data = this.customTiming;
        }
        this.operationtiming = Object.values(data);
      }

      const reqData = {
        deliveryException: {
          exceptionType: 'distance',
          exceptionValue: this.rangeInKM,
          status: 'active',
        },
        delivery: {
          provider: formData.provider,
          minCharge: formData.minCharge,
          orderAmountThreshold: formData.orderAmountThreshold,
          types: formData.types,
          slots: this.operationtiming,
          slotConfig: formData.slotConfig,
          canSelfPickup: formData.canSelfPickup,
          shareConfig: shareConfig,
          chargeTypeV: formData.chargeTypeV,
          deliveryMerchantId:
            this.configurationModel._delivery._deliveryMerchantId,
          scheduleOrders: this.deliveryForm['controls'].scheduleOrdersV.value,
        },
      };
      reqData['step'] = 'config';
      reqData['outletId'] = AppData.outletId;
      console.log(reqData);
      
      if (reqData['deliveryException']['exceptionValue'] > 0) {
        this.deliveryConfigService
          .saveSetupDetails(reqData)
          .then(async (res) => {
            this.outletModel._config['delivery'] = Object.assign(
              new DeliveryConfig(),
              reqData.delivery
            );
            console.log(this.outletModel._config['delivery']);
            
            this.outletModel._config['deliveryException'] = Object.assign(
              new DeliveryExceptionConfig(),
              reqData.deliveryException
            );
            console.log(this.outletModel);
            
            AppData.outletDetailsSub$.next(this.outletModel);
            this.submitted = false;
            setTimeout(() => {
              this.profileService.navigation(6);
            }, 1000);
          });
      } else {
        this.toast.presentToast(ErrorMessage.Delivery_RADIUS_MSG, 'error');
      }
    }
    console.log(this.outletModel);
  }

  ngOnDestroy() {
    this.operatonalFormSubscription.unsubscribe();
    this.deliveryTypeSubscription.unsubscribe();
    this.deliveryRangeSubscription.unsubscribe();
    this.outletDetailsSubscription.unsubscribe();
    this.deliveryRadiusSubscription.unsubscribe();
  }
}
