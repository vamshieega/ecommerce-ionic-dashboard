/* eslint-disable @typescript-eslint/dot-notation */
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IMAGE_URLS } from 'src/app/core/constants/image-constants';
import { ImageService } from 'src/app/shared/services/cache-image.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.page.html',
  styleUrls: ['./social.page.scss'],
})
export class SocialPage implements OnInit, AfterViewInit {
  comingSoon = IMAGE_URLS['comingSoonIllustration'];

  public backgroundImageURL$: Observable<string>;
  constructor(
    private imageservice: ImageService
  ) {
    const image: Observable<Blob> = imageservice.fetchImage(this.comingSoon);
    image.subscribe(b => {
      imageservice.saveImageToDatabase(this.comingSoon, b);
    });
  }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    this.backgroundImageURL$ = of(
      await this.imageservice.getCSSBackgroundImageURL(this.comingSoon)
    );
  }

}
