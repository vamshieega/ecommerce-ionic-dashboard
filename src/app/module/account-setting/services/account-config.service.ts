import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; 
import { ApiRequestService } from 'src/app/shared/services/api-request.service';

@Injectable({
	providedIn: 'root'
})
export class AccountConfigService {

	domainSave: Subject<any> = new Subject();;

	constructor(private apiService: ApiRequestService,) {

	}


	saveDetails(setupData) {
		return this.apiService.put('restConfig', '', setupData);
	}

	completeSignUp(nameStoreData) {
        let data = this.apiService.post('completeSignup', nameStoreData);
        return data;
    }

    onCompleteSignUpSuccess(deployObjData) {
        let data = this.apiService.put('restData', '', deployObjData);
        return data;
    }
}
