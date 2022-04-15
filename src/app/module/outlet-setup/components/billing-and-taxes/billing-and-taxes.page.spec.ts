import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { BillingAndTaxesPage } from './billing-and-taxes.page';

describe('BillingAndTaxesPage', () => {
  let component: BillingAndTaxesPage;
  let fixture: ComponentFixture<BillingAndTaxesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingAndTaxesPage ],
      imports: [IonicModule.forRoot(),
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule
  ]
    }).compileComponents();

    fixture = TestBed.createComponent(BillingAndTaxesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
