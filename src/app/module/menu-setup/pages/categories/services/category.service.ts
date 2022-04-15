import { Injectable } from '@angular/core';
import { ApiRequestService } from 'src/app/shared/services/api-request.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private apiService: ApiRequestService) { }
  // getAllMenuCategory(outledId) {
  //   return this.apiService.get('menuItemsList', '?outletId=' + outledId)
  // }

  addcategory(obj) {
    return this.apiService.post('addCategory', obj);
  }
  subCategorySwitch(id,reqBody){
    return this.apiService.put('subCategorySwitch',`/${id}`+'/status',reqBody)  
  }
  categorySwitch(id,reqBody){
    return this.apiService.put('categorySwitch',`/${id}`+'/status',reqBody)  
  }
  addSubcategory(obj) {
    return this.apiService.post('addSubCategory', obj);
  }

  getAllCategories(outledId){
    return this.apiService.get('getCategory' , '?outletId=' + outledId)
  }

  categoryReorder(obj) {
		return this.apiService.post('categoryReorder', obj);
	}
}
