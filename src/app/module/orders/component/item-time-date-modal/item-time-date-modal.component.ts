import { Component, OnInit, ViewChild} from '@angular/core';
import { ModalController, IonDatetime } from '@ionic/angular';
import { pickerController } from '@ionic/core';
import { SLOT_TIME } from 'src/app/core/constants/app-constants';
import { AvailableDateTime } from 'src/app/shared/models/available-datetime.model';
@Component({
  selector: 'app-item-time-date-modal',
  templateUrl: './item-time-date-modal.component.html',
  styleUrls: ['./item-time-date-modal.component.scss'],
})
export class ItemTimeDateModalComponent implements OnInit {
  // @ViewChild(IonDatetime) datePicker: IonDatetime;

  dateTimeModel = new AvailableDateTime();
  today;
  maxYear;
  isDisabled = true;
  slotTimeList: any = SLOT_TIME;
  isClosed;
  save;
  currentDate;
  filteredTime = [];
  selectedDate = '';
  SlotTime = '';

  
  constructor(
    private modalctrl: ModalController) {
      this.today = new Date().toISOString();
      this.maxYear = new Date().getFullYear() + 10;
  }
  ngOnInit() {
    // this.datePicker.open();
  }
  changeValue() {
    if (this.selectedDate && this.SlotTime !== '') {
      this.isDisabled = false;
    }
    this.timeValidation();
  }

  timeValidation() {
    let currentDate = new Date();
    if (this.selectedDate && (parseInt(this.selectedDate.toString().slice(0, 4)) > currentDate.getFullYear() ||
      parseInt(this.selectedDate.toString().slice(5, 7)) > currentDate.getMonth() + 1 ||
      parseInt(this.selectedDate.toString().slice(8, 10)) > currentDate.getDate())) {
      this.slotTimeList = SLOT_TIME;

    } else {
      let comparisonDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),
        currentDate.getHours(), currentDate.getMinutes() + 30)
      this.filteredTime = SLOT_TIME.map(value => {
        let hours = parseInt(value.key.substring(0, 2));
        let minutes = parseInt(value.key.substring(2));
        let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hours, minutes)
        let changed = { ...value, dateValue: date };
        return changed;
      }).filter(p => p.dateValue > comparisonDate)
      this.slotTimeList = this.filteredTime;
    }
  }

  saveAvailableDateTime() {
    this.isDisabled = false;
    let data = {
      save: {
        date: this.selectedDate,
        startTime: this.SlotTime
      },
      isChange: true,
      isClosed: false
    }
    console.log(data);
    this.modalctrl.dismiss({
      data
    });
  }

  dismiss() {
    console.log('dismiss');
    this.modalctrl.dismiss({
      isClosed: true
    });
  }

}
