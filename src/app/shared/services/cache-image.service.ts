import { Injectable } from '@angular/core';
// import { BlobImage } from './model';
// import { readImagesByURL, createImage } from './image.db';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlobImage } from 'src/app/shared/models/image.model';
import { createImage, readImagesByURL } from 'src/app/core/constants/image.db';
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(
    private sanitizer: DomSanitizer,
    private httpClient: HttpClient
  ) {}

  /**
   * This method attemps to load the image array
   * from the database, and if it is not found,
   * it encodes the image, saves it and returns the
   * encode {@link BlobImage }
   *
   * This way it should be available in the database on future
   * requests.
   *
   * @param url The image URL
   */
  async getCSSBackgroundImageURL(url: string) {
    const images: BlobImage[] = await readImagesByURL(url);
    if (images.length === 0) {
      console.log('image servicec');
      console.log(url);
      return `url('${url}')`;
    }
    const safeURL: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(images[0].data)
    );
    return this.getSafeBackgroundImageUrl(safeURL);
  }

  /**
   * @param url The SafeUrl instance
   */
  private getSafeBackgroundImageUrl(url: any) {
    return `url("${url.changingThisBreaksApplicationSecurity}")`;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  fetchImage(url): Observable<Blob> {
    console.log('fetch param');
    return this.httpClient.get(url, {
      responseType: 'blob'
    });
  }
  /**
   * Save the blob image to the database.
   * It first checks whether there exists an
   * image with the URL in the database.
   *
   * @param url The URL of the image
   * @param blob The blob
   */
  // eslint-disable-next-line @typescript-eslint/member-ordering
  async saveImageToDatabase(url: string, blob: Blob) {
    console.log('save img to database');
    if ((await readImagesByURL(url)).length === 0) {
      const blobImage = new BlobImage(url, blob, blob.type);
      createImage(blobImage);
    }
  }

}
