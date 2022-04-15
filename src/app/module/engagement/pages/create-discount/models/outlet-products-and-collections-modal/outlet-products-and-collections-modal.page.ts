import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { debounceTime } from 'rxjs/operators';
import { AppData } from 'src/app/shared/services/app-data.service';
import { ProductCollectionService } from '../../../discount/service/product-collection.service';
import { Discount } from '../discount';

@Component({
  selector: 'app-outlet-products-and-collections-modal',
  templateUrl: './outlet-products-and-collections-modal.page.html',
  styleUrls: ['./outlet-products-and-collections-modal.page.scss'],
})
export class OutletProductsAndCollectionsModalPage implements OnInit {

  // below two variables are modal component props
  outletIds = [];
  requiredFor: string;
  selectedItems = [];

  isSearching: boolean = false;
  outletSearch: FormControl = new FormControl();
  discountModel = new Discount();

  // outlet variables
  activeOutletList: any;
  outletListCopy = [];
  outletList = [];

  // product variables
  productList = [];
  resproductList = [];
  productListCopy = [];

  // collections variables
  collectionList = [];
  rescollectionList = [];
  collectionListCopy = [];

  // selectedItems = [
  //   { itemId: "5009ff40-e557-11eb-a0e6-9bb094a7ce5b", name: "Tandoori Broccoli" }
  // ]

  constructor(private modalController: ModalController, private pcService: ProductCollectionService) {

  }

  ngOnInit() {
    console.log(this.outletIds);
    console.log(this.requiredFor);
    if (this.requiredFor === 'items' && this.outletIds.length === 1) {
      this.pcService.getProductsList(this.outletIds).then((res) => {
        const response = res['body']['data'];
        this.resproductList = response
        console.log('responseData', this.resproductList);
        this.productListFn();
      })
        .catch((err) => {
          console.log(err);
        });
    }
    else if (this.requiredFor === 'outlets') {
      this.outletListFn();
    }

    else if (this.requiredFor === 'collection') {
      this.pcService.getCollections(this.outletIds).then((res) => {
        const response = res['body']['data'];
        this.rescollectionList = response['categories']
        console.log('responseData', this.rescollectionList);
        this.collectionListFn()
      })
        .catch((err) => {
          console.log(err);
        });
    }

    this.searchOrdername();
  }


  outletListFn() {
    if (this.outletIds.length === 0) {
      this.outletIds = AppData.outletList.filter(
        (itm) => itm.status == 'active'
      );
    }
    this.activeOutletList = AppData.outletList.filter(
      (itm) => itm.status == 'active'
    );
    this.activeOutletList.filter((item) => {
      for (let i = 0; i < this.outletIds.length; i++) {
        if (this.outletIds[i] === item['outletId']) {
          let obj = {
            outletId: item['outletId'],
            outletName: item['outletName'],
            isChecked: true,
          };
          this.outletList.push(obj);
          break;
        } else if (this.outletIds.length === i + 1) {
          let obj = {
            outletId: item['outletId'],
            outletName: item['outletName'],
            isChecked: false,
          };
          this.outletList.push(obj);
        }
      }
    });
    this.outletListCopy = this.outletList;
  }

  productListFn() {
    console.log('selectedItems 2', this.selectedItems);
    this.resproductList.filter((item) => {
      if (this.selectedItems.length === 0) {
        let obj = {
          itemId: item['itemId'],
          name: item['name'],
          outletId: item['outletId'],
          isChecked: false
        };
        this.productList.push(obj);
      }
      else {
        for (let i = 0; i < this.selectedItems.length; i++) {
          if (this.selectedItems[i]['itemId'] === item['itemId']) {
            let obj = {
              itemId: item['itemId'],
              name: item['name'],
              outletId: item['outletId'],
              isChecked: true
            };
            this.productList.push(obj);
            break;
          } else if (this.selectedItems.length === i + 1) {
            let obj = {
              itemId: item['itemId'],
              name: item['name'],
              outletId: item['outletId'],
              isChecked: false
            };
            this.productList.push(obj);
          }
        }
      }
    });

    console.log('selectedItems', this.productList);
    this.productListCopy = this.productList;
  }


  collectionListFn() {
    console.log(this.selectedItems);
    this.rescollectionList.filter((item) => {
      if (this.selectedItems.length === 0) {
        let obj = {
          catId: item['catId'],
          name: item['name'],
          isChecked: false
        };
        this.collectionList.push(obj);
      }
      else {
        for (let i = 0; i < this.selectedItems.length; i++) {
          if (this.selectedItems[i]['catId'] === item['catId']) {
            let obj = {
              catId: item['catId'],
              name: item['name'],
              isChecked: true
            };
            this.collectionList.push(obj);
            break;
          } else if (this.selectedItems.length === i + 1) {
            let obj = {
              catId: item['catId'],
              name: item['name'],
              isChecked: false
            };
            this.collectionList.push(obj);
          }
        }
      }
    });
    this.collectionListCopy = this.collectionList;

  }

  change(event, i, value) {
    if (this.requiredFor === 'outlets') {
      this.outletListCopy.forEach((obj) => {
        if (obj.outletName === value.outletName) {
          obj['isChecked'] = obj['isChecked'] === true ? false : true;
        }
      });
      this.outletList[i]['isChecked'] = event.target.checked;
    }
    else if (this.requiredFor === 'items') {
      this.productListCopy.forEach((obj) => {
        if (obj.itemId === value.itemId) {
          obj['isChecked'] = obj['isChecked'] === true ? false : true;
        }
      });
      this.productList[i]['isChecked'] = event.target.checked;
    }
    else if (this.requiredFor === 'collection') {
      this.collectionListCopy.forEach((obj) => {
        if (obj.catId === value.catId) {
          obj['isChecked'] = obj['isChecked'] === true ? false : true;
        }
      });
      this.collectionList[i]['isChecked'] = event.target.checked;
    }
  }

  searchOrdername() {
    this.outletSearch.valueChanges.pipe(debounceTime(300)).subscribe(value => { this.search(value); });
  }


  search(data) {
    this.isSearching = true;
    const searchStr = data.toLowerCase();
    if (this.requiredFor === 'outlets') {
      if (searchStr.length > 0) {
        this.outletList = this.outletListCopy.filter(item => {
          return item['outletName'].toLowerCase().indexOf(searchStr) >= 0;
        });
        this.outletList = JSON.parse(JSON.stringify(this.outletList));
      } else {
        this.isSearching = false;
        this.outletList = JSON.parse(JSON.stringify(this.outletListCopy));
      }
    }
    else if (this.requiredFor === 'items') {
      if (searchStr.length > 0) {
        this.productList = this.productListCopy.filter(item => {
          return item['name'].toLowerCase().indexOf(searchStr) >= 0;
        });
        this.productList = JSON.parse(JSON.stringify(this.productList));
      } else {
        this.isSearching = false;
        this.productList = JSON.parse(JSON.stringify(this.productListCopy));
      }
    }
    else if (this.requiredFor === 'collection') {
      if (searchStr.length > 0) {
        this.collectionList = this.collectionListCopy.filter(item => {
          return item['name'].toLowerCase().indexOf(searchStr) >= 0;
        });
        this.collectionList = JSON.parse(JSON.stringify(this.collectionList));
      } else {
        this.isSearching = false;
        this.collectionList = JSON.parse(JSON.stringify(this.collectionListCopy));
      }
    }
  }

  save() {
    if (this.requiredFor === 'outlets') {
      this.outletListCopy = this.outletListCopy.filter(
        (itm) => itm.isChecked === true
      );
      const outletIds = this.getListOfSelectedOutletIds(this.outletListCopy);
      console.log('outletIds', outletIds);
      this.modalController.dismiss(outletIds);
    }
    else if (this.requiredFor === 'items') {
      this.productListCopy = this.productListCopy.filter(
        (itm) => itm.isChecked === true
      );
      console.log('items', this.productListCopy);
      this.modalController.dismiss(this.productListCopy);
    }
    else if (this.requiredFor === 'collection') {
      this.collectionListCopy = this.collectionListCopy.filter(
        (itm) => itm.isChecked === true
      );
      console.log('items', this.collectionListCopy);
      this.modalController.dismiss(this.collectionListCopy);
    }
  }


  getListOfSelectedOutletIds(selectedIds) {
    if (this.requiredFor === 'outlets') {
      const outletIds = selectedIds
        .map((v, i) => v ? selectedIds[i].outletId : null)
        .filter(v => v !== null);
      return outletIds;
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
