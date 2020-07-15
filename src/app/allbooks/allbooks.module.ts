import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AddnewbookComponent} from './addnewbook/addnewbook.component';
import { IonicModule } from '@ionic/angular';

import { BooksPageRoutingModule } from './allbooks-routing.module';

import { BooksPage } from './allbooks.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BooksPageRoutingModule,
  ],
  declarations: [BooksPage]
})
export class BooksPageModule {}
