import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { DeliveryRadiusPage } from './delivery-radius.page';

describe('DeliveryRadiusPage', () => {
  let component: DeliveryRadiusPage;
  let fixture: ComponentFixture<DeliveryRadiusPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryRadiusPage ],
      imports: [IonicModule.forRoot(),
        HttpClientModule,
        RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryRadiusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
