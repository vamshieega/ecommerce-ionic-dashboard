import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { ItemViewModalPage } from './item-view-modal.page';

describe('ItemViewModalPage', () => {
  let component: ItemViewModalPage;
  let fixture: ComponentFixture<ItemViewModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemViewModalPage ],
      imports: [IonicModule.forRoot(),ReactiveFormsModule,RouterTestingModule,HttpClientTestingModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemViewModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
