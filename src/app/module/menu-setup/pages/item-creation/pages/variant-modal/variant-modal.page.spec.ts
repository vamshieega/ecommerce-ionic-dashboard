import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { VariantModalPage } from './variant-modal.page';

describe('VariantModalPage', () => {
  let component: VariantModalPage;
  let fixture: ComponentFixture<VariantModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VariantModalPage ],
      imports: [IonicModule.forRoot(),
      ReactiveFormsModule,
      RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VariantModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
