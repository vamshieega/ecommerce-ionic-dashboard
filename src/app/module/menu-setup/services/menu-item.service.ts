import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ApiRequestService } from 'src/app/shared/services/api-request.service';
import { AppData } from 'src/app/shared/services/app-data.service';
import { filterDataList } from 'src/app/shared/utils/common-functions';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {



  //filterCategoryItemsChanged: Subject<any> = new Subject();

  constructor(private apiService: ApiRequestService,) { }


  filterMenuList(menuList, fieldName, searchStr) {
    const filterList = [];
    menuList.forEach((menu, index) => {
      console.log('Processing Data: Index: ', index, ' Data : ', menu);
      let temp2 = this.filterCategory(menu['sub_cat'], fieldName, searchStr);
      if (temp2.length > 0) {
        menu['sub_cat'] = temp2;
        filterList.push(menu);
      }

      temp2 = filterDataList(menu['menu_items'], fieldName, searchStr);
      if (temp2.length > 0) {
        menu['menu_items'] = temp2;
        filterList.push(menu);
      }
    });

    return filterList;
  }

  filterCategory(sub_cats, fieldName, searchStr) {
    console.log('Processing Categories : ', sub_cats);
    const retList = [];
    sub_cats.forEach((sub_cat, index) => {
      const temp = filterDataList(sub_cat['menu_items'], fieldName, searchStr);
      if (temp.length > 0) {
        sub_cats[index]['menu_items'] = temp;
        retList.push(sub_cats[index]);
      }
    });
    return retList;
  }


  menuCreateBasicDetails(reqBody) {
    return this.apiService.post('menuItemCreate', reqBody);
  }

  menuUpdateBasicDetails(reqBody) {
    return this.apiService.post('menuItemUpdate', reqBody)
  }

  menuListData(outletId) {
    if (outletId)
      return this.apiService.get('menuItemsList', '?outletId=' + outletId);
  }

  // for off menu item
  offMenuItems(toggleBtnData) {
    return this.apiService.post('offMenuItem', toggleBtnData);
  }

  menuItemDelete(itemId) {
    return this.apiService.get('menuItemDelete', '?itemId=' + itemId + '&outletId=' + AppData.outletId);
  }

  menuItemById(itemId) {
    return this.apiService.get('menuItemById', '?itemId=' + itemId + '&outletId=' + AppData.outletId);
  }

  transformList(categoryList) {
    const tempList = [];
    const tempCatList = [];
    const returnObj = {
      tempList, tempCatList
    };
    // Processing the Category
    if (categoryList !== null) {
      categoryList.forEach((category) => {
        // processing Menu Items
        const catDetails = {
          cat_name: '',
          cat_id: '',
          sub_cat: []
        };
        let canBePushed = false;
        catDetails.cat_name = category.cat_name;
        catDetails.cat_id = category.cat_id;

        category.menu_items.forEach((menu, index) => {
          const tempMenu = JSON.parse(JSON.stringify(menu));
          tempMenu.cat_id = category.cat_id;
          tempMenu.cat_name = category.cat_name;
          tempMenu.sub_cat_index = null;
          tempMenu.menu_index = index;

          index === 0 ? tempMenu.showCat = true : tempMenu.showCat = false;
          // if(tempList.length <= 20){
          //   tempList.push(tempMenu);
          // }
          tempList.push(tempMenu);
          canBePushed = true;
        });

        // processing Sub Categories
        category.sub_cat.forEach((subCategory, catIndex) => {
          const subCat = {
            sub_cat_name: subCategory.sub_cat_name,
            sub_cat_id: subCategory.sub_cat_id,
            sub_cat_index: catIndex

          };
          catDetails.sub_cat.push(subCat);
          // processing Menu Items
          subCategory.menu_items.forEach((menu, index) => {
            const tempMenu = JSON.parse(JSON.stringify(menu));
            tempMenu.cat_id = category.cat_id;
            tempMenu.cat_name = category.cat_name;
            tempMenu.sub_cat_name = subCategory.sub_cat_name;
            tempMenu.sub_cat_id = subCategory.sub_cat_id;
            tempMenu.sub_cat_index = catIndex
            tempMenu.menu_index = index;

            catIndex === 0 && index === 0 ? tempMenu.showCat = true : tempMenu.showCat = false;
            index === 0 ? tempMenu.showSubCat = true : tempMenu.showSubCat = false;
            // if(tempList.length <= 20){
            //   tempList.push(tempMenu);
            // }
            tempList.push(tempMenu);
            canBePushed = true;
          });
        });
        canBePushed ? tempCatList.push(catDetails) : canBePushed = false;
      });
    }

    console.log('Temp List :::', tempList);
    console.log('Temp Cat List :::', tempCatList);
    returnObj.tempList = tempList;
    returnObj.tempCatList = tempCatList;
    return returnObj;
  }
}
