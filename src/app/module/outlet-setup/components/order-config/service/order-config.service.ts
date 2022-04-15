import { Injectable } from '@angular/core';
import { ApiRequestService } from 'src/app/shared/services/api-request.service';

@Injectable({
  providedIn: 'root'
})
export class OrderConfigService {

  constructor(private apiService: ApiRequestService) { }

  saveSetupDetails(setupData) {
    console.log(setupData);
    
    return this.apiService.post('setupDetails', setupData);
  }
}
