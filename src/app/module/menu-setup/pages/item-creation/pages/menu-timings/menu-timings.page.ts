import { Component, Input, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuItem } from 'src/app/module/menu-setup/models/menu-item';
import { OperationalTimingPage } from 'src/app/module/outlet-setup/components/operational-timing/operational-timing.page';
import { OutletDetails } from 'src/app/module/outlet-setup/model/outlet-details.model';
import { AppData } from 'src/app/shared/services/app-data.service';

@Component({
  selector: 'app-menu-timings',
  templateUrl: './menu-timings.page.html',
  styleUrls: ['./menu-timings.page.scss'],
})
export class MenuTimingsPage implements OnInit {

  @ViewChild(OperationalTimingPage, { static: false }) operationalTimingpage: OperationalTimingPage;
  @Input() menuItemDetails: any;
  menuTimingForm: FormGroup;
  formInit = false;
  existingTime: any;
  outletModel = new OutletDetails();
  menuItemModel = new MenuItem;
  customTiming = [];
  setTimeFor = 'menuItems';
  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges) {
    const currentItem: SimpleChange = changes.menuItemDetails;
    if (currentItem && currentItem.currentValue) {
      this.menuItemModel = { ...currentItem.currentValue };
      this.initForm();
      this.setFormVal();
    }
    else {
      AppData.outletDetailsSub$.subscribe(
        (outletsData) => {
          if (outletsData) {
            this.outletModel = Object.assign(this.outletModel, outletsData);
            this.existingTime = this.outletModel._opHours;
            console.log('existingTime 2',this.existingTime);
          }
        }
      );
    }
  }
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.menuTimingForm = this.fb.group({
      menuScheduled: [this.menuItemModel['menuScheduled']],
      opSettingType: [this.menuItemModel['opSettingType']]
    });
    this.formInit = true;
  }

  setFormVal() {
    this.existingTime = this.menuItemModel['operationalHours'];
    console.log('existingTime',this.existingTime);
  }

  getMenuTimingDetails() {
    const formObj = { ...this.menuTimingForm.value };
    if (formObj['opSettingType'] === 'custom' && this.menuTimingForm.controls.menuScheduled.value) {
      this.operationalTimingpage.submitted = true;
      if (this.operationalTimingpage.submitted) {
        const opTiming = this.operationalTimingpage.onOpHoursSubmit();
        formObj['operationalHours'] = { ...opTiming };
        return formObj;
      }
      else {
        return;
      }
    } else {
      formObj['operationalHours'] = [];
      return formObj;
    }

  }
}
