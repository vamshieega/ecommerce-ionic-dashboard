import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { OutletSetupPage } from './outlet-setup.page';

describe('OutletSetupComponent', () => {
  let component: OutletSetupPage;
  let fixture: ComponentFixture<OutletSetupPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OutletSetupPage ],
      imports: [IonicModule.forRoot(),
        HttpClientModule,
        RouterTestingModule  
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OutletSetupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
