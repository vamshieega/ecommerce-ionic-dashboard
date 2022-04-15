import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicDetailsPage } from './basic-details.page';
import { ManageAddressModule } from 'src/app/module/outlet-setup/components/manage-address/manage-address.module';
import { RestrictFirstSpaceModule } from 'src/app/shared/utils/directives/restrict-first-space/restrict-first-space.module';



@NgModule({
  declarations: [BasicDetailsPage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManageAddressModule,
    RestrictFirstSpaceModule
  ],
  exports: [BasicDetailsPage],
  entryComponents: [BasicDetailsPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ] 
})
export class BasicDetailsModule { }