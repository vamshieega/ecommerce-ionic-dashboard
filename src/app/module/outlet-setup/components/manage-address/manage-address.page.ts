import { AgmMap } from '@agm/core';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Subscription } from 'rxjs';
import {
  ADDRESS_BY_CITY,
  AGM_MAP_CUSTOM_STYLES,
  COUNTRY_TYPE,
  ROUTES_STR,
} from 'src/app/core/constants/app-constants';
import { CITY_STATES } from 'src/app/core/constants/cities-states';
import { ProfileService } from 'src/app/module/outlet-setup/services/profile.service';
import { AppData } from 'src/app/shared/services/app-data.service';
import { getNestedGrpFieldValidation } from 'src/app/shared/utils/common-functions';
import { BasicDetails } from '../../model/basic-details.model';
import { OutletDetails } from '../../model/outlet-details.model';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.page.html',
  styleUrls: ['./manage-address.page.scss'],
})
export class ManageAddressPage implements OnInit, OnDestroy {
  @ViewChild('placesRef', { static: false }) placesRef: GooglePlaceDirective;
  @ViewChild(AgmMap, { static: false }) agmMap;

  customStyle: any = AGM_MAP_CUSTOM_STYLES;
  addressOptionsCity: any = ADDRESS_BY_CITY;
  mapZoom = 15;
  basicDetailsModel = new BasicDetails();
  lat: any;
  lng: any;
  basicDetailsForm: FormGroup;
  countryCode: any;
  cityList = [];
  stateList = [];
  formInit = false;
  outletDetailsSubscription = new Subscription();
  outletModel = new OutletDetails();
  oldBasicModel;
  submitted = false;
  routeObj;
  addressLine;

  constructor(
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.routeObj = params;
      if (Object.keys(this.routeObj).length > 0) {
        this.addressLine = this.routeObj['addressLine'];
      }
    });

    AppData.userDataSub$.subscribe((userData) => {
      if (userData) {
        this.countryCode = userData.countryCode;
      }
    });
    this.outletDetailsSubscription = AppData.outletDetailsSub$.subscribe(
      (outletsData) => {
        this.outletModel = Object.assign(this.outletModel, outletsData);

        if (outletsData) {
          this.basicDetailsModel = Object.assign(
            this.basicDetailsModel,
            outletsData['basic']
          );
          this.oldBasicModel = Object.assign({}, this.basicDetailsModel);
          this.setLongLat(); // for set long lat
          if (this.basicDetailsModel['address']['countryCode']) {
            this.stateList = Object.keys(
              CITY_STATES[this.basicDetailsModel['address']['countryCode']]
            );
            this.cityList =
              CITY_STATES[this.basicDetailsModel['address']['countryCode']][
                this.basicDetailsModel['address']['state']
              ];
          } else {
            this.stateList = Object.keys(CITY_STATES['IN']);
            this.cityList =
              CITY_STATES['IN'][this.basicDetailsModel['address']['state']];
            this.basicDetailsModel['countryCode'] = this.countryCode;
          }

          if (!this.basicDetailsModel['countryCode']) {
            this.basicDetailsModel['countryCode'] = this.countryCode;
          }

          this.initForm();
        } else {
          this.setCurrentPosition();
          // this.onSetFormValue();
        }
      }
    );
  }
  ngOnInit() {
    this.profileService.manageAddressFrom.subscribe((data) => {
      if (data) {
        this.oldBasicModel = Object.assign({}, this.basicDetailsModel);
      }
    });
    if (this.addressLine) {
      this.basicDetailsForm
        .get('address')
        .get('addressLine')
        .setValue(this.addressLine);
    }
    this.oldBasicModel = Object.assign({}, this.basicDetailsModel);
    this.initForm();
  }

  initForm() {
    this.basicDetailsForm = this.fb.group({
      countryCode: [
        this.basicDetailsModel['countryCode'],
        [Validators.required],
      ],
      long: [this.basicDetailsModel['long']],
      lat: [this.basicDetailsModel['lat']],
      haveLongLat: [this.basicDetailsModel['haveLongLat']],
      address: this.fb.group({
        locality: [
          this.basicDetailsModel['locality'],
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
            this.noWhitespaceValidator,
          ],
        ],
        addressLine: [
          this.basicDetailsModel['address']['addressLine'],
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(250),
          ],
        ],
        apartmentAddress: [
          this.basicDetailsModel['address']['apartmentAddress'],
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(150),
            this.noWhitespaceValidator,
          ],
        ],
        city: [
          this.basicDetailsModel['address']['city'],
          [Validators.required],
        ],
        state: [
          this.basicDetailsModel['address']['state'],
          [Validators.required],
        ],
        landmark: [
          this.basicDetailsModel['address']['landmark'],
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
            this.noWhitespaceValidator,
          ],
        ],
        countryCode: [
          this.basicDetailsModel['address']['countryCode'],
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(2),
          ],
        ],
        pincode: [
          this.basicDetailsModel['address']['pincode'],
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(6),
            this.noWhitespaceValidator,
          ],
        ],
      }),
    });
    this.basicDetailsForm.get('haveLongLat').valueChanges.subscribe((x) => {});
    this.formInit = true;
    this.onSetFormValue();
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
  onSetFormValue() {
    if (!this.basicDetailsModel['countryCode']) {
      const countryCodeType =
        COUNTRY_TYPE[AppData.restData?.config.currency]?.code;
      this.basicDetailsForm.controls.countryCode.setValue(countryCodeType, {
        emit: false,
      });
    }
  }
  getAddressValid(grpFieldName, fieldName) {
    return getNestedGrpFieldValidation(
      this.basicDetailsForm,
      grpFieldName,
      fieldName,
      this.submitted
    );
  }

  setAddressFieldData(addressList) {
    const stateObj = addressList.find(
      (item) => item.types[0] === 'administrative_area_level_1'
    );
    if (stateObj !== undefined) {
      this.basicDetailsForm['controls']['address']['controls'][
        'state'
      ].setValue(stateObj['long_name']);
    } else {
      this.basicDetailsForm['controls']['address']['controls'][
        'state'
      ].setValue('');
    }

    const postalCodeObj = addressList.find(
      (item) => item.types[0] === 'postal_code'
    );
    if (postalCodeObj !== undefined) {
      this.basicDetailsForm['controls']['address']['controls'][
        'pincode'
      ].setValue(postalCodeObj['long_name']);
    } else {
      this.basicDetailsForm['controls']['address']['controls'][
        'pincode'
      ].setValue('');
    }

    const countryCodeObj = addressList.find(
      (item) => item.types[0] === 'country'
    );
    if (countryCodeObj !== undefined) {
      this.basicDetailsForm['controls']['address']['controls'][
        'countryCode'
      ].setValue(countryCodeObj['short_name']);
    } else {
      this.basicDetailsForm['controls']['address']['controls'][
        'countryCode'
      ].setValue('');
    }

    this.cityList =
      CITY_STATES[countryCodeObj['short_name']][stateObj['long_name']];
    this.stateList = Object.keys(CITY_STATES[countryCodeObj['short_name']]);

    const cityCodeObj = addressList.find(
      (item) => item.types[0] === 'locality'
    );
    if (
      cityCodeObj !== undefined &&
      this.cityList.indexOf(cityCodeObj['short_name']) > 0
    ) {
      this.basicDetailsForm['controls']['address']['controls']['city'].setValue(
        cityCodeObj['short_name']
      );
    } else {
      this.basicDetailsForm['controls']['address']['controls']['city'].setValue(
        ''
      );
    }
  }
  onSaveAddress() {
    console.log(this.basicDetailsForm);
    this.submitted = true;
    if (this.basicDetailsForm.valid) {
      const formData = this.basicDetailsForm.value;
      this.profileService.saveAddressForm(formData);
      this.route.navigate([ROUTES_STR.createOutlet]);
    }
  }

  mapReady(agmMap) {
    console.log('called');
    console.log(agmMap);
    // this.mapEvent = agmMap;

    agmMap.addListener('dragend', () => {
      console.log('map dragged');
      this.updateValues(agmMap);
    });

    agmMap.addListener('zoom_changed', () => {
      console.log('zoom changed');
      this.updateValues(agmMap);
    });
  }

  updateValues(agmMap) {
    const lat = agmMap.getCenter().lat();
    const lng = agmMap.getCenter().lng();
    this.setLatLongIntoForm(lat, lng);
    this.onFetchLocation();
  }

  handleAddressChange(address: Address) {
    const addressCom = address['address_components'];
    console.log(addressCom);
    this.setAddressFieldData(addressCom);
    // const addr = JSON.stringify(address.formatted_address);
    this.basicDetailsForm
      .get('address')
      .get('addressLine')
      .setValue(address.formatted_address);
    const latlngData = JSON.parse(JSON.stringify(address.geometry.location));
    this.setLatLongIntoForm(latlngData.lat, latlngData.lng);
  }

  setLatLongIntoForm(lat, lng) {
    this.lat = lat;
    this.lng = lng;
    console.log(this.lat, this.lng);
    this.basicDetailsForm.controls['long'].setValue(String(this.lng), {
      emit: false,
    });
    this.basicDetailsForm.controls['lat'].setValue(String(this.lat), {
      emit: false,
    });
  }

  async onFetchLocation() {
    this.lat = Number(this.basicDetailsForm.controls['lat'].value);
    this.lng = Number(this.basicDetailsForm.controls['long'].value);
    this.mapZoom = 15;
    await this.profileService
      .getCurrentAddress(this.lat, this.lng)
      .then((res) => {
        console.log(res);
        const responseData = res['body']['results'];
        console.log(responseData);
        this.setAddressFieldData(responseData[0]['address_components']);
        this.basicDetailsForm
          .get('address')
          .get('addressLine')
          .setValue(responseData[0]['formatted_address']);
      }).catch((err) =>{ });
  }

  setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.setLatLongIntoForm(this.lat, this.lng);
        this.onFetchLocation();
      });
    }
  }

  setLongLat() {
    if (this.basicDetailsModel._longLat.length) {
      this.lat = Number(this.basicDetailsModel._longLat[1]);
      this.lng = Number(this.basicDetailsModel._longLat[0]);
      this.basicDetailsModel._setLong(this.basicDetailsModel._longLat[0]);
      this.basicDetailsModel._setLat(this.basicDetailsModel._longLat[1]);
    } else {
      this.setCurrentPosition();
    }
  }

  ngOnDestroy() {
    this.outletDetailsSubscription.unsubscribe();
  }

  onBack() {
    this.route.navigate([ROUTES_STR.createOutlet]);
  }
}
