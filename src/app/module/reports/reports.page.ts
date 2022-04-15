import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Chart, LinearScale, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { CLASS_COLOR_MAP, COUNTRY_TYPE } from 'src/app/core/constants/app-constants';
import { ApiRequestService } from 'src/app/shared/services/api-request.service';
import { AppData } from 'src/app/shared/services/app-data.service';
import { OutletModalPage } from '../outlet-modal/outlet-modal.page';
import { OutletDetails } from '../outlet-setup/model/outlet-details.model';
import { ReportsService } from './service/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  @ViewChild('revenueChart', { static: false }) revenueChart: ElementRef<HTMLCanvasElement>;
  @ViewChild('operationalChart', { static: false }) operationalChart: ElementRef<HTMLCanvasElement>;
  outletName: string;
  today = new Date();
  dateForm: FormGroup;
  currency = COUNTRY_TYPE[AppData.restData?.config.currency]?.symbol;
  revenueReportList = [];
  operationalReportList = [];
  outletModelSubscription = new Subscription()
  ctx1: CanvasRenderingContext2D;
  ctx2: CanvasRenderingContext2D;
  outletId = AppData.outletId;
  currentDate = new Date().toISOString().slice(0, 10);
  submitted = false;
  endDateStart = this.currentDate;
  startDateEnd = this.currentDate;
  outletModel = new OutletDetails();
  reportsData;
  dataLoaded = false;
  revenueChartObject: Chart;
  operationalChartObject: Chart;
  max = this.today.toISOString();
  min = new Date(new Date().setMonth(this.today.getMonth() - 3)).toISOString(); // code for reduce 3 months :/
  showStatus = false;

  constructor(private fb: FormBuilder,
    private apiService: ApiRequestService,
    private reportService: ReportsService,
    private modalController: ModalController) {
    this.reportService.getReportsdata(this.outletId, this.currentDate, this.currentDate).then(res => {
      this.reportsData = res['body']['data'];
      this.updateChart();
    }).catch((err) => { });
    this.outletModelSubscription = AppData.outletDetailsSub$.subscribe((outletData) => {
      if (outletData) {
        this.outletModel = Object.assign(this.outletModel, outletData);
        this.outletName = this.outletModel['basic']['outletName'];
        this.outletId = AppData.outletId;
        this.reportService.getReportsdata(this.outletId, this.currentDate, this.currentDate);
        this.updateChart();
      }
    });
    this.reportService.showRevenueChartSub$.subscribe(res => {
      if (!res) {
        setTimeout(() => {
          this.revenueChart.nativeElement.parentElement.style.display = 'none';
        }, 400);
      }
      else {
        setTimeout(() => {
          this.revenueChart.nativeElement.parentElement.style.display = 'block';
        }, 400);
      }
    });
    this.reportService.showOperationalChartSub$.subscribe(res => {
      if (!res) {
        setTimeout(() => {
          this.operationalChart.nativeElement.parentElement.style.display = 'none';
        }, 400);
      }
      else {
        setTimeout(() => {
          this.operationalChart.nativeElement.parentElement.style.display = 'block';
        }, 400);
      }
    });
  }

  ngOnInit() {
    this.initForm();
    Chart.register(...registerables);
  }

  initForm() {
    this.dateForm = this.fb.group({
      startDate: [this.currentDate, Validators.required],
      endDate: [this.currentDate, Validators.required]
    })
  }

  // for checking valid fields
  getValid(fieldName) {
    if (this.dateForm.controls[fieldName].invalid && (this.dateForm.controls[fieldName].dirty ||
      this.dateForm.controls[fieldName].touched || this.submitted)) {
      return true;
    } else {
      return false;
    }
  }

  getReport() {
    const startDate = this.dateForm.value.startDate.slice(0, 10);
    const endDate = this.dateForm.value.endDate.slice(0, 10)
    this.reportService.getReportsdata(this.outletId, startDate, endDate).then(res => {
      this.reportsData = res['body']['data'];
      this.updateChart();
    });
  }

  updateChart() {
    this.revenueReportList = JSON.parse(JSON.stringify(this.reportsData['revenueReportList']));
    this.operationalReportList = JSON.parse(JSON.stringify(this.reportsData['operationalReportList']));
    this.dataLoaded = true;
    this.checkAllZero();

    if (this.revenueChartObject) {
      this.revenueChartObject.data.datasets.forEach((dataset) => {
        dataset.data = this.revenueReportList;
        dataset.backgroundColor = this.getColors(this.revenueReportList);
      });
      this.revenueChartObject.data.labels = this.getNames(this.revenueReportList);
      this.revenueChartObject.update();
    }

    if (this.operationalChartObject) {
      this.operationalChartObject.data.datasets.forEach((dataset) => {
        dataset.data = this.operationalReportList;
        dataset.backgroundColor = this.getColors(this.operationalReportList);
      });
      this.operationalChartObject.data.labels = this.getNames(this.operationalReportList);
      this.operationalChartObject.update();
    }
    this.showStatus = true;
    setTimeout(() => {
      this.showStatus = false;
    }, 3000);
  }

  timeValidation() {
    this.endDateStart = this.dateForm.value['startDate'];
    this.startDateEnd = this.dateForm.value['endDate'];
  }

  getNames(report) {
    let names = [];
    report.forEach(element => {
      names.push(element['name']);
    });
    return names;
  }

  getValues(report) {
    let values = [];
    report.forEach(element => {
      values.push(element['value']);
    });
    return values;
  }

  getColors(report) {
    let colors = [];
    report.forEach((elem) => {
      colors.push(CLASS_COLOR_MAP[elem['class']]);
    });
    return colors;
  }

  async onChangeOutlet() {
    let modal = await this.modalController.create({
      component: OutletModalPage, cssClass: 'outlet-select-modal',
      componentProps: { selectedOutletName: this.outletName, selectedOutletId: this.outletId }
    });
    modal.onDidDismiss().then(async (res) => {
      if (res.data) {
        this.outletId = res.data?.id;
        this.outletName = res.data?.name;
        this.getReport();
      }
    })
    return await modal.present();
  }

  ionViewDidEnter() {
    this.ctx1 = this.revenueChart.nativeElement.getContext('2d');
    this.revenueChartObject = new Chart(this.ctx1, {
      type: 'doughnut',
      data: {
        labels: this.getNames(this.revenueReportList),
        datasets: [{
          label: 'Revenue Report',
          data: this.getValues(this.revenueReportList),
          backgroundColor: this.getColors(this.revenueReportList),
          // borderColor: [
          //   'rgba(255, 99, 132, 1)',
          //   'rgba(54, 162, 235, 1)',
          //   'rgba(255, 206, 86, 1)',
          //   'rgba(75, 192, 192, 1)'
          // ],
          // borderWidth: 1
        }]
      }
    });
    this.ctx2 = this.operationalChart.nativeElement.getContext('2d');
    this.operationalChartObject = new Chart(this.ctx2, {
      type: 'doughnut',
      data: {
        labels: this.getNames(this.operationalReportList),
        datasets: [{
          label: 'Operational Report',
          data: this.getValues(this.operationalReportList),
          backgroundColor: this.getColors(this.operationalReportList),
          // borderColor: [
          //   'rgba(255, 99, 132, 1)',
          //   'rgba(54, 162, 235, 1)',
          //   'rgba(255, 206, 86, 1)',
          //   'rgba(75, 192, 192, 1)'
          // ],
          // borderWidth: 1
        }]
      }
    });
  }

  checkAllZero() {
    const revenue = this.getValues(this.revenueReportList);
    const revBool = revenue.some(elem => {
      return elem > 0;
    });
    const operational = this.getValues(this.operationalReportList);
    const opBool = operational.some(elem => {
      return elem > 0;
    });

    this.reportService.saveRevenueChart(revBool);
    this.reportService.saveOperationalChart(opBool);
  }

  getOutletTotalCount() {
    if (AppData.outletList !== undefined) {
      return AppData.outletList.length;
    }
  }

  onSubmit() {
    this.submitted = true;
    this.getReport();
  }

}
