import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circular-progressbar',
  templateUrl: './circular-progressbar.page.html',
  styleUrls: ['./circular-progressbar.page.scss'],
})
export class CircularProgressbarPage implements OnInit {

  public circumference: number = 2 * Math.PI * 47;
  public strokeDashoffset = 0;
  public color = '#0000ff';
  @Input() maxValue = 0;
  @Input() currValue = 0;
  @Input() type = ''
  @Input() textSize = '16px';
  @Input() completeTextSize = '16px';
  @Input() finishText = 'Done';
  @Input() public progressBarColor: string;
  @Input() public progressBarBg: string;

  isCompleted: boolean;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.currValue) {
      const currVal = this.currValue * 100 / this.maxValue;
      this.onPercentageChanged(currVal);
    }
    if (this.currValue === this.maxValue) {
      this.isCompleted = true;
    } else {
      this.isCompleted = false;
    }
  }
  onPercentageChanged(val: number) {
    const offset = this.circumference - val / 100 * this.circumference;
    this.strokeDashoffset = offset;
  }


}
