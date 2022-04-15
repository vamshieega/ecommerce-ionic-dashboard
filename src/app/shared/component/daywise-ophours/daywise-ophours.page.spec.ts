import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { DaywiseOphoursPage } from './daywise-ophours.page';

describe('DaywiseOphoursComponent', () => {
  let component: DaywiseOphoursPage;
  let fixture: ComponentFixture<DaywiseOphoursPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DaywiseOphoursPage],
      imports: [IonicModule.forRoot(),
        ReactiveFormsModule,
        RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DaywiseOphoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
