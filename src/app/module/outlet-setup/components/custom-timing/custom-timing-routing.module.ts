import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomTimingPage } from './custom-timing.page';



const routes: Routes = [
  {
    path: '',
    component: CustomTimingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomTimingPageRoutingModule {}