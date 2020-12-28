import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailChangePageRoutingModule } from './email-change-routing.module';

import { EmailChangePage } from './email-change.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailChangePageRoutingModule
  ],
  declarations: [EmailChangePage]
})
export class EmailChangePageModule {}
