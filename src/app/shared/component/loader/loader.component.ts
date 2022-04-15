import { LoaderService } from './../../services/loader.service';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements OnInit, AfterViewInit {

  show = false;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService, private cdRef: ChangeDetectorRef) { }


  ngOnInit() { }

  ngAfterViewInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
        this.cdRef.detectChanges();
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

export interface LoaderState {
  show: boolean;
}
