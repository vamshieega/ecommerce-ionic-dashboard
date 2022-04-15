import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { RestaurantModel } from 'src/app/shared/models/restaurant.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { ApiRequestService } from 'src/app/shared/services/api-request.service';
import { AppData } from 'src/app/shared/services/app-data.service';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  restaurantProfile: RestaurantModel;
  userProfile: UserModel;

  constructor(private apiService: ApiRequestService, private storage: StorageService) {
    // console.log('resturant Service Loaded');
  }

  setRestaurantProfile(restProfile) {
    this.restaurantProfile = Object.assign(new RestaurantModel(), restProfile);
  }

  setUserProfile(userProfile) {
    this.userProfile = Object.assign(new UserModel(), userProfile);
  }

  setProfileData(profileData) {
    this.setUserProfile(profileData['userData']);
    this.setRestaurantProfile(profileData['restData']);
  }

  completeSignUp(reqBody) {
    return this.apiService.post('completeSignup', reqBody);
  }


  getRestData() {
    return new Promise((resolve, reject) => {
      this.apiService.get('restData').then((response) => {
        // console.log(response);
        AppData.restDataSub$.next(response['body']['data']);
        resolve(response['body']['data']);
      })
      .catch((err) =>{ });
    });
  }
}
