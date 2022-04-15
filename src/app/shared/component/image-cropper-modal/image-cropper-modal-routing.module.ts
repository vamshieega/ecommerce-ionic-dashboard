import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageCropperModalPage } from './image-cropper-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ImageCropperModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageCropperModalPageRoutingModule {}
