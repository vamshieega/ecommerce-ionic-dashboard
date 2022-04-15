import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule} from '@angular/common/http/testing';


import { OtpPage } from './otp.page';

describe('OtpPage', () => {
  let component: OtpPage;
  let fixture: ComponentFixture<OtpPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpPage ],
      imports: [IonicModule.forRoot(),ReactiveFormsModule,RouterTestingModule,HttpClientTestingModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(OtpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
