import { CacheImageService } from '../../../services/cache-image.service';
import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[withCache]'
})
export class ImageCacheDirective implements OnInit, OnDestroy {

  private _hostSource: string;

  private _subscription: Subscription = Subscription.EMPTY;

  constructor(
    private _elementRef: ElementRef<HTMLImageElement>,
    private _imageCache: CacheImageService,
    ) {
   this._hostSource = _elementRef.nativeElement.src;
   _elementRef.nativeElement.src = '';
  }

  ngOnInit() {
    this._subscription = this._imageCache.get(this._hostSource).subscribe(cachedImage => {
      this._elementRef.nativeElement.src = cachedImage.blobUrl;    
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}