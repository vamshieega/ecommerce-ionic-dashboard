import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColorPaletteModalPageRoutingModule } from './color-palette-modal-routing.module';

import { ColorPaletteModalPage } from './color-palette-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColorPaletteModalPageRoutingModule
  ],
  declarations: [ColorPaletteModalPage]
})
export class ColorPaletteModalPageModule {}
