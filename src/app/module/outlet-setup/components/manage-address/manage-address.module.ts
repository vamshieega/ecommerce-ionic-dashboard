import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ManageAddressPage } from './manage-address.page';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { environment } from 'src/environments/environment';
import { ManageAddressRoutingModule } from './manage-address-routing.module';
import { RestrictFirstSpaceModule } from 'src/app/shared/utils/directives/restrict-first-space/restrict-first-space.module';
import { OnlyNumberModule } from 'src/app/shared/utils/directives/only-number/only-number.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapApiKey,
      libraries: ['places']
    }),
    GooglePlaceModule,
    ManageAddressRoutingModule,
    RestrictFirstSpaceModule,
    OnlyNumberModule,
    ],
  declarations: [ManageAddressPage],
})
export class ManageAddressModule { }
