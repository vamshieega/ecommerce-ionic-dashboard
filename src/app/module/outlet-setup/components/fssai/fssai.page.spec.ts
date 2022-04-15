import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { FssaiPage } from './fssai.page';

describe('FssaiPage', () => {
  let component: FssaiPage;
  let fixture: ComponentFixture<FssaiPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FssaiPage ],
      imports: [IonicModule.forRoot(),
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FssaiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
