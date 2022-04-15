import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { OrderRejectModalComponent } from './order-reject-modal.component';

describe('OrderRejectModalComponent', () => {
  let component: OrderRejectModalComponent;
  let fixture: ComponentFixture<OrderRejectModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderRejectModalComponent ],
      imports: [IonicModule.forRoot(),
      ReactiveFormsModule,
      HttpClientModule,
      RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderRejectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
