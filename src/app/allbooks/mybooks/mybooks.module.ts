import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MybooksPageRoutingModule } from './mybooks-routing.module';

import { MybooksPage } from './mybooks.page';
import { AddnewbookComponent } from '../addnewbook/addnewbook.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MybooksPageRoutingModule
  ],
  declarations: [MybooksPage, AddnewbookComponent],
  entryComponents: [AddnewbookComponent]
})
export class MybooksPageModule {}
