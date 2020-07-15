import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MybooksPage } from './mybooks.page';

const routes: Routes = [
  {
    path: '',
    component: MybooksPage
  },
  {
    path: 'addnewbook',
    loadChildren: () => import('../addnewbook/addnewbook.component').then( m => m.AddnewbookComponent)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MybooksPageRoutingModule {}
