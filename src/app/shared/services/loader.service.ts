/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from '../component/loader/loader.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  constructor() { }
  show() {
    this.loaderSubject.next(<LoaderState>{ show: true });
  }
  hide() {
    this.loaderSubject.next(<LoaderState>{ show: false });
  }
}
