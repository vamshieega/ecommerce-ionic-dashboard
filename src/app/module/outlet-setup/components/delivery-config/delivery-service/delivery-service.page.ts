import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationModel } from '../../../model/config.model';
import { DeliveryConfigService } from '../service/delivery-config.service';

@Component({
  selector: 'app-delivery-service',
  templateUrl: './delivery-service.page.html',
  styleUrls: ['./delivery-service.page.scss'],
})
export class DeliveryServicePage implements OnInit {
  selectedIndex = 0;
  serviceForm: FormGroup;
  formInit = false;
  self = true;
  savedData;
  configurationModel = new ConfigurationModel();

  constructor(private location: Location,
    private deliveryConfigService: DeliveryConfigService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) {
      this.activatedRoute.queryParams.subscribe((data) => {
        this.self = (data.type === 'self') ? true : false;
        this.savedData = {...data};
        this.getBool(this.savedData);
      })
      
    }

  getBool(obj) {
    Object.keys(obj).forEach((key) => {
      obj[key] = obj[key] === 'true' ? true : false;
    })
    return obj;
  }
    
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.serviceForm = this.fb.group({
      onDemand: [this.savedData.onDemand, [Validators.required]],
      scheduled: [this.savedData.scheduled, [Validators.required]],
      self: [this.savedData.self, [Validators.required]]
    })
    this.formInit = true;
  }

  updateForm(data) {
    this.serviceForm = Object.assign(this.serviceForm, data);
    console.log(this.serviceForm);
  }

  onNavigateBack() {
    this.location.back();
  }

  onSubmit() {
    console.log(this.serviceForm);
    this.deliveryConfigService.saveDeliveryService(this.serviceForm.value);
    this.location.back();
  }
}
