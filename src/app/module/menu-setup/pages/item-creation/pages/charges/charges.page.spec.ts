import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { ChargesPage } from './charges.page';

describe('ChargesPage', () => {
  let component: ChargesPage;
  let fixture: ComponentFixture<ChargesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargesPage ],
      imports: [IonicModule.forRoot(),
      ReactiveFormsModule,
    RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ChargesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
