import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NamechangePageRoutingModule } from './namechange-routing.module';

import { NamechangePage } from './namechange.page';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    IonicModule,
    NamechangePageRoutingModule
  ],
  declarations: [NamechangePage]
})
export class NamechangePageModule {}
