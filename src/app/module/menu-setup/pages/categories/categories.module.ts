import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './categories-routing.module';
import { RestrictFirstSpaceModule } from 'src/app/shared/utils/directives/restrict-first-space/restrict-first-space.module';

import { CategoriesPage } from './categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CategoriesPageRoutingModule,
    RestrictFirstSpaceModule
  ],
  declarations: [CategoriesPage]
})
export class CategoriesPageModule {}
