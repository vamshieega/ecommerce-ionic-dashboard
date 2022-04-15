import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-image-cropper-modal',
  templateUrl: './image-cropper-modal.page.html',
  styleUrls: ['./image-cropper-modal.page.scss'],
})
export class ImageCropperModalPage implements OnInit {
  @Input() modalObj;
  value: number = 0;
  scaleFactor: number = 1;
  scale: number = 1.0;
  transform: ImageTransform = {};
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageSize: any;

  constructor(public modalController: ModalController, private toast: ToastService) { }

  ngOnInit() {
    console.log(this.modalObj['target']['files'][0]['size']);
    this.imageSize = this.modalObj['target']['files'][0]['size'];
    if (this.modalObj['target']['files'][0]['size'] >= 2048000) {
      this.toast.presentToast('image size is more than 2 mb, please choose other image', 'toast-error');
    }
    else {
      this.imageChangedEvent = this.modalObj;
    }
  }

  onZoom(rangeValue) {
    if (this.value % this.scaleFactor == 0) {
      this.scale = 1 + this.value * 0.2;
      this.transform = {
        scale: this.scale,
      };
    }
  }

  cropperReady(event) {
    // cropper ready
    console.log(event);
  }

  loadImageFailed() {
    // show message
  }
  imageLoaded(event) {
    console.log(event);    // show cropper
  }

  imageCropped(event: ImageCroppedEvent) {

    this.croppedImage = event.base64;
  }

  crop() {
    console.log(this.croppedImage);
    if (this.imageSize >= 2048000) {
      this.toast.presentToast('please upload an image', 'toast-error');
    }
    else {
      this.modalController.dismiss({
        imageLink: this.croppedImage,
      });
    }
  }

  cancel() {
    this.modalController.dismiss();
  }

  uploadNewImage(event) {
    this.imageSize = event['target']['files'][0]['size'];
    console.log(event['target']['files'][0]['size']);
    this.imageChangedEvent = '';
    if (event['target']['files'][0]['size'] >= 2048000) {
      this.toast.presentToast('image size is more than 2 mb, please choose other image', 'toast-error');
    }
    else {
      this.imageChangedEvent = event;
      this.croppedImage = this.imageChangedEvent.base64;
    }
  }
}
