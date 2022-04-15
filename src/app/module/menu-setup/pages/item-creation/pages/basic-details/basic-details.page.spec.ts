import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { BasicDetailsPage } from './basic-details.page';

describe('BasicDetailsPage', () => {
  let component: BasicDetailsPage;
  let fixture: ComponentFixture<BasicDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicDetailsPage ],
      imports: [IonicModule.forRoot(),
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,]
    }).compileComponents();

    fixture = TestBed.createComponent(BasicDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
