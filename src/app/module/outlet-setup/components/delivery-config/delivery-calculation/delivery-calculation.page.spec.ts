import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { DeliveryCalculationPage } from './delivery-calculation.page';

describe('DeliveryCalculationPage', () => { 
  let component: DeliveryCalculationPage;
  let fixture: ComponentFixture<DeliveryCalculationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryCalculationPage ],
      imports: [IonicModule.forRoot(),ReactiveFormsModule,RouterTestingModule,HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryCalculationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
