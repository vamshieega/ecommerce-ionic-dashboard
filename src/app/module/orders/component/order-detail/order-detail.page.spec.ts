import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { OrderDetailPage } from './order-detail.page';

describe('OrderDetailPage', () => {
  let component: OrderDetailPage;
  let fixture: ComponentFixture<OrderDetailPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailPage ],
      imports: [IonicModule.forRoot(),
        HttpClientModule,
        RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
