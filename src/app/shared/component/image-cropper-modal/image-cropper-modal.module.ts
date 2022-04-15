import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageCropperModalPageRoutingModule } from './image-cropper-modal-routing.module';

import { ImageCropperModalPage } from './image-cropper-modal.page';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageCropperModalPageRoutingModule,
    ImageCropperModule,
  ],
  declarations: [ImageCropperModalPage],
  exports: [ImageCropperModalPage],
  entryComponents: [ImageCropperModalPage],
})
export class ImageCropperModalPageModule { }
