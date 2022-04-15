import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { COLOR_PALETTE } from 'src/app/core/constants/app-constants';

@Component({
  selector: 'app-color-palette-modal',
  templateUrl: './color-palette-modal.page.html',
  styleUrls: ['./color-palette-modal.page.scss'],
})
export class ColorPaletteModalPage implements OnInit {

  selectedIndex = 0;
  paletteList = COLOR_PALETTE;
  @Input()
  primaryColor;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.paletteList.forEach((value, index) => {
      if (value.primaryColor === this.primaryColor) {
        this.selectedIndex = index;
      }
    });
  }

  setSelected(index) {
    this.selectedIndex = index;
  }
  save() {
    this.modalController.dismiss({ ...this.paletteList[this.selectedIndex] });
  }

  cancel() {
    this.modalController.dismiss();
  }

}
