import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NamechangePage } from './namechange.page';

const routes: Routes = [
  {
    path: '',
    component: NamechangePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NamechangePageRoutingModule {}
