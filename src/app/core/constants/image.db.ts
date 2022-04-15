import Dexie from 'dexie';
import { BlobImage } from 'src/app/shared/models/image.model';
export class ImageDB extends Dexie {
  [x: string]: any;
  public images: Dexie.Table<BlobImage, string>;

  constructor() {
    super('ImageDB');
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const db = this;
    //
    // Define tables and indexes
    //
    db.version(1).stores({
      images: '&url'
    });

    // Let's physically map BlobImage class to image table.
    db.images.mapToClass(BlobImage);
  }
}

export const db: ImageDB = new ImageDB();


/**
 * Create a contact
 *
 * Note that since the contact is guaranteed
 * to have a unique ID we are using `put`
 * to update the databse.
 */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function createImage(image: BlobImage): Promise<string> {
   return db.images.put(image);
}

/**
 * Read an image
 */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function readImageByID(id: string): Promise<BlobImage> {
   return db.images.get(id);
}
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function readImagesByURL(url: string): Promise<BlobImage[]> {
   return db.images
    .where('url')
    .equals(url)
    .toArray();
}
