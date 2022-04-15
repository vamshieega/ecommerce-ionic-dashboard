import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RestrictFirstSpaceModule } from 'src/app/shared/utils/directives/restrict-first-space/restrict-first-space.module';
import { CustomTimingPage } from './custom-timing.page';
import { CustomTimingPageRoutingModule } from './custom-timing-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CustomTimingPageRoutingModule,
    RestrictFirstSpaceModule,
  ],
  declarations: [CustomTimingPage],
})
export class CustomTimingModule {}
