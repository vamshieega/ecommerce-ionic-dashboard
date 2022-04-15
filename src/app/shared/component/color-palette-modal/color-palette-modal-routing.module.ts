import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorPaletteModalPage } from './color-palette-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ColorPaletteModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColorPaletteModalPageRoutingModule {}
