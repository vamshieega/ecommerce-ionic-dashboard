import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { OrderViewAndBillingPage } from './order-view-and-billing.page';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';

describe('OrderViewAndBillingPage', () => {
  let component: OrderViewAndBillingPage;
  let fixture: ComponentFixture<OrderViewAndBillingPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderViewAndBillingPage ],
      imports: [IonicModule.forRoot(),
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule],
        providers:[
          CallNumber,
          OpenNativeSettings
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderViewAndBillingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
