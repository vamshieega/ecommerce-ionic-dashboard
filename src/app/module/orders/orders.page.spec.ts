import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { OrdersPage } from './orders.page';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

describe('OrdersPage', () => {
  let component: OrdersPage;
  let fixture: ComponentFixture<OrdersPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersPage ],
      imports: [IonicModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RouterTestingModule],
        providers:[
          FCM,
          LocalNotifications
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
