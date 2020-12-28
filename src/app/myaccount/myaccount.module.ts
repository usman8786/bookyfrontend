import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyaccountPageRoutingModule } from './myaccount-routing.module';
import { IonicStorageModule } from "@ionic/storage";
import { MyaccountPage } from './myaccount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    IonicModule,
    MyaccountPageRoutingModule
  ],
  declarations: [MyaccountPage]
})
export class MyaccountPageModule {}
