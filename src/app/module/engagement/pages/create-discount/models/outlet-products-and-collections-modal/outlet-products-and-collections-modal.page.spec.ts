import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OutletProductsAndCollectionsModalPage } from './outlet-products-and-collections-modal.page';

describe('OutletProductsAndCollectionsModalPage', () => {
  let component: OutletProductsAndCollectionsModalPage;
  let fixture: ComponentFixture<OutletProductsAndCollectionsModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OutletProductsAndCollectionsModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OutletProductsAndCollectionsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
