import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';

import { LogoutModalPage } from './logout-modal.page';

describe('LogoutModalPage', () => {
  let component: LogoutModalPage;
  let fixture: ComponentFixture<LogoutModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutModalPage ],
      imports: [IonicModule.forRoot(),
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule],
        providers:[
          FCM
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
