import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { AddVariantPage } from './add-variant.page';

describe('AddVariantPage', () => {
  let component: AddVariantPage;
  let fixture: ComponentFixture<AddVariantPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVariantPage ],
      imports: [IonicModule.forRoot(),
      ReactiveFormsModule,
      RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AddVariantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
