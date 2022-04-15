/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { ApiRequestService } from 'src/app/shared/services/api-request.service';
@Injectable({
	providedIn: 'root'
})
export class ManageOutletService {
	constructor(private apiService: ApiRequestService) {
	}

	getOutletDetails(outletId) {
		return this.apiService.get('outletDetails', '?outletId=' + outletId);
	}

	setOnOff(reqData) {
		return this.apiService.put('setAvailability', '', reqData);
	}

}
