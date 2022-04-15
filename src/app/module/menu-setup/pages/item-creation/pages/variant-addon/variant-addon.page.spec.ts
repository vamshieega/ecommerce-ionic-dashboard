import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { VariantAddonPage } from './variant-addon.page';

describe('VariantAddonPage', () => {
  let component: VariantAddonPage;
  let fixture: ComponentFixture<VariantAddonPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VariantAddonPage ],
      imports: [IonicModule.forRoot(),
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VariantAddonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
