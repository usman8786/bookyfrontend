import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailChangePageRoutingModule } from './email-change-routing.module';

import { EmailChangePage } from './email-change.page';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EmailChangePageRoutingModule
  ],
  declarations: [EmailChangePage]
})
export class EmailChangePageModule {}
