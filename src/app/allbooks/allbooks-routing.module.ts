import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksPage } from './allbooks.page';

const routes: Routes = [
  {
    path: '',
    component: BooksPage
  },
  {
    path: 'mybooks',
    loadChildren: () => import('./mybooks/mybooks.module').then( m => m.MybooksPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksPageRoutingModule {}
