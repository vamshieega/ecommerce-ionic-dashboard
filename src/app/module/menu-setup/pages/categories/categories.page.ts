import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CONFIRM_MODAL } from 'src/app/core/constants/app-constants';
import { OutletModalPage } from 'src/app/module/outlet-modal/outlet-modal.page';
import { OutletDetails } from 'src/app/module/outlet-setup/model/outlet-details.model';
import { ConfirmationmodalPage } from 'src/app/shared/component/confirmationmodal/confirmationmodal.page';
import { AppData } from 'src/app/shared/services/app-data.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { getInputFieldValidation } from 'src/app/shared/utils/common-functions';
import { Category, SubCategory } from './category.model';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  category: Category[] = [];
  categoryForm: FormGroup;
  categoryMenu;
  categorySwitchindex: any;
  subCategorySwitchindex = '';
  cancelModal: boolean = false;
  subCatAction = false;
  outletModel = new OutletDetails();
  outletName: string;
  outletId: string;
  locality: string;
  showInput: boolean = false;
  categoryCount: any;
  selectedIndex;

  constructor(private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private toast: ToastService,
    private modalController: ModalController,
    private loader: LoaderService) {
  }

  ngOnInit() {
    this.initForm();
    AppData.outletDetailsSub$.subscribe((outletData) => {
      this.outletModel = Object.assign(this.outletModel, outletData);
      this.locality = this.outletModel['basic']['locality'];
      this.outletName = this.outletModel['basic']['outletName'];
    });
    this.outletId = AppData.outletId;
    this.getCategories();
  }

  initForm() {
    this.categoryForm = this.fb.group({
      subCateroryAdd: ['', [Validators.required]],
      editSubCate: ['', [Validators.required]],
      createCategory: ['', [Validators.required]]
    })
  }

  getCategories() {
    this.loader.show();
    this.categoryService.getAllCategories(this.outletId).then((res) => {
      this.loader.hide();
      const tempCategoryMenu = res['body']['data']['categories'];
      this.categoryMenu = tempCategoryMenu.filter(list => list.name !== 'unassigned');
      this.categoryCount = this.categoryMenu.length;
      this.categoryMenu.sort((a, b) => {
        return a.sortIndex - b.sortIndex;
      });
      ;
      Object.values(this.categoryMenu).forEach(res => {
        var category = new Category();
        category.subCategories = [];
        category.categoryName = res['name'];
        category.categoryId = res['catId'];
        category.sortIndex = res['sortIndex'];
        category.menuItems = [];
        category.availableForOrder = res['cat_availableForOrder'];
        category.datepickerDismiss = false;
        category.isNewlyDeletedCategory = false

        res['subCategories'].forEach(element => {
          var subCat = new SubCategory();
          subCat.subCategoryName = element['name'];
          subCat.subCategoryId = element['catId'];
          subCat.subCategorySortIndex = element['sortIndex'];
          subCat.subCatAvailableForOrder = element['sub_cat_availableForOrder'];
          category.subCategories.push(subCat);
          Object.values(element['menu_items']).forEach(item => {
            category.menuItems.push(item)
          })
        });
        this.category.push(category);
      });
    }).catch((err) => { });
  }

  //change the outlet
  async onChangeOutlet() {
    let modal = await this.modalController.create({
      component: OutletModalPage, cssClass: 'outlet-select-modal',
      componentProps: { selectedOutletName: this.outletName, selectedOutletId: this.outletId }
    });
    modal.onDidDismiss().then(async (res) => {
      if (res.data) {
        this.outletId = res.data?.id;
        this.outletName = res.data?.name;
        this.locality = res.data?.locality;
        this.category = [];
        AppData.outletIdSub$.next(this.outletId);
        this.getCategories();
      }
    })
    return await modal.present();
  }

  //change the outlet
  getOutletTotalCount() {
    if (AppData.outletList !== undefined) {
      return AppData.outletList.length;
    }
  }

  async categorySwitch(index, event) {
    this.categorySwitchindex = index;
    console.log('index', index);
    if (event.detail.checked === true && this.cancelModal === false) {
      this.confirmModal(event.detail.checked, this.subCatAction);
    }
    else if (event.detail.checked === false && this.cancelModal === false) {
      this.confirmModal(event.detail.checked, this.subCatAction);
    }
    else {
      this.cancelModal = false;
    }
  }

  async subCategorySwitch(cId, sId, event) {
    this.categorySwitchindex = cId;
    this.subCategorySwitchindex = sId;
    if (event.detail.checked === false && this.cancelModal === false) {
      this.subCatAction = true;
      this.confirmModal(event.detail.checked, this.subCatAction);
    }
    else if (event.detail.checked === true && this.cancelModal === false) {
      this.subCatAction = true;
      this.confirmModal(event.detail.checked, this.subCatAction);
    }
    else {
      this.cancelModal = false;
    }
  }

  async confirmModal(toggle, subcat) {
    subcat ? this.category[this.categorySwitchindex].subCategories[this.subCategorySwitchindex].subCatAvailableForOrder = toggle : this.category[this.categorySwitchindex].availableForOrder = toggle;
    this.cancelModal = true;
    let modal = await this.modalController.create({
      component: ConfirmationmodalPage, cssClass: 'Confirmationmodal',
      componentProps: {
        icon: toggle === true ? CONFIRM_MODAL.switch_on_Icon : CONFIRM_MODAL.switch_off_Icon,
        title: toggle === true ? CONFIRM_MODAL.switch_on_title : CONFIRM_MODAL.switch_off_title,
        endMsg: CONFIRM_MODAL.save
      }
    });
    modal.onDidDismiss().then(async (res) => {
      if (res.data) {
        this.cancelModal = false;
        if (toggle) {
          let body = {
            availableForOrder: toggle
          }
          subcat ? this.subCategorySwitchChange(this.categorySwitchindex, this.subCategorySwitchindex, body) : this.categorySwitchChange(this.categorySwitchindex, body);
        }
        else {
          let time = new Date();
          time.setDate(time.getDate() + 1)
          time.setHours(2);
          time.setMinutes(0);
          let body = {
            availableForOrder: false,
            nextAvailableAt: time.toISOString()
          }
          subcat ? this.subCategorySwitchChange(this.categorySwitchindex, this.subCategorySwitchindex, body) : this.categorySwitchChange(this.categorySwitchindex, body)
        }
        console.log('modal from function');
      }
      else {
        this.cancelModal = true;

        subcat ? this.category[this.categorySwitchindex].subCategories[this.subCategorySwitchindex].subCatAvailableForOrder = !toggle
          : this.category[this.categorySwitchindex].availableForOrder = !toggle;
        this.subCatAction = false;
        console.log('modal from function');
      }
    });
    return await modal.present();
  }

  categorySwitchChange(index, body) {
    this.categoryService.categorySwitch(this.category[index].categoryId, body);
  }

  subCategorySwitchChange(cId, sId, body) {
    this.categoryService.subCategorySwitch(this.category[cId].subCategories[sId].subCategoryId, body);
    this.subCatAction = false;
  }

  // adjust the categories by dragging, present Not using, below code will arrange for next build 
  doReorder(event: any) {
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    const draggedItem = this.category.splice(event.detail.from, 1)[0];
    this.category.splice(event.detail.to, 0, draggedItem)

    let catObj = [];
    var i = 0;
    Object.values(this.category).forEach(catgry => {
      let obj = { catId: catgry.categoryId, sortIndex: i }
      catObj.push(obj);
      i = i + 1;
    })
    const body = {
      'outletId': AppData.outletId,
      'indexData': catObj
    }
    this.categoryService.categoryReorder(body).then((res) => {
      console.log(res);
    })

    event.detail.complete();
  }

  doReorderSub(event: any, index) {
    const draggedItem = this.category[index].subCategories.splice(event.detail.from, 1)[0];
    this.category[index].subCategories.splice(event.detail.to, 0, draggedItem);
    let subCatObj = [];

    Object.values(this.category).forEach(catgry => {
      let obj = {
        catId: catgry.categoryId,
        sortIndex: catgry.sortIndex,
        subCategories: []
      }
      var i = 0;
      Object.values(catgry.subCategories).forEach((subCategory) => {
        const subObj = {
          catId: subCategory.subCategoryId,
          sortIndex: i,
        }
        obj.subCategories.push(subObj)
        i = i + 1;
      })
      subCatObj.push(obj);
    })
    const body = {
      'outletId': AppData.outletId,
      'indexData': subCatObj
    }
    this.categoryService.categoryReorder(body).then((res) => {
      console.log(res);
    })
    event.detail.complete();
  }

  addCategory() {
    var category = new Category();
    category.categoryName = '';
    category.createCat = true;
    category.isNewlyAddedCategory = true;
    category.isNewlyDeletedCategory = false;
    category.subCategories = [];
    this.category.push(category);
  }

  addSubCategory(index) {
    this.selectedIndex = index;
    if (this.selectedIndex === index) {
      this.showInput = true;
      this.category[index].isNewlyAddedSubCategory = !this.category[index].isNewlyAddedSubCategory;
    }
  }

  createSubCategory(index) {
    let value = this.categoryForm.controls.subCateroryAdd.value;
    if (value !== '' && value !== null) {
      var subCat = new SubCategory();
      subCat.subCategoryName = value;
      subCat.subCatAvailableForOrder = true;
      let reqObj = {
        category: this.category[index].categoryId,
        name: value,
        outletId: AppData.outletId,
      }
      this.category[index].subCategories.push(subCat);
      this.showInput = false;
      this.categoryService.addSubcategory(reqObj).then((res) => {
        subCat.subCategoryId = res['body']['data'].catId;
        subCat.subCategorySortIndex = res['body']['data'].sortIndex;
        //this.category[index].subCategories = this.categoryForm.controls.subCateroryAdd.value;
      });
    }
  }

  removeSubInput() {
    this.showInput = false;
    if (this.categoryForm.controls.subCateroryAdd.value !== '') {
      this.categoryForm.reset(this.categoryForm.controls.subCateroryAdd.value);
    }
  }

  dismissInput(i) {
    this.categoryForm.reset();
    this.category.pop();
  }

  createCategory(index, name) {
    let value = this.categoryForm.controls.createCategory.value
    if (value !== '' && value !== null) {
      this.category[index].createCat = false;
      this.category[index].categoryName = value;
      this.category[index].availableForOrder = true;
      const reqObj = {
        outletId: AppData.outletId,
        name: value
      }
      this.categoryService.addcategory(reqObj).then((res) => {
        this.category[index].categoryId = res['body']['data'].catId;
        this.categoryForm.reset();
      });
    }
  }
}
