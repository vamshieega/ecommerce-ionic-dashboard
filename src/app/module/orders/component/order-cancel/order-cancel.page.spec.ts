import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { OrderCancelPage } from './order-cancel.page';

describe('OrderCancelPage', () => {
  let component: OrderCancelPage;
  let fixture: ComponentFixture<OrderCancelPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCancelPage ],
      imports: [IonicModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderCancelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
