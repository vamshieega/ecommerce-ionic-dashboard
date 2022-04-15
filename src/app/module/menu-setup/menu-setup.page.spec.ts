import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { MenuSetupPage } from './menu-setup.page';

describe('MenuSetupPage', () => {
  let component: MenuSetupPage;
  let fixture: ComponentFixture<MenuSetupPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSetupPage ],
      imports: [IonicModule.forRoot(),
        ReactiveFormsModule,
        RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuSetupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
