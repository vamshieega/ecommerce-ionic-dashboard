import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemSearchModalPage } from './item-search-modal.page';

describe('ItemSearchModalPage', () => {
  let component: ItemSearchModalPage;
  let fixture: ComponentFixture<ItemSearchModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSearchModalPage ],
      imports: [IonicModule.forRoot(),
      HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemSearchModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
