import { Injectable } from '@angular/core';
import { ApiRequestService } from 'src/app/shared/services/api-request.service';

@Injectable({
    providedIn: 'root'
})
export class ProductCollectionService {

    constructor(private apiRequestService: ApiRequestService) { }

    getCollections(outletId) {
        return this.apiRequestService.get('dCollection', '?outletId=' + [outletId]);
    }

    getProductsList(outletId) {
        const reqBody = { outletIds: outletId }
        return this.apiRequestService.post('dProducts', reqBody);
    }

}
