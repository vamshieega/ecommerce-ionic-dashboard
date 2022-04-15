import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

import { ManageAddressPage } from './manage-address.page';

describe('ManageAddressComponent', () => {
  let component: ManageAddressPage;
  let fixture: ComponentFixture<ManageAddressPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAddressPage ],
      imports: [IonicModule.forRoot(),
        ReactiveFormsModule,
        HttpClientModule,
        GooglePlaceModule,
        RouterTestingModule],
        providers:[
          GooglePlaceModule,
          Address
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
