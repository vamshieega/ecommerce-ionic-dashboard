import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { DeliveryPriceRangePage } from './delivery-price-range.page';

describe('DeliveryPriceRangePage', () => {
  let component: DeliveryPriceRangePage;
  let fixture: ComponentFixture<DeliveryPriceRangePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPriceRangePage ],
      imports: [IonicModule.forRoot(),
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryPriceRangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
